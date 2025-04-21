from typing import List
from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session
import shutil
import os
import re

from backend.core.database import get_db
from backend.services.pdf_reader_service import extrair_texto_pdf
from backend.services.geolocation_service import get_coordinates
from backend.services import delivery_service
from backend.schemas.delivery_schemas import DeliveryCreate
from backend.routers.auth_router import check_permission

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

router = APIRouter(prefix="/upload", tags=["Upload"])

UPLOAD_FOLDER = "./uploaded_files"

@router.post("/pdf", status_code=201)
async def upload_pdfs(
    files: List[UploadFile] = File(...),
    arrival_date: str = Form(...),
    db: Session = Depends(get_db),
    current_user: dict = Depends(check_permission(["operacional", "administrativo"]))
):
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    uploaded_files = []

    for file in files:
        if not file.filename.endswith(".pdf"):
            raise HTTPException(status_code=400, detail=f"O arquivo {file.filename} não é um PDF válido.")

        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        uploaded_files.append(file.filename)

    return {"message": "Arquivos enviados com sucesso!", "files": uploaded_files, "arrival_date": arrival_date}