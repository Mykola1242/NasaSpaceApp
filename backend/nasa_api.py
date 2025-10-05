import requests
from datetime import datetime

class NasaSentryClient:
    BASE_URL = "https://ssd-api.jpl.nasa.gov/sentry.api"

    def __init__(self):
        self.asteroids = []

    def fetch_virtual_impactors(self):
        """
        Отримує всі Virtual Impactors з NASA Sentry API
        Зберігає їх у self.asteroids як список словників
        """
        params = {"all": 1}
        response = requests.get(self.BASE_URL, params=params)
        if response.status_code != 200:
            raise Exception(f"Помилка запиту до NASA API: {response.status_code}")

        data = response.json().get("data", [])
        self.asteroids = []
        for item in data:
            name = item.get("des")
            ip = float(item.get("ip", 0))
            date_str = item.get("date", "")
            if name and date_str:
                self.asteroids.append({
                    "name": name,
                    "ip": ip,
                    "date": date_str
                })

        return self.asteroids

    def filter_and_sort(self, years_ahead: int = 20, top_n: int = 10):
        """
        Фільтрує астероїди за роком (від поточного року до поточного + years_ahead)
        та повертає відсортований список за датою удару та топ-N
        """
        if not self.asteroids:
            self.fetch_virtual_impactors()

        current_year = datetime.today().year
        end_year = current_year + years_ahead

        filtered = []
        for a in self.asteroids:
            try:
                year = int(a["date"].split("-")[0])
            except ValueError:
                continue
            if current_year <= year <= end_year:
                filtered.append(a)

        # Сортуємо за датою (найближчі удари спочатку)
        filtered.sort(key=lambda x: x["date"])

        return filtered[:top_n]
