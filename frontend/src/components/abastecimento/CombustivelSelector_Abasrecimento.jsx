export default function CombustivelSelectorAbastecimento({ opcoes, selecionado, onChange }) {
  return (
    <div className="combustivel-selector">
      {opcoes.map((c, i) => (
        <button
          key={i}
          className={`combustivel-opcao ${selecionado === c.tipo ? 'ativo' : ''}`}
          onClick={() => onChange(c.tipo)}
        >
          {c.tipo} - R$ {c.preco.toFixed(2)}/L
        </button>
      ))}
    </div>
  );
}
