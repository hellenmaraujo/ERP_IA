from pydantic import BaseModel
from datetime import datetime

class DeliveryProofOut(BaseModel):
    id: int
    file_path: str
    delivery_id: int
    uploaded_at: datetime

    class Config:
        from_attributes = True
