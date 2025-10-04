class Earth:
    mass: float = 5.972e24      # кг
    radius: float = 6371000      # м
    gravity: float = 9.81        # м/с^2

    def estimate_damage(self, energy: float) -> dict:
        """
        Розрахунок зон шкоди в км навколо точки удару.
        Використовується простий кубічний корінь від енергії.
        """
        k = 0.01  # коефіцієнт для масштабування зон
        severe_radius = k * energy ** (1/3)
        moderate_radius = severe_radius * 2
        minor_radius = severe_radius * 3

        return {
            "severe": round(severe_radius, 1),
            "moderate": round(moderate_radius, 1),
            "minor": round(minor_radius, 1)
        }