from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from erp_log.core.database import get_db
from erp_log.modules.users.users_router import check_permission
from erp_log.modules.vehicles import maintenance_service
from erp_log.modules.vehicles.maintenance_schema import MaintenanceCreate, MaintenanceOut

router = APIRouter(prefix="/maintenance", tags=["Manutenção de Veículos"])

@router.post("/", response_model=MaintenanceOut)
def create_maintenance(
    maintenance: MaintenanceCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["operacional", "administrativo"]))
):
    return maintenance_service.create_maintenance(db, maintenance)

@router.get("/vehicle/{vehicle_id}", response_model=List[MaintenanceOut])
def get_maintenance_by_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["operacional", "administrativo"]))
):
    return maintenance_service.get_maintenance_by_vehicle(db, vehicle_id)

@router.put("/{maintenance_id}/complete", response_model=MaintenanceOut)
def complete_maintenance(
    maintenance_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["operacional", "administrativo"]))
):
    maintenance = maintenance_service.complete_maintenance(db, maintenance_id)
    if not maintenance:
        raise HTTPException(status_code=404, detail="Manutenção não encontrada")
    return maintenance

@router.get("/alertas")
def listar_alertas(db: Session = Depends(get_db), user: dict = Depends(check_permission(["administrativo"]))):
    if user.get("perfil") != "administrativo":
        raise HTTPException(status_code=403, detail="Acesso negado")
    return verificar_alertas_manutencao(db)