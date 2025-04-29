from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from typing import Optional
from erp_log.core.database import Base
from sqlalchemy.orm import Session

class Rota(Base):
    __tablename__ = "rotas"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    veiculo = Column(String, nullable=False)
    carga_total = Column(Float, nullable=False)
    distancia_total = Column(Float, nullable=False)
    tempo_total = Column(Float, nullable=False)
    custo_total = Column(Float, nullable=False)
    data_criacao = Column(DateTime, default=datetime.utcnow)

class RotaEntrega(Base):
    __tablename__ = "rota_entregas"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    rota_id = Column(UUID(as_uuid=True), ForeignKey("rotas.id"), nullable=False)
    entrega_id = Column(String, nullable=False)
    ordem = Column(Integer, nullable=False)

def salvar_rotas(rotas: list, db: Session, departure_time: Optional[datetime] = None):
    for rota in rotas:
        nova_rota = Rota(
            veiculo=rota["veiculo"],
            carga_total=rota["carga_total"],
            distancia_total=rota["distancia_total"],
            tempo_total=rota["tempo_total"],
            custo_total=rota["custo_total"],
            data_criacao=departure_time or datetime.utcnow()
        )
        db.add(nova_rota)
        db.flush()  # necessário para obter o ID da rota salva

        for ordem, entrega_id in enumerate(rota["rota"][1:-1], start=1):  # ignora CD inicial e final
            rota_entrega = RotaEntrega(
                rota_id=nova_rota.id,
                entrega_id=entrega_id,
                ordem=ordem
            )
            db.add(rota_entrega)

    db.commit()
