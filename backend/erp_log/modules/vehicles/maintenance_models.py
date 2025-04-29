from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey, Enum, Text, Boolean
from sqlalchemy.orm import relationship
from erp_log.core.database import Base
from datetime import datetime
import enum

class MaintenanceTypeEnum(str, enum.Enum):
    preventiva = "preventiva"
    corretiva = "corretiva"
    revisao = "revisao"

class VehicleMaintenance(Base):
    __tablename__ = "vehicle_maintenance"
    
    id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"), nullable=False)
    maintenance_type = Column(Enum(MaintenanceTypeEnum), nullable=False)
    description = Column(Text, nullable=False)
    date = Column(Date, nullable=False)
    cost = Column(Float, nullable=False)
    odometer = Column(Integer, nullable=True)
    completed = Column(Boolean, default=False)
    
    # Relacionamento
    vehicle = relationship("Vehicle", back_populates="maintenance")