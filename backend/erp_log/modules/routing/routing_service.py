from erp_log.modules.routing.routing_models import Rota
from sqlalchemy.orm import Session

def get_all_routes(db: Session):
    return db.query(Rota).all()
