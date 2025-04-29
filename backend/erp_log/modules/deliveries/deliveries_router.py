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

@router.get("/by-region/{region}", response_model=list[DeliveryOut])
def get_deliveries_by_region(
    region: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["operacional", "administrativo"]))
):
    return db.query(Delivery).filter(Delivery.cidade == region).all()

@router.get("/by-period", response_model=list[DeliveryOut])
def get_deliveries_by_period(
    start_date: date,
    end_date: date,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["operacional", "administrativo"]))
):
    return db.query(Delivery).filter(
        Delivery.data_emissao >= start_date,
        Delivery.data_emissao <= end_date
    ).all()

@router.get("/motorista/{motorista_id}", response_model=list[DeliveryOut])
def get_deliveries_by_driver(
    motorista_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["operacional", "administrativo"]))
):
    return db.query(Delivery).filter(Delivery.motorista_id == motorista_id).all()

@router.put("/{delivery_id}/assign-driver/{driver_id}", response_model=DeliveryOut)
def assign_driver(
    delivery_id: int,
    driver_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["operacional", "administrativo"]))
):
    delivery = deliveries_service.assign_driver_to_delivery(db, delivery_id, driver_id)
    if not delivery:
        raise HTTPException(status_code=404, detail="Entrega ou motorista não encontrado")
    return delivery

@router.put("/{delivery_id}/status", response_model=DeliveryOut)
def update_status(
    delivery_id: int,
    status: StatusEntregaEnum,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["motorista", "operacional", "administrativo"]))
):
    # Motoristas só podem atualizar entregas atribuídas a eles
    if current_user["perfil"] == "motorista":
        driver = db.query(Driver).filter(Driver.usuario_id == current_user["id"]).first()
        if not driver:
            raise HTTPException(status_code=403, detail="Motorista não encontrado")
        
        delivery = db.query(Delivery).filter(
            Delivery.id == delivery_id,
            Delivery.motorista_id == driver.id
        ).first()
        
        if not delivery:
            raise HTTPException(status_code=403, detail="Entrega não pertence a este motorista")
    
    return deliveries_service.update_delivery_status(db, delivery_id, status)