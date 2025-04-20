from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
import shutil
import os
import re

from backend.core.database import get_db
from services.pdf_reader_service import extrair_texto_pdf

def extract_nfe_fields(texto: str):
    """Extrai campos mínimos essenciais da NF-e"""
    def buscar(regex, texto, default=None, flags=0):
        match = re.search(regex, texto, flags=flags)
        if not match:
            return default
        return match.group(1).strip() if match.lastindex else match.group(0).strip()
    
    def buscar_peso(regex, texto, default=None, flags=0):
        match = re.search(regex, texto, flags=flags)
        if not match:
            return default
        return match.group(2).strip() if match.lastindex and match.lastindex >= 2 else default

    # Correções específicas:
    numero_nota = buscar(r'Nº\s+([\d\.]+)', texto)
    if numero_nota:
        numero_nota = numero_nota.replace('.', '')  # remove os pontos
    if not numero_nota:
        chave = buscar(r'(\d{44})', texto)
        if chave:
            numero_nota = chave[-9:-2]  # Pega parte do final da chave se necessário

    municipio_bruto = buscar(r'MUNICÍPIO\s+([^\n]+)', texto)
    if municipio_bruto:
        municipio_bruto = municipio_bruto.split("FONE")[0].strip()

    bairro = buscar(r'BAIRRO / DISTRITO\s+([^\n]+)', texto)
    if not bairro:
        # fallback: procurar bairro no endereço caso não ache direto
        bairro = buscar(r'Bairro\s*:\s*([^\n]+)', texto)

    cep = buscar(r'CEP\s*[:\-]?\s*(\d{5}-\d{3})', texto)
    if not cep:
        cep = buscar(r'(\d{5}-\d{3})', texto)

    peso_bruto = buscar_peso(r'PESO BRUTO\s*(\(Kg\))?\s*[:\s]*([\d.,]+)', texto)

    return {
        "numero_nota": numero_nota,
        "destinatario": buscar(r'NOME / RAZÃO SOCIAL\s+([^\n]+)', texto),
        "endereco": buscar(r'ENDEREÇO\s+([^\n]+)', texto),
        "bairro": bairro,
        "municipio": municipio_bruto,
        "uf": buscar(r'UF\s+([A-Z]{2})', texto),
        "cep": cep,
        "peso_bruto": peso_bruto
    }

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
        numero_nota=extracted_data.get("numero_nota", "Sem número"),
        destinatario=extracted_data.get("destinatario", "Destinatário não informado"),
        endereco=extracted_data.get("endereco", "Endereço não informado"),
        cidade=extracted_data.get("municipio", "Cidade não informada"),
        estado=extracted_data.get("uf", "Estado não informado"),
        peso=float(str(extracted_data.get("peso_bruto", "0")).replace(",", ".") or 0)
    )

    created_delivery = delivery_service.create_delivery(db, delivery_data)

    return {"message": "Entrega criada com sucesso!", "delivery_id": created_delivery.id}