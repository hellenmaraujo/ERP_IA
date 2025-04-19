from pydantic import BaseModel, EmailStr
from enum import Enum

class PerfilEnum(str, Enum):
    motorista = "motorista"
    operacional = "operacional"
    administrativo = "administrativo"

class UserCreate(BaseModel):
    nome: str
    email: EmailStr
    senha: str
    perfil: PerfilEnum

class UserOut(BaseModel):
    id: int
    nome: str
    email: EmailStr
    perfil: PerfilEnum

    class Config:
        from_attributes = True