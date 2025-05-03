import requests
from typing import Optional, Dict
from erp_log.core.config import get_settings

settings = get_settings()

def get_coordinates(cep: str) -> Optional[Dict[str, float]]:
    cep = cep.strip()
    query = f"{cep.replace('-', '')}, Brasil"

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
            return {"lat": location["lat"], "lng": location["lng"]}
    print("Google Geocoding API response:", data)
    return None