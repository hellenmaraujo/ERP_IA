from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from erp_log.modules.users.users_schemas import UserCreate, UserOut
from erp_log.modules.users import users_service
from erp_log.core.database import SessionLocal
from erp_log.core.security import verify_password, get_password_hash, create_access_token
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import JWTError, jwt
from erp_log.core.config import get_settings
from typing import Dict

router = APIRouter(prefix="/auth", tags=["Autenticação"])
settings = get_settings()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = users_service.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email já registrado")
    
    return users_service.create_user(db=db, user=user)

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = users_service.get_user_by_email(db, email=form_data.username)
    if not user or not verify_password(form_data.password, user.senha_hashed):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Email ou senha incorretos")
    
    access_token = create_access_token(data={"sub": user.email, "nome": user.nome, "perfil": user.perfil})
    return {"access_token": access_token, "token_type": "bearer"}

def get_current_user(token: str = Depends(oauth2_scheme)) -> Dict[str, str]:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        email: str = payload.get("sub")
        perfil: str = payload.get("perfil")
        if email is None or perfil is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenciais inválidas",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return {"email": email, "perfil": perfil}
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )

def check_permission(allowed_profiles: list[str]):
    def _check(current_user: dict = Depends(get_current_user)):
        if current_user["perfil"] not in allowed_profiles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Você não tem permissão para acessar este recurso."
            )
        return current_user
    return _check