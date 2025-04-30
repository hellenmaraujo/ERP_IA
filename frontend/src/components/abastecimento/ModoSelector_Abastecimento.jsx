export default function ModoSelectorAbastecimento({ modo, onToggle }) {
  return (
    <div className={`modo-selector ${modo === 'valor' ? 'modo-valor' : 'modo-litros'}`} onClick={onToggle}>
      Modo: {modo === 'valor' ? 'Por Valor (R$)' : 'Por Litros'}
    </div>
  );
}
