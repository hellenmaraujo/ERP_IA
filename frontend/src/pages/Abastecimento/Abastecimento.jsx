import PageLayout from '../../components/layout/PageLayout';
import DropdownVeiculoAbastecimento from "../../components/abastecimento/DropdownVeiculo_Abastecimento";
import ResumoVeiculoAbastecimento from "../../components/abastecimento/ResumoVeiculo_Abastecimento";
import ModoSelectorAbastecimento from "../../components/abastecimento/ModoSelector_Abastecimento";
import CombustivelSelectorAbastecimento from "../../components/abastecimento/CombustivelSelector_Abasrecimento";
import FormAbastecimento from "../../components/abastecimento/Form_Abastecimento";

function Abastecimento() {
  return (
    <PageLayout pageTitle="Abastecimento">
      <FormAbastecimento />
    </PageLayout>
  );
}

export default Abastecimento;