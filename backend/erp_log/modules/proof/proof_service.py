import os
from fastapi import UploadFile
from sqlalchemy.orm import Session
from erp_log.modules.proof.proof_models import DeliveryProof
from erp_log.modules.deliveries.deliveries_models import Delivery

UPLOAD_DIR = "erp_log/storage/comprovantes"

def save_delivery_proof(db: Session, delivery_id: int, file: UploadFile):
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    file_location = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_location, "wb") as buffer:
        buffer.write(file.file.read())

    # Cria registro do comprovante
    proof = DeliveryProof(file_path=file_location, delivery_id=delivery_id)
    db.add(proof)

    # Atualiza status da entrega
    entrega = db.query(Delivery).filter(Delivery.id == delivery_id).first()
    if entrega:
        entrega.status = "entregue"

    db.commit()
    db.refresh(proof)
    return proof
