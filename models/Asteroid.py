from pydantic import BaseModel
class Asteroid(BaseModel):
    name: str
    mass: float          # кг
    radius: float        # м
    velocity: float      # км/с
    composition: str     # 'rocky', 'metallic', 'icy'

    def kinetic_energy(self) -> float:
        """
        Кінетична енергія удару (Джоулі)
        velocity конвертується з км/с в м/с
        """
        v_m_s = self.velocity * 1000  # конвертація км/с -> м/с
        return 0.5 * self.mass * v_m_s ** 2