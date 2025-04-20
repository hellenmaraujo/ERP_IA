from fastapi import FastAPI
from app.core.database import Base, engine
from app.routers import auth_router
from app.routers import delivery_router
from app.routers import upload_router


app = FastAPI()  # <<< CRIA PRIMEIRO O APP

Base.metadata.create_all(bind=engine)

app.include_router(delivery_router.router)
app.include_router(auth_router.router)
app.include_router(upload_router.router)

@app.get("/")
def root():
    return {"message": "Backend ERP-Log rodando com sucesso!"}