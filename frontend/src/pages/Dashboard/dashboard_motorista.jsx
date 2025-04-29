import React from "react";
import CardsDashMotorista from "../../components/dashboard/motorista/Cards_DashMotorista";
import TableDashMotorista from "../../components/dashboard/motorista/Table_DashMotorista";
import MapDashMotorista from "../../components/dashboard/motorista/Map_DashMotorista";


function DashboardMotorista() {
  return (
    <div className="dashboard-motorista-container">
      <CardsDashMotorista />
      <div className="dashboard-motorista-content">
        <TableDashMotorista />
        <MapDashMotorista />
      </div>
    </div>
  );
}

export default DashboardMotorista;