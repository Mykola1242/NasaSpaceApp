from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from models.ImpactSimulation import ImpactSimulation

# -> CORS
from fastapi.middleware.cors import CORSMiddleware       

app = FastAPI(title="Asteroid Impact Simulator 🚀")

# Підключаємо папку static як статичні файли
# app.mount("/", StaticFiles(directory="static", html=True), name="static")

# -> ------------- CORS -------------
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -> -------------------------------

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

