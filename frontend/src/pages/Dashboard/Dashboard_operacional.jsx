import React from 'react';
import Map from "../../components/common/Map";
import CardsOperac from "../../components/operacional/CardsOperac";
import TableOperac from "../../components/operacional/TableOperac";

export default function DashboardOperacional() {
  return (
    <>
      <CardsOperac />
      <div className="dashboard-container">
        <Map />
        <TableOperac />
      </div>
    </>
  );
}
