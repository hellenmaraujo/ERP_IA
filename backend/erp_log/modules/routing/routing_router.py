from erp_log.modules.users.users_router import check_permission
from fastapi import APIRouter, Depends
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
