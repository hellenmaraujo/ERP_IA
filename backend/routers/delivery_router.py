from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.core.database import get_db
from backend.services import delivery_service
from backend.schemas.delivery_schemas import DeliveryOut
from backend.routers.auth_router import check_permission

router = APIRouter(prefix="/deliveries", tags=["Deliveries"])

@router.get("/", response_model=list[DeliveryOut])
def list_deliveries(
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["motorista", "operacional", "administrativo"]))
):
    if current_user["perfil"] == "motorista":
        deliveries = delivery_service.get_deliveries_by_user(db, user_id=current_user["id"])
    else:
        deliveries = delivery_service.get_all_deliveries(db)

    return deliveries