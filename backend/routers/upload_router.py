from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
import shutil
import os

from backend.core.database import get_db
from services.pdf_reader_service import extract_nfe_fields, extrair_texto_pdf, formatar_valor
from services import delivery_service
from schemas.delivery_schemas import DeliveryCreate
from backend.routers.auth_router import check_permission

router = APIRouter(prefix="/upload", tags=["Upload"])

UPLOAD_FOLDER = "./uploaded_files"

@router.post("/pdf", status_code=201)
def upload_pdf(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["operacional", "administrativo"]))
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Arquivo precisa ser um PDF")

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    with open(file_path, "rb") as pdf_file:
        text = extrair_texto_pdf(pdf_file)
    extracted_data = extract_nfe_fields(text)

    if not extracted_data:
        raise HTTPException(status_code=400, detail="Não foi possível extrair dados do PDF")

    delivery_data = DeliveryCreate(
        numero_nota=file.filename.split(".")[0],
        destinatario=extracted_data.get("destinatario", {}).get("nome", "Destinatário não informado"),
        endereco=extracted_data.get("destinatario", {}).get("endereco", "Endereço não informado"),
        cidade=extracted_data.get("destinatario", {}).get("municipio", "Cidade não informada"),
        estado=extracted_data.get("destinatario", {}).get("uf", "Estado não informado"),
        peso=formatar_valor(extracted_data.get("transporte", {}).get("peso_bruto", 0))
    )

    created_delivery = delivery_service.create_delivery(db, delivery_data)

    return {"message": "Entrega criada com sucesso!", "delivery_id": created_delivery.id}