import React from 'react';
import Map from '../../components/common/Map';
import CardsMot from '../../components/motorista/CardsMot';
import TableMot from '../../components/motorista/TableMot';

export default function DashboardMotorista() {
  return (
    <>
      <CardsMot />
      <div className="dashboard-container">
        <Map />
        <TableMot />
      </div>
    </>
  );
}
