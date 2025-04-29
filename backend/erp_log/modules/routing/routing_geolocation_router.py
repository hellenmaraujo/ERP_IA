from fastapi import APIRouter, Depends, HTTPException
from erp_log.modules.routing.routing_geolocation import get_coordinates
from erp_log.core.permissions import check_permission

router = APIRouter()

@router.get("/geolocation")
def geolocate(
    cep: str,
    current_user: dict = Depends(check_permission(["operacional", "administrativo"]))
):
    coords = get_coordinates(cep)
    if coords is None:
        raise HTTPException(status_code=404, detail="CEP não encontrado")
    return {"lat": coords[0], "lng": coords[1]}