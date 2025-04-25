from pydantic import BaseModel
from typing import List

class Entrega(BaseModel):
    id: str
    x: float
    y: float
    peso: float

class Veiculo(BaseModel):
    tipo: str
    capacidade: float

class RoteirizacaoRequest(BaseModel):
    entregas: List[Entrega]
    veiculos: List[Veiculo]
