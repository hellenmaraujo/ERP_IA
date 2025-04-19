from fastapi import FastAPI
from app.core.database import Base, engine
from app.routers import auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Backend ERP-Log rodando com sucesso!"}

app.include_router(auth_router.router)