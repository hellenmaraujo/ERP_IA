from pydantic import BaseModel
from datetime import date

class DriverBase(BaseModel):
    nome: str
    cpf: str
    rg: str
    cnh: str
    categoria_cnh: str
    validade_cnh: date
    data_nascimento: date
    usuario_id: int | None = None
    ativo: bool = True

class DriverCreate(DriverBase):
    pass

class DriverOut(DriverBase):
    id: int

    class Config:
        orm_mode = True
