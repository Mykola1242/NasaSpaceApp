from pydantic import BaseModel
import math

class Asteroid(BaseModel):
    name: str
    radius: float        # м
    velocity: float      # км/с
    composition: str     # 'rocky', 'metallic', 'icy'
    density_value: float = None  # опціонально, можна підставити власну густину

    def density(self) -> float:
        """Повертає густину астероїда в кг/м³"""
        if self.density_value is not None:
            return self.density_value

        # Емпіричні значення по складу
        densities = {
            "rocky": 3000,
            "metallic": 7800,
            "icy": 1000
        }
        return densities.get(self.composition.lower(), 3000)  # кам’яний за замовчуванням

    def mass(self) -> float:
        """Маса астероїда в кг через об’єм і густину"""
        volume = (4/3) * math.pi * self.radius**3
        return self.density() * volume

    def kinetic_energy(self) -> float:
        """Кінетична енергія удару (Джоулі), velocity км/с -> м/с"""
        v_m_s = self.velocity * 1000
        return 0.5 * self.mass() * v_m_s ** 2
