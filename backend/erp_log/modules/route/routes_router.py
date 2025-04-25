from erp_log.modules.users.users_router import check_permission
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from erp_log.core.database import get_db
from erp_log.modules.route import routes_service
from erp_log.modules.route.routes_schema import RouteCreate, RouteOut

router = APIRouter()

@router.post("/", response_model=RouteOut)
def create_route(
    route: RouteCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["operacional", "administrativo"]))
):
    return routes_service.create_route(db, route)

@router.get("/", response_model=List[RouteOut])
def list_routes(
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["operacional", "administrativo"]))
):
    return routes_service.get_routes(db)

@router.post("/{route_id}/assign-driver/{motorista_id}", response_model=RouteOut)
def assign_driver(
    route_id: int,
    motorista_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["operacional", "administrativo"]))
):
    return routes_service.assign_driver_to_route(db, route_id, motorista_id)
