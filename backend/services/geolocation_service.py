import requests
from typing import Optional, Tuple
from backend.core.config import get_settings

settings = get_settings()

def get_coordinates(address: str, city: str, state: str) -> Optional[Tuple[float, float]]:
    # Limpar entradas
    address = address.strip()
    city = city.strip().split("FONE")[0].strip()  # Remove se tiver lixo "FONE"
    state = state.strip()

    query = f"{address}, {city} - {state}, Brasil"

    url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "address": query,
        "key": settings.GOOGLE_MAPS_API_KEY
    }

    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        if data.get("results"):
            location = data["results"][0]["geometry"]["location"]
            return location["lat"], location["lng"]
    return None