from pydantic import BaseModel
from math import sin, radians


from models.Asteroid import Asteroid
from models.Earth import Earth

def clamp(x: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, x))

class ImpactSimulation(BaseModel):
    asteroid: Asteroid
    impact_angle: float         # градуси (0° = горизонтальний удар, 90° = прямий)
    distance_to_impact: float   # км від астероїда до Землі

    def time_to_impact(self) -> float:
        """Час до удару в секундах"""
        v_m_s = self.asteroid.velocity * 1000
        return (self.distance_to_impact * 1000) / v_m_s

    @staticmethod
    def base_angle_efficiency(angle: float) -> float:
        """
        Базовий коефіцієнт f, що залежить тільки від кута.
        Це проста piecewise-аппроксимація (емпірична).
        """
        if angle >= 60.0:
            return 1.0
        elif angle >= 30.0:
            return 0.7
        else:
            return 0.5




    @staticmethod
    def density_multiplier(density_kg_m3: float) -> float:
        """
        Модифікатор f залежно від густини (kg/m^3).
        Використовуємо еталонну густину 2600 kg/m^3 (типова для кам'яних тіл,
        вона часто використовується в моделях та в Earth Impact Effects).
        - менш щільні тіла (пористі, крижяні) легше руйнуються в атмосфері -> зменшують f
        - дуже щільні (металеві) краще долають атмосферу -> підвищують f, але з логічним обмеженням
        Значення обрізаються в інтервалі [0.4, 1.2] щоб уникнути екстремумів.
        """
        reference = 2600.0
        ratio = density_kg_m3 / reference
        # обмежуємо вплив — реальні моделі також враховують міцність, але ми аппроксимуємо через густину
        return clamp(ratio, 0.4, 1.2)




    def f_from_angle_and_density(self) -> float:
        """
        Повертає фінальний коефіцієнт f (0 < f <= ~1.2),
        що комбінує ефект кута та густини.
        """
        base_f = self.base_angle_efficiency(self.impact_angle)
        dens = self.asteroid.density()  # kg/m^3
        dens_mult = self.density_multiplier(dens)
        f = base_f * dens_mult
        # ще одна безпекова обрізка в діапазон [0.1, 1.2]
        return clamp(f, 0.1, 1.2)





    def tnt_equivalent(self, f: float = 1.0) -> float:
        """
        Обчислює TNT-еквівалент удару астероїда з врахуванням кута.
        f — коефіцієнт ефективності (0 < f <= 1)
        """
        energy = 0.5 * self.asteroid.mass() * (self.asteroid.velocity * 1000)**2
        # Кут треба перевести у радіани

        f_used = self.f_from_angle_and_density()
        effective_energy = f_used * energy * (sin(radians(self.impact_angle))**2)
        tnt_tons = effective_energy / 4.184e9
        return tnt_tons

    def simulate_impact(self) -> dict:
        """Основна симуляція зіткнення"""
        energy = self.asteroid.kinetic_energy()
        earth = Earth()
        damage_zones = earth.estimate_damage(energy)
        tnt_t = self.tnt_equivalent()

        return {
            "asteroid_name": self.asteroid.name,
            "mass_kg": round(self.asteroid.mass(), 2),
            "kinetic_energy_joules": round(energy, 2),
            "time_to_impact_seconds": round(self.time_to_impact(), 2),
            "damage_zones_km": damage_zones,
            "tnt_equivalent_tons": round(tnt_t, 3)
        }

