import React from 'react';

function UploadForm() {
  return (
    <form>
      <h2>Upload de Arquivos</h2>
      <input type="file" />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default UploadForm;