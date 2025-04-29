from erp_log.modules.routing.routing_models import Rota, RotaEntrega
from erp_log.modules.deliveries.deliveries_models import Delivery
from sqlalchemy.orm import Session
from uuid import UUID

def get_all_routes(db: Session):
    return db.query(Rota).all()

def get_route_by_id(rota_id: UUID, db: Session):
    rota = db.query(Rota).filter(Rota.id == rota_id).first()
    if not rota:
        return None

    rota_entregas = (
        db.query(RotaEntrega, Delivery)
        .join(Delivery, RotaEntrega.entrega_id == Delivery.id)
        .filter(RotaEntrega.rota_id == rota_id)
        .order_by(RotaEntrega.ordem)
        .all()
    )

    entregas = [
        {
            "entrega_id": entrega.id,
            "endereco": entrega.endereco,
            "prazo_entrega": entrega.prazo_entrega,
            "status": entrega.status,
            "ordem": rota_entrega.ordem,
        }
        for rota_entrega, entrega in rota_entregas
    ]

    return {
        "id": rota.id,
        "veiculo": rota.veiculo,
        "distancia_total": rota.distancia_total,
        "tempo_total": rota.tempo_total,
        "custo_total": rota.custo_total,
        "data_criacao": rota.data_criacao,
        "entregas": entregas,
    }
