from erp_log.modules.users.users_router import check_permission
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from erp_log.core.database import get_db
from erp_log.modules.routing.routing_schemas import RoteirizacaoRequest
from erp_log.modules.routing.routing_optimizer import clarke_wright_2opt

router = APIRouter()

@router.post("/")
def gerar_rotas(
    request: RoteirizacaoRequest,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["operacional", "administrativo"]))
):
    resultado = clarke_wright_2opt(request.entregas, request.veiculos, db)
    return {"rotas": resultado}

from erp_log.modules.routing.routing_schemas import RotaResumoOut
from erp_log.modules.routing import routing_service
from typing import List

@router.get("/routes", response_model=List[RotaResumoOut])
def list_routes(
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["operacional", "administrativo"]))
):
    return routing_service.get_all_routes(db)

from uuid import UUID
from erp_log.modules.routing.routing_schemas import RotaDetalheOut

@router.get("/routes/{rota_id}", response_model=RotaDetalheOut)
def get_rota_detalhada(
    rota_id: UUID,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["operacional", "administrativo"]))
):
    rota = routing_service.get_route_by_id(rota_id, db)
    if not rota:
        raise HTTPException(status_code=404, detail="Rota não encontrada")
    return rota
