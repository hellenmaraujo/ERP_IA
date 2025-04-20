import PyPDF2
import re

def extrair_texto_pdf(arquivo_pdf):
    """Extrai todo o texto do arquivo PDF"""
    leitor = PyPDF2.PdfReader(arquivo_pdf)
    texto_completo = ""
    for pagina in leitor.pages:
        texto_completo += pagina.extract_text()
    return texto_completo

def extract_nfe_fields(texto: str):
    """Extrai campos mínimos essenciais da NF-e"""
    def buscar(regex, texto, default=None, flags=0):
        match = re.search(regex, texto, flags=flags)
        if not match:
            return default
        return match.group(1).strip() if match.lastindex else match.group(0).strip()
    
    def buscar_peso(regex, texto, default=None, flags=0):
        match = re.search(regex, texto, flags=flags)
        if not match:
            return default
        return match.group(2).strip() if match.lastindex and match.lastindex >= 2 else default

    # Correções específicas:
    numero_nota = buscar(r'Nº\s+([\d\.]+)', texto)
    if numero_nota:
        numero_nota = numero_nota.replace('.', '')  # remove os pontos

    municipio_bruto = buscar(r'MUNICÍPIO\s+([^\n]+)', texto)
    if municipio_bruto:
        municipio_bruto = municipio_bruto.split("FONE")[0].strip()

    bairro = buscar(r'BAIRRO / DISTRITO\s+([^\n]+)', texto)
    if not bairro:
        # fallback: procurar bairro no endereço caso não ache direto
        bairro = buscar(r'Bairro\s*:\s*([^\n]+)', texto)

    cep = buscar(r'CEP\s*[:\-]?\s*(\d{5}-\d{3})', texto)
    if not cep:
        cep = buscar(r'(\d{5}-\d{3})', texto)

    peso_bruto = buscar_peso(r'PESO BRUTO\s*(\(Kg\))?\s*[:\s]*([\d.,]+)', texto)

    return {
        "numero_nota": numero_nota,
        "destinatario": buscar(r'NOME / RAZÃO SOCIAL\s+([^\n]+)', texto),
        "endereco": buscar(r'ENDEREÇO\s+([^\n]+)', texto),
        "bairro": bairro,
        "municipio": municipio_bruto,
        "uf": buscar(r'UF\s+([A-Z]{2})', texto),
        "cep": cep,
        "peso_bruto": peso_bruto
    }