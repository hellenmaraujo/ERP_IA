from pydantic import BaseModel
from typing import List
from uuid import UUID
from datetime import datetime

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

class RotaResumoOut(BaseModel):
    id: UUID
    veiculo: str
    distancia_total: float
    tempo_total: float
    custo_total: float
    data_criacao: datetime

    class Config:
        from_attributes = True

class EntregaNaRotaOut(BaseModel):
    entrega_id: int
    endereco: str
    prazo_entrega: datetime
    status: str
    ordem: int

class RotaDetalheOut(BaseModel):
    id: UUID
    veiculo: str
    distancia_total: float
    tempo_total: float
    custo_total: float
    data_criacao: datetime
    entregas: List[EntregaNaRotaOut]

    class Config:
        from_attributes = True
