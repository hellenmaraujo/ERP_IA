from fastapi import APIRouter, Depends, HTTPException, status, Body
from sqlalchemy.orm import Session
from erp_log.core.database import get_db
from erp_log.modules.deliveries import deliveries_service
from erp_log.modules.deliveries.deliveries_schemas import DeliveryOut, StatusEntregaEnum, DeliveryHistoryOut
from erp_log.modules.deliveries.deliveries_models import Delivery
from erp_log.modules.drivers.driver_models import Driver
from erp_log.modules.users.users_router import check_permission

router = APIRouter(prefix="/deliveries", tags=["Deliveries"])

@router.get("/", response_model=list[DeliveryOut])
def list_deliveries(
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["motorista", "operacional", "administrativo"]))
):
    if current_user["perfil"] == "motorista":
        driver = db.query(Driver).filter(Driver.usuario_id == current_user["id"]).first()
        if driver:
            return db.query(Delivery).filter(Delivery.motorista_id == driver.id).all()
        else:
            return []
    else:
        return db.query(Delivery).all()

@router.patch("/{delivery_id}/status", response_model=DeliveryOut)
def change_delivery_status(
    delivery_id: int,
    status: StatusEntregaEnum = Body(..., embed=True),
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["operacional", "administrativo"]))
):
    return deliveries_service.update_delivery_status(db, delivery_id, status)

@router.get("/{delivery_id}/historico", response_model=DeliveryHistoryOut)
def get_delivery_history(
    delivery_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["motorista", "operacional", "administrativo"]))
):
    return deliveries_service.get_delivery_history(db, delivery_id)