from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from erp_log.core.database import get_db
from erp_log.modules.proof import proof_service
from erp_log.modules.proof.proof_schema import DeliveryProofOut
from erp_log.core.permissions import check_permission

router = APIRouter(prefix="/proof", tags=["Comprovantes"])

@router.post("/{delivery_id}", response_model=DeliveryProofOut)
def upload_proof(
    delivery_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["motorista", "operacional", "administrativo"]))
):
    return proof_service.save_delivery_proof(db, delivery_id, file)
