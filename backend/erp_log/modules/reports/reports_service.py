from sqlalchemy.orm import Session
from erp_log.modules.deliveries.deliveries_models import Delivery
from erp_log.modules.drivers.driver_models import Driver
from erp_log.modules.vehicles.vehicle_models import Vehicle
from datetime import datetime, timedelta
import pandas as pd
from fastapi.responses import StreamingResponse
import io

def generate_delivery_report(db: Session, start_date=None, end_date=None, motorista_id=None, regiao=None, tipo_entrega=None):
    """Gera relatório de entregas com filtros"""
    query = db.query(Delivery)
    
    if start_date:
        query = query.filter(Delivery.criado_em >= start_date)
    
    if end_date:
        query = query.filter(Delivery.criado_em <= end_date)
    
    if motorista_id:
        query = query.filter(Delivery.motorista_id == motorista_id)
    
    if regiao:
        query = query.filter(Delivery.cidade == regiao)

    if tipo_entrega:
        query = query.filter(Delivery.tipo_entrega == tipo_entrega)
    
    entregas = query.all()
    
    # Formatar dados para o relatório
    result = []
    for entrega in entregas:
        motorista = None
        if entrega.motorista_id:
            motorista_obj = db.query(Driver).filter(Driver.id == entrega.motorista_id).first()
            if motorista_obj:
                motorista = motorista_obj.nome
        
        result.append({
            "id": entrega.id,
            "numero_nota": entrega.numero_nota,
            "destinatario": entrega.destinatario,
            "endereco": entrega.endereco,
            "cidade": entrega.cidade,
            "estado": entrega.estado,
            "tipo_entrega": entrega.tipo_entrega,
            "status": entrega.status,
            "data_criacao": entrega.criado_em.isoformat() if entrega.criado_em else None,
            "motorista": motorista
        })
    
    return result

def generate_vehicle_report(db: Session, disponivel=None):
    """Gera relatório de veículos com filtros"""
    query = db.query(Vehicle)
    
    if disponivel is not None:
        query = query.filter(Vehicle.disponivel == disponivel)
    
    veiculos = query.all()
    
    result = []
    for veiculo in veiculos:
        result.append({
            "id": veiculo.id,
            "placa": veiculo.placa,
            "marca": veiculo.marca,
            "modelo": veiculo.modelo,
            "ano_fabricacao": veiculo.ano_fabricacao,
            "tipo": veiculo.tipo,
            "capacidade_kg": veiculo.capacidade_kg,
            "disponivel": veiculo.disponivel
        })
    
    return result

def generate_driver_report(db: Session, ativo=None):
    """Gera relatório de motoristas com filtros"""
    query = db.query(Driver)
    
    if ativo is not None:
        query = query.filter(Driver.ativo == ativo)
    
    motoristas = query.all()
    
    result = []
    for motorista in motoristas:
        # Contar entregas do motorista
        total_entregas = db.query(func.count(Delivery.id)).filter(
            Delivery.motorista_id == motorista.id
        ).scalar() or 0
        
        result.append({
            "id": motorista.id,
            "nome": motorista.nome,
            "cpf": motorista.cpf,
            "cnh": motorista.cnh,
            "categoria_cnh": motorista.categoria_cnh,
            "validade_cnh": motorista.validade_cnh.isoformat() if motorista.validade_cnh else None,
            "ativo": motorista.ativo,
            "total_entregas": total_entregas
        })
    
    return result

def exportar_entregas_excel(db, start_date=None, end_date=None, motorista_id=None, regiao=None, tipo_entrega=None):
    dados = generate_delivery_report(db, start_date, end_date, motorista_id, regiao, tipo_entrega)

    df = pd.DataFrame(dados)
    stream = io.BytesIO()
    with pd.ExcelWriter(stream, engine="xlsxwriter") as writer:
        df.to_excel(writer, index=False, sheet_name="Relatório")

    stream.seek(0)
    return StreamingResponse(stream, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", headers={
        "Content-Disposition": "attachment; filename=relatorio_entregas.xlsx"
    })