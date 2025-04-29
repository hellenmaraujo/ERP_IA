from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from erp_log.core.database import get_db
from erp_log.modules.users.users_router import check_permission
from erp_log.modules.kpis import kpi_service

router = APIRouter(prefix="/kpis", tags=["KPIs"])

@router.get("/entregas-status")
def get_entregas_status(
    period_days: int = 30,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["administrativo"]))
):
    return kpi_service.get_entregas_status_count(db, period_days)

@router.get("/performance-motoristas")
def get_performance_motoristas(
    period_days: int = 30,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["administrativo"]))
):
    return kpi_service.get_performance_motoristas(db, period_days)

@router.get("/performance-regioes")
def get_performance_regioes(
    period_days: int = 30,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["administrativo"]))
):
    return kpi_service.get_performance_regioes(db, period_days)