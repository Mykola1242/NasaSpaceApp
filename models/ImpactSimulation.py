from pydantic import BaseModel

from Asteroid import Asteroid
from Earth import Earth
class ImpactSimulation(BaseModel):
    asteroid: Asteroid
    impact_angle: float         # градуси (0° = прямий удар)
    distance_to_impact: float   # км від астероїда до Землі

    def time_to_impact(self) -> float:
        """Час до удару в секундах"""
        v_m_s = self.asteroid.velocity * 1000  # км/с -> м/с
        return (self.distance_to_impact * 1000) / v_m_s

    def simulate_impact(self) -> dict:
        """Основна симуляція зіткнення"""
        energy = self.asteroid.kinetic_energy()
        earth = Earth()
        damage_zones = earth.estimate_damage(energy)

        return {
            "asteroid_name": self.asteroid.name,
            "kinetic_energy_joules": energy,
            "time_to_impact_seconds": self.time_to_impact(),
            "damage_zones_km": damage_zones
        }