from sqlalchemy.orm import Session
from erp_log.modules.users.users_models import User
from erp_log.modules.users.users_schemas import UserCreate
from erp_log.core.security import get_password_hash

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def list_users(db: Session):
    return db.query(User).all()

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

def delete_user(db: Session, user_id: int):
    user = get_user_by_id(db, user_id)
    if user:
        db.delete(user)
        db.commit()