from sqlalchemy.orm import Session
from models.delivery import Delivery
from schemas.delivery_schemas import DeliveryCreate

def create_delivery(db: Session, delivery: DeliveryCreate):
    db_delivery = Delivery(**delivery.dict())
    db.add(db_delivery)
    db.commit()
    db.refresh(db_delivery)
    return db_delivery

def get_all_deliveries(db: Session):
    return db.query(Delivery).all()

def get_deliveries_by_user(db: Session, user_id: int):
    return db.query(Delivery).filter(Delivery.user_id == user_id).all()