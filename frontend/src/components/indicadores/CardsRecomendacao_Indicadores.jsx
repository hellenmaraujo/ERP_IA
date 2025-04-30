import React from 'react';
import '../../assets/styles/layout/_cards.css';

const indicadores = {
  indiceAtraso: 12.5,  // %
  custoFaturamento: 32.0,  // %
  entregasPrazo: 88.0,  // %
  utilizacaoFrota: 55.0,  // %
  satisfacaoCliente: 3.8,  // nota de 0 a 5
  consumoCombustivel: 145,  // % da meta
  horasExtras: 120, // horas extras no mês
  manutencaoPreventiva: 65, // % de veículos com manutenção preventiva
  tempoCarregamento: 4.5 // horas
};

function gerarRecomendacoes(indicadores) {
  const recomendacoes = [];

  if (indicadores.indiceAtraso > 10) {
    recomendacoes.push({
      tipo: 'atencao',
      titulo: 'Alta Taxa de Atrasos',
      mensagem: 'Índice de atrasos elevado. Revisar planejamento de rotas e capacidade da frota.',
      detalhe: `Índice atual: ${indicadores.indiceAtraso}% (Meta: < 10%)`
    });
  }

  if (indicadores.custoFaturamento > 30) {
    recomendacoes.push({
      tipo: 'melhoria',
      titulo: 'Custo Operacional Alto',
      mensagem: 'Relação custo/faturamento acima do ideal. Analisar gastos com combustível e manutenção.',
      detalhe: `Relação atual: ${indicadores.custoFaturamento}% (Meta: < 30%)`
    });
  }

  if (indicadores.entregasPrazo > 90) {
    recomendacoes.push({
      tipo: 'positivo',
      titulo: 'Excelente Desempenho',
      mensagem: 'Excelente desempenho em pontualidade! Manter boas práticas.',
      detalhe: `Taxa de pontualidade: ${indicadores.entregasPrazo}%`
    });
  }

  if (indicadores.utilizacaoFrota < 60) {
    recomendacoes.push({
      tipo: 'melhoria',
      titulo: 'Frota Subutilizada',
      mensagem: 'Baixa utilização da frota. Considerar redistribuição ou redução de veículos.',
      detalhe: `Utilização atual: ${indicadores.utilizacaoFrota}% (Meta: ≥ 60%)`
    });
  }

  if (indicadores.satisfacaoCliente < 4.0) {
    recomendacoes.push({
      tipo: 'atencao',
      titulo: 'Satisfação do Cliente em Queda',
      mensagem: 'Avaliação abaixo do esperado. Investigar causas e implementar melhorias.',
      detalhe: `Avaliação atual: ${indicadores.satisfacaoCliente}/5.0 (Meta: ≥ 4.0)`
    });
  }

  if (indicadores.consumoCombustivel > 115) {
    recomendacoes.push({
      tipo: 'atencao',
      titulo: 'Consumo de Combustível Elevado',
      mensagem: 'Gasto com combustível acima da meta. Verificar manutenção e treinamento de direção econômica.',
      detalhe: `Consumo atual: ${indicadores.consumoCombustivel}% da meta`
    });
  }

  if (indicadores.horasExtras > 100) {
    recomendacoes.push({
      tipo: 'melhoria',
      titulo: 'Excesso de Horas Extras',
      mensagem: 'Alto volume de horas extras. Avaliar necessidade de contratações.',
      detalhe: `Horas extras no mês: ${indicadores.horasExtras}h (Meta: < 100h)`
    });
  }

  if (indicadores.manutencaoPreventiva < 70) {
    recomendacoes.push({
      tipo: 'atencao',
      titulo: 'Manutenção Preventiva Negligenciada',
      mensagem: 'Baixo índice de manutenções preventivas. Risco de falhas operacionais.',
      detalhe: `Manutenção atual: ${indicadores.manutencaoPreventiva}% (Meta: ≥ 70%)`
    });
  }

  if (indicadores.tempoCarregamento > 3) {
    recomendacoes.push({
      tipo: 'melhoria',
      titulo: 'Carregamento Demorado',
      mensagem: 'Tempo médio de carregamento alto. Otimizar processos no CD.',
      detalhe: `Tempo médio: ${indicadores.tempoCarregamento}h (Meta: ≤ 3h)`
    });
  }

  return recomendacoes;
}

function CardsRecomendacoes_Indicadores() {
  const recomendacoes = gerarRecomendacoes(indicadores);

  return (
    <div className="cards-recomendacoes">
      {recomendacoes.map((rec, index) => (
        <div key={index} className={`recommendation-card urgency-${rec.tipo}`}>
          <div className="card-content">
            <div className="card-icon">
              {/* Optional icon based on rec.tipo */}
            </div>
            <div className="card-info">
              <h3 className="recommendation-title">{rec.titulo}</h3>
              <p className="recommendation-message">{rec.mensagem}</p>
              <small className="recommendation-detail">{rec.detalhe}</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardsRecomendacoes_Indicadores;