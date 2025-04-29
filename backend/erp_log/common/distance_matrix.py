import os
import requests
from dotenv import load_dotenv
from typing import Optional

load_dotenv()
API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

def coordenadas_para_str(coord):
    return f"{coord['lat']},{coord['lng']}"

def gerar_matriz_google(coords: dict, departure_time: Optional[int] = None):
    """
    coords: dict {id: {"lat": float, "lng": float}}
    returns: dict[(a, b)] = distancia_km
    """
    keys = list(coords.keys())
    origem_str = "|".join([coordenadas_para_str(coords[k]) for k in keys])
    destino_str = origem_str  # matriz simétrica

    url = "https://maps.googleapis.com/maps/api/distancematrix/json"
    params = {
        "origins": origem_str,
        "destinations": destino_str,
        "key": API_KEY,
        "units": "metric",
        "traffic_model": "best_guess"
    }
    if departure_time:
        params["departure_time"] = departure_time

    response = requests.get(url, params=params)
    data = response.json()

    distancias_km = {}
    tempos_min = {}
    custos = {}
    for i, origem in enumerate(keys):
        if i >= len(data["rows"]):  # protege contra índice fora da resposta
            continue
        for j, destino in enumerate(keys):
            if i != j and j < len(data["rows"][i]["elements"]):
                elemento = data["rows"][i]["elements"][j]
                if elemento.get("status") == "OK":
                    distancia_m = elemento["distance"]["value"]
                    duracao_s = elemento.get("duration_in_traffic", elemento["duration"])["value"]
                    distancia_km = distancia_m / 1000
                    tempo_min = duracao_s / 60
                    custo = distancia_km * 2.5  # R$ 2.5 por km

                    distancias_km[(origem, destino)] = distancia_km
                    tempos_min[(origem, destino)] = tempo_min
                    custos[(origem, destino)] = custo

    return distancias_km, tempos_min, custos
