#!/bin/bash

echo "🚀 Inicializando configuração do ambiente ERP_Log..."

# Detecta sistema operacional
OS=$(uname)
echo "🧠 Sistema detectado: $OS"

# Função para instalar dependências em macOS
setup_macos() {
  echo "🔧 Instalando dependências no macOS..."

  if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew não encontrado. Por favor, instale o Homebrew antes de continuar."
    exit 1
  fi

  brew install gcc openblas

  export OPENBLAS=$(brew --prefix openblas)
  export CFLAGS="-I$OPENBLAS/include"
  export LDFLAGS="-L$OPENBLAS/lib"
  export PKG_CONFIG_PATH="$OPENBLAS/lib/pkgconfig"

  echo "✅ Variáveis de ambiente configuradas para OpenBLAS (macOS)"
}

# Função para instalar dependências em Linux
setup_linux() {
  echo "🔧 Instalando dependências no Linux..."

  sudo apt update && sudo apt install -y build-essential gfortran libopenblas-dev

  export OPENBLAS=/usr/lib/x86_64-linux-gnu/openblas
  export CFLAGS="-I/usr/include"
  export LDFLAGS="-L/usr/lib"
  export PKG_CONFIG_PATH="/usr/lib/pkgconfig"

  echo "✅ Variáveis de ambiente configuradas para OpenBLAS (Linux)"
}

# Função para instruções no Windows
setup_windows() {
  echo "⚠️ Este script não é compatível com execução direta no Windows."
  echo "👉 Siga os passos abaixo manualmente:"
  echo "1. Instale o Python e o pip."
  echo "2. Instale o compilador C/C++ (MSVC ou mingw)."
  echo "3. Instale o OpenBLAS, se necessário (ou use wheel pré-compilado)."
  echo "4. Crie o ambiente virtual:"
  echo "   python -m venv venv"
  echo "5. Ative o ambiente virtual:"
  echo "   .\\venv\\Scripts\\activate"
  echo "6. Instale as dependências:"
  echo "   pip install -r requirements.txt"
}

# Detecta e executa configuração específica
case "$OS" in
  "Darwin")
    setup_macos
    ;;
  "Linux")
    setup_linux
    ;;
  "MINGW"* | "MSYS"* | "CYGWIN"* | "Windows_NT")
    setup_windows
    ;;
  *)
    echo "❌ Sistema operacional não suportado: $OS"
    exit 1
    ;;
esac

# Ativa ambiente virtual se existir
if [ -f "venv/bin/activate" ]; then
  source venv/bin/activate
  echo "🐍 Ambiente virtual ativado."
else
  echo "⚠️ Nenhum ambiente virtual encontrado (venv/)."
fi

# Instala dependências Python
if [ -f "requirements.txt" ]; then
  echo "📦 Instalando pacotes do requirements.txt..."
  pip install -r requirements.txt
else
  echo "⚠️ Arquivo requirements.txt não encontrado."
fi

echo "✅ Ambiente configurado com sucesso!"
