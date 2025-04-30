from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from datetime import date
from erp_log.core.database import get_db
from erp_log.modules.users.users_router import check_permission
from erp_log.modules.reports import reports_service

router = APIRouter(prefix="/reports", tags=["Relatórios"])

@router.get("/entregas")
def get_delivery_report(
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    motorista_id: Optional[int] = None,
    regiao: Optional[str] = None,
    tipo_entrega: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["administrativo"]))
):
    return reports_service.generate_delivery_report(
        db, start_date, end_date, motorista_id, regiao, tipo_entrega
    )

@router.get("/veiculos")
def get_vehicle_report(
    disponivel: Optional[bool] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["administrativo"]))
):
    return reports_service.generate_vehicle_report(db, disponivel)

@router.get("/motoristas")
def get_driver_report(
    ativo: Optional[bool] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["administrativo"]))
):
    return reports_service.generate_driver_report(db, ativo)

@router.get("/export")
def exportar_relatorio_entregas(
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    motorista_id: Optional[int] = None,
    regiao: Optional[str] = None,
    tipo_entrega: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["administrativo"]))
):
    return reports_service.exportar_entregas_excel(
        db, start_date, end_date, motorista_id, regiao, tipo_entrega
    )