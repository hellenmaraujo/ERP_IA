import PyPDF2
import re
import json
from io import BytesIO

def extrair_texto_pdf(arquivo_pdf):
    """Extrai todo o texto do arquivo PDF"""
    leitor = PyPDF2.PdfReader(arquivo_pdf)
    texto_completo = ""
    for pagina in leitor.pages:
        texto_completo += pagina.extract_text()
    return texto_completo

def formatar_valor(valor_str):
    """Converte string de valor para float"""
    if not valor_str:
        return 0.0
    # Remove caracteres não numéricos exceto ponto e vírgula
    valor_limpo = re.sub(r'[^\d.,]', '', valor_str)
    # Substitui vírgula por ponto
    valor_limpo = valor_limpo.replace(',', '.')
    try:
        return float(valor_limpo)
    except ValueError:
        return 0.0

def extrair_nfe_data(texto):
    """Extrai todas as informações da NF-e do texto e retorna um dicionário JSON"""
    # Extrair informações básicas da NF-e
    num_nfe = re.search(r'Nº\s+(\d+\.\d+\.\d+)', texto).group(1)
    serie = re.search(r'SÉRIE\s+(\d+)', texto).group(1)
    chave_acesso = re.search(r'(\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{4})', texto).group(1)
    data_emissao = re.search(r'DATA DA EMISSÃO\s+(\d{2}/\d{2}/\d{4})', texto).group(1)
    natureza_operacao = re.search(r'NATUREZA DE OPERAÇÃO\s+([^\n]+)', texto).group(1).strip()
    protocolo = re.search(r'PROTOCOLO DE AUTORIZAÇÃO DE USO\s+(\d+)', texto).group(1)
    
    # Extrair informações do emitente
    emitente_razao_social = re.search(r'IDENTIFICAÇAO DO EMITENTE\s+([^\n]+)', texto).group(1).strip()
    emitente_endereco = re.search(r'Rua Onze de Junho, 189[^\n]+', texto).group(0).strip()
    emitente_cep = re.search(r'CEP:(\d{5}-\d{3})', texto).group(1)
    emitente_municipio = re.search(r'CEP:\d{5}-\d{3}\s+-\s+([^\s-]+)', texto).group(1).strip()
    emitente_uf = re.search(r'CEP:\d{5}-\d{3}\s+-\s+[^\s-]+\s+-\s+([A-Z]{2})', texto).group(1)
    emitente_telefone = re.search(r'TEL:\s+(\(\d+\)\d+-\d+)', texto).group(1)
    emitente_ie = re.search(r'INSCRIÇÃO ESTADUAL\s+(\d+)', texto).group(1)
    emitente_cnpj = re.search(r'CNPJ / CPF\s+(\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2})', texto).group(1)
    
    # Extrair informações do destinatário
    dest_razao_social = re.search(r'NOME / RAZÃO SOCIAL\s+([^\n]+)', texto).group(1).strip()
    dest_endereco = re.search(r'ENDEREÇO\s+([^\n]+)', texto).group(1).strip()
    dest_bairro = re.search(r'BAIRRO / DISTRITO\s+([^\n]+)', texto).group(1).strip()
    dest_municipio = re.search(r'MUNICÍPIO\s+([^\n]+)', texto).group(1).strip()
    dest_uf = re.search(r'UF\s+([A-Z]{2})', texto).group(1)
    dest_cep = re.search(r'CEP\s+(\d{5}-\d{3})', texto).group(1)
    dest_telefone = re.search(r'FONE / FAX\s+(\(\d+\)\d+-\d+)', texto).group(1)
    dest_ie = re.search(r'INSCRIÇÃO ESTADUAL\s+(\d+)', texto, re.MULTILINE).group(1)
    dest_cnpj = re.search(r'CNPJ / CPF\s+(\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2})', texto, re.MULTILINE).group(1)
    
    # Extrair duplicatas
    duplicatas_pattern = re.compile(r'(\d{3})\s+(\d{2}/\d{2}/\d{4})\s+([\d.,]+)')
    duplicatas_matches = duplicatas_pattern.findall(texto)
    duplicatas = []
    for num, venc, valor in duplicatas_matches:
        duplicatas.append({
            "numero": num,
            "vencimento": venc,
            "valor": formatar_valor(valor)
        })
    
    # Extrair informações de cálculo de imposto
    base_calculo_icms = formatar_valor(re.search(r'BASE DE CÁLCULO DO ICMS\s+([\d.,]+)', texto).group(1))
    valor_icms = formatar_valor(re.search(r'VALOR DO ICMS\s+([\d.,]+)', texto).group(1))
    base_calculo_icms_subst = formatar_valor(re.search(r'BASE CÁLC. ICMS SUBST.\s+([\d.,]+)', texto).group(1))
    valor_icms_subst = formatar_valor(re.search(r'VALOR DO ICMS SUBST.\s+([\d.,]+)', texto).group(1))
    valor_frete = formatar_valor(re.search(r'VALOR DO FRETE\s+([\d.,]+)', texto).group(1))
    valor_seguro = formatar_valor(re.search(r'VALOR DO SEGURO\s+([\d.,]+)', texto).group(1))
    desconto = formatar_valor(re.search(r'DESCONTO\s+([\d.,]+)', texto).group(1))
    outras_despesas = formatar_valor(re.search(r'OUTRAS DESP. ACESS.\s+([\d.,]+)', texto).group(1))
    valor_ipi = formatar_valor(re.search(r'VALOR DO IPI\s+([\d.,]+)', texto).group(1))
    valor_total_produtos = formatar_valor(re.search(r'VALOR TOTAL DOS PRODUTOS\s+([\d.,]+)', texto).group(1))
    valor_total_nota = formatar_valor(re.search(r'VALOR TOTAL DA NOTA\s+([\d.,]+)', texto).group(1))
    
    # Extrair informações de transporte
    transp_razao_social = re.search(r'TRANSPORTADOR / VOLUMES TRANSPORTADOS\s+RAZÃO SOCIAL\s+([^\n]+)', texto).group(1).strip()
    transp_endereco = re.search(r'ENDEREÇO\s+([^\n]+)\s+FRETE POR CONTA', texto, re.DOTALL).group(1).strip()
    transp_municipio = re.search(r'MUNICÍPIO\s+([^\n]+)', texto, re.MULTILINE).group(1).strip()
    transp_uf = re.search(r'MUNICÍPIO\s+[^\n]+\s+UF\s+([A-Z]{2})', texto).group(1)
    transp_cnpj = re.search(r'CNPJ / CPF\s+(\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2})', texto, re.MULTILINE | re.DOTALL).group(1)
    transp_ie = re.search(r'INSCRIÇÃO ESTADUAL\s+(\d+)', texto, re.MULTILINE | re.DOTALL).group(1)
    frete_por_conta = re.search(r'FRETE POR CONTA\s+([^\n]+)', texto).group(1).strip()
    quantidade = int(re.search(r'QUANTIDADE\s+(\d+)', texto).group(1))
    peso_bruto = formatar_valor(re.search(r'PESO BRUTO \(Kg\)\s+([\d.,]+)', texto).group(1))
    peso_liquido = formatar_valor(re.search(r'PESO LÍQUIDO \(Kg\)\s+([\d.,]+)', texto).group(1))
    
    # Extrair informações dos produtos
    produtos_pattern = re.compile(r'(\d+)\s+(.+?)\s+(\d{8})\s+(\d{3})\s+(\d{4})\s+(\w+)\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)')
    produtos_matches = produtos_pattern.findall(texto)
    produtos = []
    for codigo, descricao, ncm, cst, cfop, unidade, quantidade, valor_unitario, valor_total, desconto_prod, base_calculo, valor_icms_prod, valor_ipi_prod, aliquota_icms, aliquota_ipi in produtos_matches:
        produtos.append({
            "codigo": codigo,
            "descricao": descricao.strip(),
            "ncm": ncm,
            "cst": cst,
            "cfop": cfop,
            "unidade": unidade,
            "quantidade": formatar_valor(quantidade),
            "valor_unitario": formatar_valor(valor_unitario),
            "valor_total": formatar_valor(valor_total),
            "base_calculo_icms": formatar_valor(base_calculo),
            "valor_icms": formatar_valor(valor_icms_prod),
            "valor_ipi": formatar_valor(valor_ipi_prod),
            "aliquota_icms": formatar_valor(aliquota_icms),
            "aliquota_ipi": formatar_valor(aliquota_ipi),
            "desconto": formatar_valor(desconto_prod)
        })
    
    # Extrair informações adicionais
    info_complementares_pattern = re.compile(r'INFORMAÇÕES COMPLEMENTARES\s+([\s\S]+?)\s+RESERVADO AO FISCO')
    info_complementares_texto = info_complementares_pattern.search(texto).group(1).strip()
    info_complementares = [linha.strip() for linha in info_complementares_texto.split('\n') if linha.strip()]
    
    # Estruturar todas as informações no formato JSON
    nfe_data = {
        "informacoes_nfe": {
            "numero": num_nfe,
            "serie": serie,
            "chave_acesso": chave_acesso,
            "natureza_operacao": natureza_operacao,
            "protocolo_autorizacao": protocolo,
            "data_emissao": data_emissao,
            "tipo": "1 - SAÍDA"
        },
        "emitente": {
            "razao_social": emitente_razao_social,
            "endereco": emitente_endereco,
            "cep": emitente_cep,
            "municipio": emitente_municipio,
            "uf": emitente_uf,
            "telefone": emitente_telefone,
            "inscricao_estadual": emitente_ie,
            "cnpj": emitente_cnpj
        },
        "destinatario": {
            "razao_social": dest_razao_social,
            "endereco": dest_endereco,
            "bairro": dest_bairro,
            "municipio": dest_municipio,
            "uf": dest_uf,
            "cep": dest_cep,
            "telefone": dest_telefone,
            "inscricao_estadual": dest_ie,
            "cnpj": dest_cnpj
        },
        "duplicatas": duplicatas,
        "calculo_imposto": {
            "base_calculo_icms": base_calculo_icms,
            "valor_icms": valor_icms,
            "base_calculo_icms_subst": base_calculo_icms_subst,
            "valor_icms_subst": valor_icms_subst,
            "valor_frete": valor_frete,
            "valor_seguro": valor_seguro,
            "desconto": desconto,
            "outras_despesas_acessorias": outras_despesas,
            "valor_ipi": valor_ipi,
            "valor_total_produtos": valor_total_produtos,
            "valor_total_nota": valor_total_nota
        },
        "transporte": {
            "transportadora": transp_razao_social,
            "endereco": transp_endereco,
            "municipio": transp_municipio,
            "uf": transp_uf,
            "cnpj": transp_cnpj,
            "inscricao_estadual": transp_ie,
            "frete_por_conta": frete_por_conta,
            "quantidade": quantidade,
            "peso_bruto": peso_bruto,
            "peso_liquido": peso_liquido
        },
        "produtos": produtos,
        "informacoes_adicionais": {
            "informacoes_complementares": info_complementares
        }
    }
    
    return nfe_data

