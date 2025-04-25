from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from erp_log.core.database import Base, engine
from erp_log.modules.deliveries.deliveries_router import router as delivery_router
from erp_log.modules.users.users_router import router as auth_router
from erp_log.modules.deliveries.deliveries_upload_router import router as upload_router
from erp_log.modules.users.users_admin_router import router as admin_router
from erp_log.modules.routing.routing_router import router as routing_router
from erp_log.modules.vehicles.vehicle_router import router as vehicle_router
from erp_log.modules.fuel.fuel_router import router as fuel_router
from erp_log.modules.drivers.driver_router import router as driver_router
from erp_log.modules.route.routes_router import router as route_router

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
app.include_router(vehicle_router, prefix="/vehicles", tags=["Veículos"])
app.include_router(fuel_router, prefix="/fuel", tags=["Abastecimentos"])
app.include_router(driver_router, prefix="/drivers", tags=["Motoristas"])
app.include_router(route_router, prefix="/routes", tags=["Rotas"])

@app.get("/")
def root():
    return {"message": "Backend ERP-Log rodando com sucesso!"}
