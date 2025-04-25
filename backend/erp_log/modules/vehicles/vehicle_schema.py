from pydantic import BaseModel
from typing import Literal

class VehicleBase(BaseModel):
    placa: str
    renavam: str
    chassi: str
    marca: str
    modelo: str
    ano_fabricacao: int
    tipo: Literal["VUC", "van", "delivery", "caminhao", "carro"]
    capacidade_kg: float
    disponivel: bool = True

class VehicleCreate(VehicleBase):
    pass

class VehicleOut(VehicleBase):
    id: int

    class Config:
        orm_mode = True
