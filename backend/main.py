from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from erp_log.core.database import Base, engine
from erp_log.modules.deliveries.deliveries_router import router as delivery_router
from erp_log.modules.users.users_router import router as auth_router
from erp_log.modules.deliveries.deliveries_upload_router import router as upload_router
from erp_log.modules.users.users_admin_router import router as admin_router
from erp_log.modules.routing.routing_router import router as routing_router
from erp_log.modules.routing.routing_geolocation_router import router as geolocation_router
from erp_log.modules.vehicles.vehicle_router import router as vehicle_router
from erp_log.modules.fuel.fuel_router import router as fuel_router
from erp_log.modules.drivers.driver_router import router as driver_router
from erp_log.modules.route.routes_router import router as route_router
from erp_log.modules.proof.proof_router import router as proof_router
from erp_log.modules.kpis.kpi_router import router as kpi_router
from erp_log.modules.reports.reports_router import router as reports_router
from erp_log.modules.vehicles.maintenance_router import router as maintenance_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",  # adicionar aqui também!
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(delivery_router)
app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(admin_router)
app.include_router(routing_router, prefix="/routing", tags=["Roteirização"])
app.include_router(geolocation_router, prefix="/routing", tags=["Geolocalização"])
app.include_router(vehicle_router, prefix="/vehicles", tags=["Veículos"])
app.include_router(fuel_router, prefix="/fuel", tags=["Abastecimentos"])
app.include_router(driver_router, prefix="/drivers", tags=["Motoristas"])
app.include_router(route_router, prefix="/routes", tags=["Rotas"])
app.include_router(proof_router, prefix="/proof", tags=["Comprovantes"])
app.include_router(kpi_router)
app.include_router(reports_router)
app.include_router(maintenance_router)

@app.get("/")
def root():
    return {"message": "Backend ERP-Log rodando com sucesso!"}

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import BaseModel

# Configurações básicas do JWT
SECRET_KEY = "seusegredoaqui"  # troque para sua chave real
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

class UserOut(BaseModel):
    nome: str
    perfil: str

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não autorizado",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        nome = payload.get("sub")
        perfil = payload.get("perfil")
        if nome is None or perfil is None:
            raise credentials_exception
        return {"nome": nome, "perfil": perfil}
    except JWTError:
        raise credentials_exception

@app.get("/auth/me", response_model=UserOut)
def read_users_me(current_user: dict = Depends(get_current_user)):
    return current_user