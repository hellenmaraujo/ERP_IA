from typing import List, Tuple
from schemas.routing_schemas import Entrega, Veiculo
import math
from itertools import combinations
from utils.distance_matrix import gerar_matriz_google
from models.roteirizacao import salvar_rotas
from sqlalchemy.orm import Session

def distancia(p1, p2):
    return math.hypot(p1.x - p2.x, p1.y - p2.y)

def gerar_matriz(entregas: List[Entrega]):
    coords = {("Matrix SPMax" if e.id == "CD" else e.id): {"lat": e.x if e.id != "CD" else -23.416184, "lng": e.y if e.id != "CD" else -46.444607} for e in entregas}
    return gerar_matriz_google(coords)

def peso_rota(rota, entregas_dict):
    return sum(entregas_dict[p].peso for p in rota if p in entregas_dict)

def clarke_wright_2opt(entregas: List[Entrega], veiculos: List[Veiculo], db: Session):
    entregas_dict = {("Matrix SPMax" if e.id == "CD" else e.id): e for e in entregas if e.id != "CD"}
    cd = next((e for e in entregas if e.id == "Matrix SPMax"), None)
    if not cd:
        raise ValueError("Ponto de origem 'Matrix SPMax' não encontrado nas entregas.")
    distancias, tempos, custos = gerar_matriz(entregas)

    rotas = {p: ["Matrix SPMax", p, "Matrix SPMax"] for p in entregas_dict}
    savings = []

    for (a, b) in combinations(entregas_dict, 2):
        if (("Matrix SPMax", a) in distancias and
            ("Matrix SPMax", b) in distancias and
            (a, b) in distancias):
            
            saving = (
                distancias[("Matrix SPMax", a)]
                + distancias[("Matrix SPMax", b)]
                - distancias[(a, b)]
            )
            savings.append((saving, a, b))
    savings.sort(reverse=True)

    for saving, a, b in savings:
        rota_a = next((r for r in rotas.values() if r[1] == a and r[-2] != b), None)
        rota_b = next((r for r in rotas.values() if r[1] == b and r[-2] != a), None)

        if rota_a and rota_b and rota_a != rota_b:
            nova_rota = rota_a[:-1] + rota_b[1:]
            carga = peso_rota(nova_rota, entregas_dict)
            if carga <= max(v.capacidade for v in veiculos):
                rotas.pop(rota_a[1])
                rotas.pop(rota_b[1])
                rotas[nova_rota[1]] = nova_rota

    resultado = []
    for rota in rotas.values():
        carga = peso_rota(rota, entregas_dict)
        veiculo = next((v for v in veiculos if carga <= v.capacidade), None)
        if veiculo:
            otimizada, dist_total = aplicar_2opt(rota, distancias)
            tempo_total = sum(
                tempos.get((otimizada[i], otimizada[i+1]), 0)
                for i in range(len(otimizada) - 1)
            )
            resultado.append({
                "veiculo": veiculo.tipo,
                "rota": otimizada,
                "carga_total": carga,
                "distancia_total": dist_total,
                "tempo_total": tempo_total,
                "custo_total": round(sum(
                    custos.get((otimizada[i], otimizada[i+1]), 0)
                    for i in range(len(otimizada) - 1)
                ), 2)
            })
    salvar_rotas(rotas=resultado, db=db)
    return resultado

def aplicar_2opt(rota, dist_dict):
    melhor_rota = rota
    melhor_dist = sum(
        dist_dict.get((melhor_rota[i], melhor_rota[i+1]), 0)
        for i in range(len(melhor_rota) - 1)
    )
    melhorou = True

    while melhorou:
        melhorou = False
        for i in range(1, len(melhor_rota) - 2):
            for j in range(i + 1, len(melhor_rota) - 1):
                nova_rota = melhor_rota[:i] + melhor_rota[i:j+1][::-1] + melhor_rota[j+1:]
                nova_dist = sum(
                    dist_dict.get((nova_rota[k], nova_rota[k+1]), 0)
                    for k in range(len(nova_rota) - 1)
                )
                if nova_dist < melhor_dist:
                    melhor_rota = nova_rota
                    melhor_dist = nova_dist
                    melhorou = True
    return melhor_rota, round(melhor_dist, 2)
