from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from erp_log.core.database import Base
from datetime import datetime

class DeliveryProof(Base):
    __tablename__ = "delivery_proofs"

    id = Column(Integer, primary_key=True, index=True)
    file_path = Column(String, nullable=False)
    delivery_id = Column(Integer, ForeignKey("deliveries.id"), nullable=False)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
