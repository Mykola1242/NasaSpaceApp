from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from backend.nasa_api import NasaSentryClient
from backend.models.ImpactSimulation import ImpactSimulation

# -> CORS
from fastapi.middleware.cors import CORSMiddleware       

app = FastAPI(title="Asteroid Impact Simulator 🚀")

client = NasaSentryClient()

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

@app.get("/dangerous_asteroids")
def get_dangerous_asteroids(years_ahead: int = 20, top_n: int = 10):
    asteroids = client.filter_and_sort(years_ahead=years_ahead, top_n=top_n)
    return {"count": len(asteroids), "asteroids": asteroids}