def extrair_nfe_json(caminho_arquivo):
    """Função principal para extrair informações da NF-e de um arquivo PDF e retornar em formato JSON"""
    try:
        with open(caminho_arquivo, 'rb') as arquivo_pdf:
            texto = extrair_texto_pdf(arquivo_pdf)
            nfe_data = extrair_nfe_data(texto)
            return json.dumps(nfe_data, indent=2, ensure_ascii=False)
    except Exception as e:
        return json.dumps({"erro": f"Erro ao processar o arquivo: {str(e)}"}, indent=2)

# Uso:
# json_result = extrair_nfe_json('caminho/para/seu/arquivo.pdf')
# print(json_result)

# Também pode ser usado como script:
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        resultado = extrair_nfe_json(sys.argv[1])
        print(resultado)
    else:
        print("Por favor, forneça o caminho do arquivo PDF como argumento.")

# Nova função para extração rápida baseada no novo modelo.
def extract_nfe_fields(texto: str):
    """Extrai campos essenciais da NF-e."""
    def buscar(regex, texto, default=None):
        match = re.search(regex, texto)
        return match.group(1).strip() if match else default

    data = {
        "numero_nota": buscar(r'Nº\s+(\d+)', texto),
        "serie": buscar(r'SÉRIE\s+(\d+)', texto),
        "chave_acesso": buscar(r'(\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{4})', texto),
        "data_emissao": buscar(r'DATA DA EMISSÃO\s+(\d{2}/\d{2}/\d{4})', texto),
        "natureza_operacao": buscar(r'NATUREZA DE OPERAÇÃO\s+(.+)', texto),
        "emitente": {
            "cnpj": buscar(r'EMITENTE.*?CNPJ\s+(\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2})', texto),
            "nome": buscar(r'EMITENTE\s+(.+)', texto),
            "endereco": buscar(r'ENDEREÇO\s+(.+)', texto),
            "municipio": buscar(r'MUNICÍPIO\s+(.+)', texto),
            "uf": buscar(r'UF\s+([A-Z]{2})', texto)
        },
        "destinatario": {
            "cnpj": buscar(r'DESTINATÁRIO.*?CNPJ\s+(\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2})', texto),
            "nome": buscar(r'NOME / RAZÃO SOCIAL\s+(.+)', texto),
            "endereco": buscar(r'ENDEREÇO\s+(.+)', texto),
            "municipio": buscar(r'MUNICÍPIO\s+(.+)', texto),
            "uf": buscar(r'UF\s+([A-Z]{2})', texto)
        },
        "transporte": {
            "razao_social": buscar(r'TRANSPORTADOR.*?RAZÃO SOCIAL\s+(.+)', texto),
            "endereco": buscar(r'ENDEREÇO\s+(.+)', texto),
            "municipio": buscar(r'MUNICÍPIO\s+(.+)', texto),
            "uf": buscar(r'UF\s+([A-Z]{2})', texto),
            "peso_bruto": buscar(r'PESO BRUTO\s+\(Kg\)\s+([\d.,]+)', texto),
            "peso_liquido": buscar(r'PESO LÍQUIDO\s+\(Kg\)\s+([\d.,]+)', texto)
        },
        "valores": {
            "valor_total_produtos": buscar(r'VALOR TOTAL DOS PRODUTOS\s+([\d.,]+)', texto),
            "valor_total_nota": buscar(r'VALOR TOTAL DA NOTA\s+([\d.,]+)', texto),
            "valor_frete": buscar(r'VALOR DO FRETE\s+([\d.,]+)', texto),
            "valor_icms": buscar(r'VALOR DO ICMS\s+([\d.,]+)', texto),
            "valor_ipi": buscar(r'VALOR DO IPI\s+([\d.,]+)', texto)
        }
    }
    return data