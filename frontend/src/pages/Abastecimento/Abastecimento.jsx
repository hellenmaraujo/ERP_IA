import React, { useState, useEffect } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import '../../assets/styles/pages/_abastecimento.css';

function Abastecimento() {
  const [quantidade, setQuantidade] = useState('');
  const [precoPorLitro, setPrecoPorLitro] = useState('');
  const [precoTotal, setPrecoTotal] = useState('');
  const [precoTotalManual, setPrecoTotalManual] = useState(false);
  const [comprovante, setComprovante] = useState(null);

  useEffect(() => {
    if (!precoTotalManual) {
      const q = parseFloat(quantidade);
      const p = parseFloat(precoPorLitro);
      if (!isNaN(q) && !isNaN(p)) {
        setPrecoTotal((q * p).toFixed(2));
      } else {
        setPrecoTotal('');
      }
    }
  }, [quantidade, precoPorLitro, precoTotalManual]);

  const handleQuantidadeChange = (e) => {
    setQuantidade(e.target.value);
  };

  const handlePrecoPorLitroChange = (e) => {
    setPrecoPorLitro(e.target.value);
  };

  const handlePrecoTotalChange = (e) => {
    setPrecoTotal(e.target.value);
    setPrecoTotalManual(true);
  };

  const handleComprovanteChange = (e) => {
    setComprovante(e.target.files[0]);
  };

  return (
    <PageLayout pageTitle="Abastecimento">
      <div className="container">
        <header>
          <h1>Sistema de Abastecimento Empresarial</h1>
          <p>Gerencie o abastecimento dos veículos da sua empresa de forma eficiente.</p>
        </header>
        <section className="vehicle-selection">
          <label htmlFor="vehicle">Selecione o veículo:</label>
          <select id="vehicle" name="vehicle">
            <option value="">-- Escolha um veículo --</option>
            <option value="carro1">Carro 1</option>
            <option value="carro2">Carro 2</option>
            <option value="carro3">Carro 3</option>
          </select>
        </section>
        <section className="fuel-summary">
          <h2>Resumo do Veículo</h2>
          <p>Informações sobre o consumo e abastecimento do veículo selecionado.</p>
        </section>
        <section className="fuel-type-selector">
          <label htmlFor="fuel-type">Tipo de Combustível:</label>
          <select id="fuel-type" name="fuel-type">
            <option value="">-- Selecione o combustível --</option>
            <option value="gasolina">Gasolina</option>
            <option value="alcool">Álcool</option>
            <option value="diesel">Diesel</option>
          </select>
        </section>
        <section className="fuel-form">
          <h2>Formulário de Abastecimento</h2>
          <form>
            <div>
              <label htmlFor="quantity">Quantidade (litros):</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                step="0.01"
                value={quantidade}
                onChange={handleQuantidadeChange}
              />
            </div>
            <div>
              <label htmlFor="price">Preço por litro:</label>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                step="0.01"
                value={precoPorLitro}
                onChange={handlePrecoPorLitroChange}
              />
            </div>
            <div>
              <label htmlFor="total-price">Preço total:</label>
              <input
                type="number"
                id="total-price"
                name="total-price"
                min="0"
                step="0.01"
                value={precoTotal}
                onChange={handlePrecoTotalChange}
              />
            </div>
            <div>
              <label htmlFor="comprovante">Comprovante (upload de imagem):</label>
              <input
                type="file"
                id="comprovante"
                name="comprovante"
                accept="image/*"
                onChange={handleComprovanteChange}
              />
            </div>
            <button type="submit">Registrar Abastecimento</button>
          </form>
        </section>
      </div>
    </PageLayout>
  );
}

export default Abastecimento;