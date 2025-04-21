#!/bin/bash

echo "Instalando dependências necessárias para seu projeto Python com Scipy..."

# Instalar gcc (C, C++, gfortran)
brew install gcc

# Instalar OpenBLAS
brew install openblas

# Instalar ferramentas de build Python
pip install meson-python ninja

# Exportar variáveis de ambiente para o OpenBLAS
export OPENBLAS=$(brew --prefix openblas)
export CFLAGS="-I$OPENBLAS/include"
export LDFLAGS="-L$OPENBLAS/lib"
export PKG_CONFIG_PATH="$OPENBLAS/lib/pkgconfig"

echo "Variáveis de ambiente configuradas:"
echo "OPENBLAS=$OPENBLAS"
echo "CFLAGS=$CFLAGS"
echo "LDFLAGS=$LDFLAGS"
echo "PKG_CONFIG_PATH=$PKG_CONFIG_PATH"

# Instalar requirements.txt
echo "Instalando requirements.txt..."
pip install -r requirements.txt

echo "✅ Ambiente preparado com sucesso!"
