import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/pages/_uploads.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function Uploads() {
  const [files, setFiles] = useState([]);
  const [arrivalDate, setArrivalDate] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        <main className="dashboard-main">
          <div className="uploads-container">
            <h2 className="uploads-title">Upload de Notas Fiscais</h2>
            <p style={{ textAlign: 'center', color: '#6c757d', marginBottom: '2rem' }}>
              Arraste e solte os arquivos PDF ou clique para selecionar
            </p>

            <div className="upload-zone" onClick={() => document.getElementById('fileInput').click()}>
              <input type="file" id="fileInput" className="hidden" accept=".pdf" multiple onChange={handleFileChange} />
              <div className="upload-icon">📄</div>
              <div className="upload-text">Clique para selecionar os arquivos</div>
              <div className="upload-subtext">ou arraste e solte aqui (apenas PDF)</div>
            </div>

            <div className="date-input-container">
              <label className="date-input-label" htmlFor="arrivalDate">
                Data de Chegada da Carga
              </label>
              <input
                type="date"
                id="arrivalDate"
                className="upload-input"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
              />
            </div>

            <div className="files-list-container">
              <h3 className="uploads-subtitle">Arquivos Selecionados</h3>
              <table className="uploads-table">
                <thead>
                  <tr>
                    <th>Nome do Arquivo</th>
                    <th>Tamanho</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file, index) => (
                    <tr key={index}>
                      <td>{file.name}</td>
                      <td>{(file.size / 1024).toFixed(2)} KB</td>
                      <td>
                        <button onClick={() => handleRemoveFile(index)} className="remove-btn">
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="action-buttons">
              <button className="cancel-btn">Cancelar</button>
              <button className="upload-advance-button">Processar Arquivos</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Uploads;
