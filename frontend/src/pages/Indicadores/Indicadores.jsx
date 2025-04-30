import PageLayout from '../../components/layout/PageLayout';
import React from 'react';
import Cards_Indicadores from '../../components/indicadores/Cards_Indicadores';
//import Charts_Indicadores from '../../components/indicadores/Charts_Indicadores';
import TableMotorista_Indicadores from '../../components/indicadores/TableMotorista_Indicadores';
import TableFornecedor_Indicadores from '../../components/indicadores/TableFornecedor_Indicadores';
import CardsRecomendacoes_Indicadores from '../../components/indicadores/CardsRecomendacao_Indicadores';


function Indicadores() {
  return (
    <PageLayout pageTitle="Indicadores">
      <Cards_Indicadores />
      <TableMotorista_Indicadores />
      <TableFornecedor_Indicadores />
      <CardsRecomendacoes_Indicadores />
    </PageLayout>
  );
}

export default Indicadores;