from sqlalchemy import Column, Integer, String, Float, Boolean
from erp_log.core.database import Base

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    placa = Column(String, unique=True, index=True, nullable=False)
    renavam = Column(String, unique=True, index=True, nullable=False)
    chassi = Column(String, unique=True, index=True, nullable=False)
    marca = Column(String, nullable=False)
    modelo = Column(String, nullable=False)
    ano_fabricacao = Column(Integer, nullable=False)
    tipo = Column(String, nullable=False)
    capacidade_kg = Column(Float, nullable=False)
    disponivel = Column(Boolean, default=True)
