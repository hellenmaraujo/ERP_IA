from sqlalchemy.orm import Session
from erp_log.modules.route.routes_models import Route
from erp_log.modules.route.routes_schema import RouteCreate

def create_route(db: Session, route: RouteCreate):
    db_route = Route(**route.dict())
    db.add(db_route)
    db.commit()
    db.refresh(db_route)
    return db_route

def get_routes(db: Session):
    return db.query(Route).all()

def assign_driver_to_route(db: Session, route_id: int, motorista_id: int):
    route = db.query(Route).filter(Route.id == route_id).first()
    if route:
        route.motorista_id = motorista_id
        db.commit()
        db.refresh(route)
    return route
