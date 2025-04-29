from sqlalchemy import Column, Integer, String, Float, DateTime, Enum
from erp_log.core.database import Base
from datetime import datetime
import enum

class TipoEntregaEnum(str, enum.Enum):
    normal = "normal"
    urgente = "urgente"
    agendada = "agendada"

class StatusEntregaEnum(str, enum.Enum):
    pendente = "pendente"
    entregue = "entregue"
    atrasado = "atrasado"
    em_rota = "em_rota"

class Delivery(Base):
    __tablename__ = "deliveries"

    id = Column(Integer, primary_key=True, index=True)

    # Dados da Nota
    numero_nota = Column(String, nullable=True)
    serie = Column(String, nullable=True)
    protocolo_autorizacao = Column(String, nullable=True)
    natureza_operacao = Column(String, nullable=True)
    inscricao_estadual_emitente = Column(String, nullable=True)
    cnpj_emitente = Column(String, nullable=True)

    # Destinatário
    destinatario = Column(String, nullable=True)
    endereco = Column(String, nullable=True)
    bairro = Column(String, nullable=True)
    cidade = Column(String, nullable=True)
    cep = Column(String, nullable=True)
    estado = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    cnpj_destinatario = Column(String, nullable=True)
    inscricao_estadual_destinatario = Column(String, nullable=True)
    telefone = Column(String, nullable=True)

    # Datas
    data_emissao = Column(DateTime, nullable=True)
    data_saida = Column(DateTime, nullable=True)
    hora_saida = Column(String, nullable=True)
    prazo_entrega = Column(DateTime, nullable=True)

    # Cálculo do Imposto
    base_calculo_icms = Column(Float, nullable=True)
    valor_icms = Column(Float, nullable=True)
    valor_frete = Column(Float, nullable=True)
    valor_seguro = Column(Float, nullable=True)
    desconto = Column(Float, nullable=True)
    outras_despesas = Column(Float, nullable=True)
    valor_icms_substituicao = Column(Float, nullable=True)
    valor_ipi = Column(Float, nullable=True)
    valor_total_produtos = Column(Float, nullable=True)
    valor_total_nota = Column(Float, nullable=True)

    # Transporte
    transportador_nome = Column(String, nullable=True)
    transportador_endereco = Column(String, nullable=True)
    transportador_municipio = Column(String, nullable=True)
    transportador_uf = Column(String, nullable=True)
    transportador_cnpj = Column(String, nullable=True)
    transportador_inscricao_estadual = Column(String, nullable=True)
    quantidade_volume = Column(Float, nullable=True)
    especie_volume = Column(String, nullable=True)
    marca_volume = Column(String, nullable=True)
    codigo_antt = Column(String, nullable=True)
    placa_veiculo = Column(String, nullable=True)
    peso_bruto = Column(Float, nullable=True)
    peso_liquido = Column(Float, nullable=True)
    frete_por_conta = Column(String, nullable=True)

    # Produtos e Informações Adicionais
    produtos_descricao = Column(String, nullable=True)
    informacoes_complementares = Column(String, nullable=True)

    # Campos de controle
    tipo_entrega = Column(Enum(TipoEntregaEnum), default=TipoEntregaEnum.normal)
    status = Column(Enum(StatusEntregaEnum), default=StatusEntregaEnum.pendente)
    criado_em = Column(DateTime, default=datetime.utcnow)