from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from enum import Enum

class TipoEntregaEnum(str, Enum):
    normal = "normal"
    urgente = "urgente"
    agendada = "agendada"

class StatusEntregaEnum(str, Enum):
    pendente = "pendente"
    entregue = "entregue"
    atrasado = "atrasado"
    em_rota = "em_rota"

class DeliveryCreate(BaseModel):
    numero_nota: Optional[str] = None
    serie: Optional[str] = None
    protocolo_autorizacao: Optional[str] = None
    natureza_operacao: Optional[str] = None
    inscricao_estadual_emitente: Optional[str] = None
    cnpj_emitente: Optional[str] = None
    destinatario: Optional[str] = None
    endereco: Optional[str] = None
    bairro: Optional[str] = None
    cidade: Optional[str] = None
    cep: Optional[str] = None
    estado: Optional[str] = None
    cnpj_destinatario: Optional[str] = None
    inscricao_estadual_destinatario: Optional[str] = None
    telefone: Optional[str] = None
    data_emissao: Optional[datetime] = None
    data_saida: Optional[datetime] = None
    hora_saida: Optional[str] = None
    base_calculo_icms: Optional[float] = None
    valor_icms: Optional[float] = None
    valor_frete: Optional[float] = None
    valor_seguro: Optional[float] = None
    desconto: Optional[float] = None
    outras_despesas: Optional[float] = None
    valor_icms_substituicao: Optional[float] = None
    valor_ipi: Optional[float] = None
    valor_total_produtos: Optional[float] = None
    valor_total_nota: Optional[float] = None
    transportador_nome: Optional[str] = None
    transportador_endereco: Optional[str] = None
    transportador_municipio: Optional[str] = None
    transportador_uf: Optional[str] = None
    transportador_cnpj: Optional[str] = None
    transportador_inscricao_estadual: Optional[str] = None
    quantidade_volume: Optional[float] = None
    especie_volume: Optional[str] = None
    marca_volume: Optional[str] = None
    codigo_antt: Optional[str] = None
    placa_veiculo: Optional[str] = None
    peso_bruto: Optional[float] = None
    peso_liquido: Optional[float] = None
    frete_por_conta: Optional[str] = None
    produtos_descricao: Optional[str] = None
    informacoes_complementares: Optional[str] = None
    tipo_entrega: Optional[TipoEntregaEnum] = TipoEntregaEnum.normal
    prazo_entrega: Optional[datetime] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    status: Optional[StatusEntregaEnum] = StatusEntregaEnum.pendente

class DeliveryOut(DeliveryCreate):
    id: int
    status: StatusEntregaEnum
    criado_em: datetime

    class Config:
        from_attributes = True


# Novo schema para histórico de entregas
from typing import Optional

class DeliveryHistoryOut(BaseModel):
    entrega_id: int
    status: StatusEntregaEnum
    criada_em: datetime
    prazo_entrega: Optional[datetime]
    atribuida_para: Optional[dict]
    entregue_em: Optional[datetime]
    arquivo_comprovante: Optional[str]