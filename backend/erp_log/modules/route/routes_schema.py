from pydantic import BaseModel
from typing import Optional

class RouteBase(BaseModel):
    veiculo_id: int
    motorista_id: Optional[int] = None
    status: Optional[str] = "pendente"

class RouteCreate(RouteBase):
    pass

class RouteOut(RouteBase):
    id: int

    class Config:
        orm_mode = True
