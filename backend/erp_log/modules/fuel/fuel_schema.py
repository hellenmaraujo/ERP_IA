from pydantic import BaseModel
from datetime import date

class FuelBase(BaseModel):
    veiculo_id: int
    data_abastecimento: date
    km_inicial: float
    km_final: float
    litros: float
    preco_litro: float
    preco_total: float
    nota_fiscal_url: str | None = None
    posto_nome: str | None = None
    cidade: str | None = None
    estado: str | None = None

class FuelCreate(FuelBase):
    pass

class FuelOut(FuelBase):
    id: int

    class Config:
        orm_mode = True
