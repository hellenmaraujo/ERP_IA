from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.core.database import get_db
from backend.routers.auth_router import check_permission
from schemas.user import UserCreate, UserOut
from services import user_service

router = APIRouter(prefix="/admin/users", tags=["Admin Users"])

@router.get("/", response_model=list[UserOut])
def list_users(
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["administrativo"]))
):
    users = user_service.list_users(db)
    return users

@router.post("/", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["administrativo"]))
):
    db_user = user_service.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email já registrado")
    return user_service.create_user(db=db, user=user)

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["administrativo"]))
):
    user = user_service.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    user_service.delete_user(db, user_id)
    return None