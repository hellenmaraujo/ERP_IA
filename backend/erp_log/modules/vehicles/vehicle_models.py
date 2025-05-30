from sqlalchemy import Column, Integer, String, Float, Boolean
from erp_log.core.database import Base
from sqlalchemy.orm import relationship

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
    maintenance = relationship("VehicleMaintenance", back_populates="vehicle")  
    km_atual = Column(Float, nullable=True)
    km_proxima_manutencao = Column(Float, nullable=True)