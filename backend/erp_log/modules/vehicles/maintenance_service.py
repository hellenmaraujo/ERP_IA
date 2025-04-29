from sqlalchemy.orm import Session
from erp_log.modules.vehicles.maintenance_models import VehicleMaintenance
from erp_log.modules.vehicles.maintenance_schema import MaintenanceCreate

def create_maintenance(db: Session, maintenance: MaintenanceCreate):
    db_maintenance = VehicleMaintenance