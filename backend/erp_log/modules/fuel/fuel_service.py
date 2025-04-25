from sqlalchemy.orm import Session
from erp_log.modules.fuel.fuel_models import Fuel
from erp_log.modules.fuel.fuel_schema import FuelCreate

def create_fuel(db: Session, fuel: FuelCreate):
    db_fuel = Fuel(**fuel.dict())
    db.add(db_fuel)
    db.commit()
    db.refresh(db_fuel)
    return db_fuel

def get_fuel(db: Session, fuel_id: int):
    return db.query(Fuel).filter(Fuel.id == fuel_id).first()

def get_fuels(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Fuel).offset(skip).limit(limit).all()

def delete_fuel(db: Session, fuel_id: int):
    db_fuel = db.query(Fuel).filter(Fuel.id == fuel_id).first()
    if db_fuel:
        db.delete(db_fuel)
        db.commit()
    return db_fuel
