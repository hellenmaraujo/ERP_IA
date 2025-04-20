from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.delivery_schemas import DeliveryOut
from app.services import delivery_service

router = APIRouter(prefix="/deliveries", tags=["Deliveries"])

@router.get("/", response_model=list[DeliveryOut])
def list_all_deliveries(db: Session = Depends(get_db)):
    deliveries = delivery_service.list_deliveries(db)
    return deliveries