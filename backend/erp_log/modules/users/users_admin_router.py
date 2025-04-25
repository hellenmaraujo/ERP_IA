from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from erp_log.core.database import get_db
from erp_log.modules.users.users_router import check_permission
from erp_log.modules.users.users_schemas import UserCreate, UserOut
from erp_log.modules.users import users_service

router = APIRouter(prefix="/admin/users", tags=["Admin Users"])

@router.get("/", response_model=list[UserOut])
def list_users(
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["administrativo"]))
):
    users = users_service.list_users(db)
    return users

@router.post("/", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["administrativo"]))
):
    db_user = users_service.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email já registrado")
    return users_service.create_user(db=db, user=user)

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["administrativo"]))
):
    user = users_service.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    users_service.delete_user(db, user_id)
    return None