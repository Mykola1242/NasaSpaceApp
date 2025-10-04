from pydantic import BaseModel
from math import sin, radians
from Asteroid import Asteroid
from Earth import Earth

class ImpactSimulation(BaseModel):
    asteroid: Asteroid
    impact_angle: float         # градуси (0° = горизонтальний удар, 90° = прямий)
    distance_to_impact: float   # км від астероїда до Землі

    def time_to_impact(self) -> float:
        """Час до удару в секундах"""
        v_m_s = self.asteroid.velocity * 1000
        return (self.distance_to_impact * 1000) / v_m_s

    def tnt_equivalent(self, f: float = 1.0) -> float:
        """
        Обчислює TNT-еквівалент удару астероїда з врахуванням кута.
        f — коефіцієнт ефективності (0 < f <= 1)
        """
        energy = 0.5 * self.asteroid.mass() * (self.asteroid.velocity * 1000)**2
        # Кут треба перевести у радіани
        effective_energy = f * energy * sin(radians(self.impact_angle))
        tnt_megatons = effective_energy / 4.184e9  # Дж -> мегатони TNT
        return tnt_megatons

    def simulate_impact(self) -> dict:
        """Основна симуляція зіткнення"""
        energy = self.asteroid.kinetic_energy()
        earth = Earth()
        damage_zones = earth.estimate_damage(energy)
        tnt_mt = self.tnt_equivalent()

        return {
            "asteroid_name": self.asteroid.name,
            "mass_kg": round(self.asteroid.mass(), 2),
            "kinetic_energy_joules": round(energy, 2),
            "time_to_impact_seconds": round(self.time_to_impact(), 2),
            "damage_zones_km": damage_zones,
            "tnt_equivalent_megatons": round(tnt_mt, 3)
        }
