from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from erp_log.core.database import get_db
from erp_log.modules.vehicles import vehicle_service
from erp_log.modules.vehicles.vehicle_schema import VehicleCreate, VehicleOut

router = APIRouter(tags=["Veículos"])

@router.post("/", response_model=VehicleOut)
def create_vehicle(vehicle: VehicleCreate, db: Session = Depends(get_db)):
    return vehicle_service.create_vehicle(db, vehicle)

@router.get("/", response_model=List[VehicleOut])
def list_vehicles(db: Session = Depends(get_db)):
    return vehicle_service.get_vehicles(db)

@router.get("/{vehicle_id}", response_model=VehicleOut)
def get_vehicle(vehicle_id: int, db: Session = Depends(get_db)):
    return vehicle_service.get_vehicle(db, vehicle_id)

@router.put("/{vehicle_id}", response_model=VehicleOut)
def update_vehicle(vehicle_id: int, vehicle: VehicleCreate, db: Session = Depends(get_db)):
    return vehicle_service.update_vehicle(db, vehicle_id, vehicle)

@router.delete("/{vehicle_id}")
def delete_vehicle(vehicle_id: int, db: Session = Depends(get_db)):
    return vehicle_service.delete_vehicle(db, vehicle_id)
