from sqlalchemy.orm import Session
from erp_log.modules.vehicles.maintenance_models import VehicleMaintenance
from erp_log.modules.vehicles.maintenance_schema import MaintenanceCreate
from datetime import datetime, timedelta

def create_maintenance(db: Session, maintenance: MaintenanceCreate):
    db_maintenance = VehicleMaintenance(**maintenance.dict())
    db.add(db_maintenance)
    db.commit()
    db.refresh(db_maintenance)
    return db_maintenance

def get_maintenance_by_vehicle(db: Session, vehicle_id: int):
    return db.query(VehicleMaintenance).filter(VehicleMaintenance.vehicle_id == vehicle_id).all()

def complete_maintenance(db: Session, maintenance_id: int):
    maintenance = db.query(VehicleMaintenance).filter(VehicleMaintenance.id == maintenance_id).first()
    if maintenance:
        maintenance.completed = True
        db.commit()
        db.refresh(maintenance)
    return maintenance

def verificar_alertas_manutencao(db: Session):
    hoje = datetime.now().date()

    query = db.query(Vehicle).filter(Vehicle.disponivel == True)

    alertas = []
    for veiculo in query:
        # 1. ALERTA POR QUILOMETRAGEM
        if (
            veiculo.km_atual is not None and
            veiculo.km_proxima_manutencao is not None and
            veiculo.km_atual >= veiculo.km_proxima_manutencao
        ):
            alertas.append({
                "veiculo_id": veiculo.id,
                "motivo": "Quilometragem ultrapassou o limite previsto"
            })

        # 2. ALERTA POR TEMPO (a cada 180 dias da última manutenção)
        ultima = (
            db.query(Maintenance)
            .filter(Maintenance.vehicle_id == veiculo.id)
            .order_by(Maintenance.data_manutencao.desc())
            .first()
        )

        if ultima and ultima.data_manutencao + timedelta(days=180) < hoje:
            alertas.append({
                "veiculo_id": veiculo.id,
                "motivo": "Mais de 180 dias desde a última manutenção"
            })

    return alertas