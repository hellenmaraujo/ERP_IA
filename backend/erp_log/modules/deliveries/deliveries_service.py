from sqlalchemy.orm import Session
from erp_log.modules.deliveries.deliveries_models import Delivery
from erp_log.modules.deliveries.deliveries_schemas import DeliveryCreate
from fastapi import HTTPException
from datetime import datetime
from erp_log.modules.routing.routing_geolocation import get_coordinates
from erp_log.modules.deliveries.deliveries_schemas import StatusEntregaEnum

def create_delivery(db: Session, delivery: DeliveryCreate):
    db_delivery = Delivery(**delivery.dict())
    coords = get_coordinates(delivery.cep)
    if coords:
        db_delivery.x = coords["lat"]
        db_delivery.y = coords["lng"]
    db.add(db_delivery)
    db.commit()
    db.refresh(db_delivery)
    return db_delivery

def get_all_deliveries(db: Session):
    atualizar_entregas_para_em_rota(db)
    return db.query(Delivery).all()

def get_deliveries_by_user(db: Session, user_id: int):
    atualizar_entregas_para_em_rota(db)
    return db.query(Delivery).filter(Delivery.user_id == user_id).all()

def update_delivery_status(db: Session, delivery_id: int, status: str):
    delivery = db.query(Delivery).filter(Delivery.id == delivery_id).first()
    if not delivery:
        raise HTTPException(status_code=404, detail="Entrega não encontrada")
    delivery.status = status
    db.commit()
    db.refresh(delivery)
    return delivery

def atualizar_entregas_para_em_rota(db: Session):
    hoje = datetime.now()
    pendentes = db.query(Delivery).filter(
        Delivery.status == "pendente",
        Delivery.route_id.isnot(None),
        Delivery.prazo_entrega <= hoje
    ).all()
    for entrega in pendentes:
        entrega.status = "em_rota"
    db.commit()

from erp_log.modules.route.routes_models import Route
from erp_log.modules.drivers.driver_models import Driver
from erp_log.modules.proof.proof_models import DeliveryProof

def get_delivery_history(db: Session, delivery_id: int):
    delivery = db.query(Delivery).filter(Delivery.id == delivery_id).first()
    if not delivery:
        raise HTTPException(status_code=404, detail="Entrega não encontrada")

    route = db.query(Route).filter(Route.id == delivery.route_id).first() if delivery.route_id else None
    driver = db.query(Driver).filter(Driver.id == route.motorista_id).first() if route else None
    proof = db.query(DeliveryProof).filter(DeliveryProof.delivery_id == delivery.id).first()

    return {
        "entrega_id": delivery.id,
        "status": delivery.status,
        "criada_em": delivery.created_at,
        "prazo_entrega": delivery.prazo_entrega,
        "atribuida_para": {
            "motorista": driver.nome if driver else None,
            "rota_id": route.id if route else None,
            "atribuida_em": route.created_at if route else None
        } if route else None,
        "entregue_em": proof.uploaded_at if proof else None,
        "arquivo_comprovante": proof.file_path if proof else None
    }

def assign_driver_to_delivery(db: Session, delivery_id: int, driver_id: int):
    delivery = db.query(Delivery).filter(Delivery.id == delivery_id).first()
    if not delivery:
        return None
    
    # Verificar se motorista existe
    driver = db.query(Driver).filter(Driver.id == driver_id).first()
    if not driver:
        return None
    
    delivery.motorista_id = driver_id
    
    # Se a entrega estava pendente, atualizá-la para em rota
    if delivery.status == "pendente":
        delivery.status = "em_rota"
    
    db.commit()
    db.refresh(delivery)
    return delivery

def update_delivery_status(db: Session, delivery_id: int, new_status: StatusEntregaEnum):
    delivery = db.query(Delivery).filter(Delivery.id == delivery_id).first()
    if not delivery:
        return None
    
    delivery.status = new_status
    
    # Se o status for "entregue", registrar a data de entrega
    if new_status == StatusEntregaEnum.entregue:
        delivery.data_entrega = datetime.utcnow()
    
    db.commit()
    db.refresh(delivery)
    return delivery