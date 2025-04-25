from sqlalchemy.orm import Session
from erp_log.modules.drivers.driver_models import Driver
from erp_log.modules.drivers.driver_schema import DriverCreate

def create_driver(db: Session, driver: DriverCreate):
    db_driver = Driver(**driver.dict())
    db.add(db_driver)
    db.commit()
    db.refresh(db_driver)
    return db_driver

def get_driver(db: Session, driver_id: int):
    return db.query(Driver).filter(Driver.id == driver_id).first()

def get_drivers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Driver).offset(skip).limit(limit).all()

def delete_driver(db: Session, driver_id: int):
    db_driver = db.query(Driver).filter(Driver.id == driver_id).first()
    if db_driver:
        db.delete(db_driver)
        db.commit()
    return db_driver
