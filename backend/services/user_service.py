from sqlalchemy.orm import Session
from models.user import User
from schemas.user import UserCreate
from core.security import get_password_hash

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.senha)
    db_user = User(
        nome=user.nome,
        email=user.email,
        senha_hashed=hashed_password,
        perfil=user.perfil
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user