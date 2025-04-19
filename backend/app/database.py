from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Configurações de conexão
DB_USER = "postgres"   # <<< ALTERADO AQUI
DB_PASSWORD = "admin"  # <<< A SENHA você manteve "admin" mesmo
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "logistico"

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()