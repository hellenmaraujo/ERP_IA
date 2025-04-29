from sqlalchemy.orm import Session
from erp_log.modules.vehicles.maintenance_models import VehicleMaintenance
from erp_log.modules.vehicles.maintenance_schema import MaintenanceCreate

def create_maintenance(db: Session, maintenance: MaintenanceCreate):
    db_maintenance = VehicleMaintenance(**maintenance.dict())
    db.add(db_maintenance)
    db.commit()
    db.refresh(db_maintenance)
    return db_maintenance

def get_maintenance_by_vehicle(db: Session, vehicle_id: int):
    return db.query(VehicleMaintenance).filter(VehicleMaintenance.vehicle_id == vehicle_id).all()

def complete_maintenance(db: Session, maintenance_id: int):
    maintenance = db.query(VehicleMaintenance).filter(VehicleMaintenance.id == maintenance_id).first()
    if maintenance:
        maintenance.completed = True
        db.commit()
        db.refresh(maintenance)
    return maintenance