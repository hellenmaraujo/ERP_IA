from sqlalchemy import Column, Integer, String, Enum
from backend.core.database import Base
import enum

class PerfilEnum(str, enum.Enum):
    motorista = "motorista"
    operacional = "operacional"
    administrativo = "administrativo"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    senha_hashed = Column(String, nullable=False)
    perfil = Column(Enum(PerfilEnum), nullable=False)