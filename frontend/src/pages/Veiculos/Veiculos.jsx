import React from "react";

const Veiculos = () => {
  return (
    <div className="flex flex-col flex-grow w-full h-full p-6 text-white bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800">Gestão de Veículos</h1>
        <p className="mt-2 text-gray-600">Aqui você poderá adicionar, editar e visualizar os veículos cadastrados no sistema.</p>
      </div>
    </div>
  );
};

export default Veiculos;
