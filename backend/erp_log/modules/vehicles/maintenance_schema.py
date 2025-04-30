from pydantic import BaseModel, Field
from typing import Optional
from datetime import date

class MaintenanceBase(BaseModel):
    vehicle_id: int
    maintenance_type: str = Field(..., pattern=r'^(preventiva|corretiva|revisao)$')
    description: str = Field(..., min_length=5)
    date: date
    cost: float = Field(..., ge=0)
    odometer: Optional[int] = None
    completed: bool = False

class MaintenanceCreate(MaintenanceBase):
    pass

class MaintenanceOut(MaintenanceBase):
    id: int

    class Config:
        orm_mode = True