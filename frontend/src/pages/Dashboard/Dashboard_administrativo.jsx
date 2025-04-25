import React from 'react';
import CardsAdmin from '../../components/administrativo/Cards_admin';
import CardsRecAdmin from '../../components/administrativo/CardsRec_admin';
import ChartsAdmin from '../../components/administrativo/Charts_admin';
import TableMotoristaAdmin from '../../components/administrativo/TableMot_admin';
import TableFornecedorAdmin from '../../components/administrativo/TableForn_admin';

export default function DashboardAdmin() {
  return (
    <>
      <div className="cards-grid">
        <CardsAdmin />
      </div>

      {/* <div className="charts-grid">
        <ChartsAdmin />
      </div> */}

      <div className="tables-grid">
        <TableMotoristaAdmin />
        <TableFornecedorAdmin />
      </div>

      <div className="recommendations-grid">
        <CardsRecAdmin />
      </div>
    </>
  );
}
