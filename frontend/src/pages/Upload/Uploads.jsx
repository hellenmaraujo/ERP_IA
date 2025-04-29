import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/styles/pages/_uploads.css';
import PageLayout from '../../components/layout/PageLayout';

function Uploads() {
  const today = new Date().toISOString().split('T')[0];
  const [files, setFiles] = useState([]);
  const [arrivalDate, setArrivalDate] = useState(today);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    const invalidFiles = selectedFiles.filter((file) => file.type !== "application/pdf");

    if (invalidFiles.length > 0) {
      alert("Erro: Apenas arquivos PDF são permitidos.");
      return; // Stop processing if any invalid file
    }

    setFiles((prevFiles) => {
      const existingNames = prevFiles.map(file => file.name);
      const newFiles = selectedFiles.filter(file => !existingNames.includes(file.name));
      return [...prevFiles, ...newFiles];
    });
  };

  const handleProcessFiles = async () => {
    if (files.length === 0) {
      alert("Por favor, selecione pelo menos um arquivo PDF.");
      return;
    }

    if (!arrivalDate) {
      alert("Por favor, informe a data de chegada da carga.");
      return;
    }

    const selectedDate = new Date(arrivalDate);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate > currentDate) {
      alert("A data de chegada não pode ser maior do que hoje.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('arrival_date', arrivalDate);

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post('http://localhost:8000/upload/pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      alert("Arquivos enviados com sucesso!");
      console.log(response.data);
      // Optionally clear the form after successful upload
      setFiles([]);
      setArrivalDate(today);
      setUploadProgress(0);
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar arquivos. Tente novamente.");
      setUploadProgress(0);
    }
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <PageLayout pageTitle="Upload de Notas Fiscais">
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
            max={today}
            onChange={(e) => setArrivalDate(e.target.value)}
          />
        </div>

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="upload-progress-bar-container">
            <div className="upload-progress-bar" style={{ width: `${uploadProgress}%` }}></div>
            <span className="upload-progress-text">{uploadProgress}%</span>
          </div>
        )}

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
          <button
            className="upload-advance-button"
            onClick={handleProcessFiles}
            disabled={uploadProgress > 0 && uploadProgress < 100}
          >
            Processar Arquivos
          </button>
        </div>
      </div>
    </PageLayout>
  );
}

export default Uploads;