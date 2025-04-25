from erp_log.modules.users.users_router import check_permission
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from erp_log.core.database import get_db
from erp_log.modules.drivers import driver_service
from erp_log.modules.drivers.driver_schema import DriverCreate, DriverOut

router = APIRouter()

@router.post("/", response_model=DriverOut)
def create_driver(
    driver: DriverCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["administrativo"]))
):
    return driver_service.create_driver(db, driver)

@router.get("/", response_model=List[DriverOut])
def list_drivers(
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["administrativo"]))
):
    return driver_service.get_drivers(db)

@router.get("/{driver_id}", response_model=DriverOut)
def get_driver(
    driver_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["administrativo"]))
):
    return driver_service.get_driver(db, driver_id)

@router.delete("/{driver_id}")
def delete_driver(
    driver_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["administrativo"]))
):
    return driver_service.delete_driver(db, driver_id)
