import React from 'react';
import CardsOperac from '../../components/dashboard/operacional/Cards_DashOperac';
import MotoristasOperac from '../../components/dashboard/operacional/Motoristas_DashOperac';
import TableOperac from '../../components/dashboard/operacional/Table_DashOperac';

function DashboardOperacional() {
  return (
    <div className="dashboard-operacional">
      <CardsOperac />
      <MotoristasOperac />
      <TableOperac />
    </div>
  );
}

export default DashboardOperacional;