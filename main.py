from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from models.ImpactSimulation import ImpactSimulation

app = FastAPI(title="Asteroid Impact Simulator 🚀")

# Підключаємо папку static як статичні файли
# app.mount("/", StaticFiles(directory="static", html=True), name="static")

@app.post("/simulate")
def simulate(impact: ImpactSimulation):
    """
    Приймає JSON з параметрами ImpactSimulation:
    {
        "asteroid": {
            "name": "Apophis",
            "radius": 170,
            "velocity": 25,
            "composition": "rocky"
        },
        "impact_angle": 45,
        "distance_to_impact": 500000
    }
    Повертає обчислені зони шкоди та інші дані
    """
    result = impact.simulate_impact()
    return result

