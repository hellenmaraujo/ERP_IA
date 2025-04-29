from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from erp_log.modules.deliveries.deliveries_models import Delivery
from erp_log.modules.drivers.driver_models import Driver

def get_entregas_status_count(db: Session, period_days=30):
    """Retorna contagem de entregas por status nos últimos X dias"""
    date_limit = datetime.utcnow() - timedelta(days=period_days)
    
    # Total de entregas
    total = db.query(func.count(Delivery.id)).filter(Delivery.criado_em >= date_limit).scalar()
    
    # Entregas por status
    pendentes = db.query(func.count(Delivery.id)).filter(
        Delivery.criado_em >= date_limit,
        Delivery.status == "pendente"
    ).scalar()
    
    entregues = db.query(func.count(Delivery.id)).filter(
        Delivery.criado_em >= date_limit,
        Delivery.status == "entregue"
    ).scalar()
    
    atrasadas = db.query(func.count(Delivery.id)).filter(
        Delivery.criado_em >= date_limit,
        Delivery.status == "atrasado"
    ).scalar()
    
    return {
        "total": total or 0,
        "pendentes": pendentes or 0,
        "entregues": entregues or 0,
        "atrasadas": atrasadas or 0,
        "taxa_sucesso": (entregues / total * 100) if total > 0 else 0
    }

def get_performance_motoristas(db: Session, period_days=30):
    """Retorna métricas de performance por motorista"""
    date_limit = datetime.utcnow() - timedelta(days=period_days)
    
    # Buscar todos os motoristas
    motoristas = db.query(Driver).all()
    resultados = []
    
    for motorista in motoristas:
        # Total de entregas do motorista
        total = db.query(func.count(Delivery.id)).filter(
            Delivery.criado_em >= date_limit,
            Delivery.motorista_id == motorista.id
        ).scalar()
        
        # Entregas no prazo
        entregues = db.query(func.count(Delivery.id)).filter(
            Delivery.criado_em >= date_limit,
            Delivery.motorista_id == motorista.id,
            Delivery.status == "entregue"
        ).scalar()
        
        # Entregas atrasadas
        atrasadas = db.query(func.count(Delivery.id)).filter(
            Delivery.criado_em >= date_limit,
            Delivery.motorista_id == motorista.id,
            Delivery.status == "atrasado"
        ).scalar()
        
        resultados.append({
            "motorista_id": motorista.id,
            "nome": motorista.nome,
            "total_entregas": total or 0,
            "entregas_sucesso": entregues or 0,
            "entregas_atrasadas": atrasadas or 0,
            "taxa_sucesso": (entregues / total * 100) if total > 0 else 0
        })
    
    return resultados

def get_performance_regioes(db: Session, period_days=30):
    """Retorna métricas de performance por região (cidade)"""
    date_limit = datetime.utcnow() - timedelta(days=period_days)
    
    # Buscar todas as cidades distintas
    cidades = db.query(Delivery.cidade).distinct().all()
    resultados = []
    
    for cidade_tuple in cidades:
        cidade = cidade_tuple[0]
        if not cidade:  # Pular se a cidade for nula
            continue
            
        # Total de entregas na cidade
        total = db.query(func.count(Delivery.id)).filter(
            Delivery.criado_em >= date_limit,
            Delivery.cidade == cidade
        ).scalar()
        
        # Entregas no prazo
        entregues = db.query(func.count(Delivery.id)).filter(
            Delivery.criado_em >= date_limit,
            Delivery.cidade == cidade,
            Delivery.status == "entregue"
        ).scalar()
        
        # Entregas atrasadas
        atrasadas = db.query(func.count(Delivery.id)).filter(
            Delivery.criado_em >= date_limit,
            Delivery.cidade == cidade,
            Delivery.status == "atrasado"
        ).scalar()
        
        resultados.append({
            "cidade": cidade,
            "total_entregas": total or 0,
            "entregas_sucesso": entregues or 0,
            "entregas_atrasadas": atrasadas or 0,
            "taxa_sucesso": (entregues / total * 100) if total > 0 else 0
        })
    
    return resultados