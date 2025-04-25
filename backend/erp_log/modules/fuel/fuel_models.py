from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from erp_log.core.database import Base

class Fuel(Base):
    __tablename__ = "fuel"

    id = Column(Integer, primary_key=True, index=True)
    veiculo_id = Column(Integer, ForeignKey("vehicles.id"), nullable=False)
    data_abastecimento = Column(Date, nullable=False)
    km_inicial = Column(Float, nullable=False)
    km_final = Column(Float, nullable=False)
    litros = Column(Float, nullable=False)
    preco_litro = Column(Float, nullable=False)
    preco_total = Column(Float, nullable=False)
    nota_fiscal_url = Column(String, nullable=True)
    posto_nome = Column(String, nullable=True)
    cidade = Column(String, nullable=True)
    estado = Column(String, nullable=True)
