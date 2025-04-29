from erp_log.core.permissions import check_permission
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from erp_log.core.database import get_db
from erp_log.modules.fuel import fuel_service
from erp_log.modules.fuel.fuel_schema import FuelCreate, FuelOut

router = APIRouter()

@router.post("/", response_model=FuelOut)
def create_fuel(
    fuel: FuelCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["motorista", "operacional", "administrativo"]))
):
    return fuel_service.create_fuel(db, fuel)

@router.get("/", response_model=List[FuelOut])
def list_fuels(
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["motorista", "operacional", "administrativo"]))
):
    if current_user["perfil"] == "motorista":
        return fuel_service.get_fuels_by_user(db, user_id=current_user["id"])
    return fuel_service.get_fuels(db)

@router.get("/{fuel_id}", response_model=FuelOut)
def get_fuel(
    fuel_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["motorista", "operacional", "administrativo"]))
):
    return fuel_service.get_fuel(db, fuel_id)

@router.delete("/{fuel_id}")
def delete_fuel(
    fuel_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["motorista", "operacional", "administrativo"]))
):
    return fuel_service.delete_fuel(db, fuel_id)
