from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas.routing_schemas import RoteirizacaoRequest
from services.optimizer_service import clarke_wright_2opt

router = APIRouter()

@router.post("/")
def gerar_rotas(request: RoteirizacaoRequest, db: Session = Depends(get_db)):
    resultado = clarke_wright_2opt(request.entregas, request.veiculos, db)
    return {"rotas": resultado}
