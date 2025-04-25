from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey
from erp_log.core.database import Base

class Driver(Base):
    __tablename__ = "drivers"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    cpf = Column(String, unique=True, nullable=False)
    rg = Column(String, unique=True, nullable=False)
    cnh = Column(String, unique=True, nullable=False)
    categoria_cnh = Column(String, nullable=False)
    validade_cnh = Column(Date, nullable=False)
    data_nascimento = Column(Date, nullable=False)
    usuario_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    ativo = Column(Boolean, default=True)
