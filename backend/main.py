from fastapi import FastAPI
from backend.core.database import Base, engine
from routers.delivery_router import router as delivery_router
from routers.auth_router import router as auth_router
from routers.upload_router import router as upload_router
from backend.routers import admin_router

app = FastAPI()  # <<< CRIA PRIMEIRO O APP

Base.metadata.create_all(bind=engine)

app.include_router(delivery_router)
app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(admin_router.router)

@app.get("/")
def root():
    return {"message": "Backend ERP-Log rodando com sucesso!"}