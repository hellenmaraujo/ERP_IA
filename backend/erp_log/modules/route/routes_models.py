from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship
from erp_log.core.database import Base

class Route(Base):
    __tablename__ = "routes"

    id = Column(Integer, primary_key=True, index=True)
    veiculo_id = Column(Integer, ForeignKey("vehicles.id"), nullable=False)
    motorista_id = Column(Integer, ForeignKey("drivers.id"), nullable=True)
    status = Column(String, default="pendente")  # pendente, em_andamento, concluida
