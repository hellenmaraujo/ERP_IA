from sqlalchemy.orm import Session
from app.models.delivery import Delivery
from app.schemas.delivery_schemas import DeliveryCreate

def create_delivery(db: Session, delivery: DeliveryCreate):
    db_delivery = Delivery(**delivery.dict())
    db.add(db_delivery)
    db.commit()
    db.refresh(db_delivery)
    return db_delivery

def list_deliveries(db: Session):
    return db.query(Delivery).all()