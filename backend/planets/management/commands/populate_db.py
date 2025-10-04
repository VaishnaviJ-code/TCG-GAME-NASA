# backend/planets/management/commands/populate_db.py

import requests
from django.core.management.base import BaseCommand
from django.db import transaction
from planets.models import Planet
from cards.models import Card

# NASA Exoplanet Archive TAP URL and query
TAP_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync"
EXOPLANET_QUERY = "SELECT pl_name, hostname, disc_year, pl_orbper, pl_rade, pl_bmasse FROM ps"

# backend/planets/management/commands/populate_db.py
# ... (imports) ...

class Command(BaseCommand):
    help = 'Populates the database with exoplanet data from the NASA Exoplanet Archive.'

    def handle(self, *args, **kwargs):
        self.stdout.write("--- Starting database population ---")

        # 1. Fetch data from NASA API
        self.stdout.write("Step 1: Fetching data from NASA Exoplanet Archive...")
        params = {
            "query": " ".join(EXOPLANET_QUERY.split()),
            "format": "json",
        }
        try:
            response = requests.get(TAP_URL, params=params, timeout=120)
            response.raise_for_status()
            planets_data = response.json()
            
            # ADD THIS LOGGING
            self.stdout.write(self.style.SUCCESS(f"Successfully fetched {len(planets_data)} records from NASA."))
            if not planets_data:
                self.stdout.write(self.style.WARNING("Warning: The API returned an empty list. No data will be populated."))
                return # Exit the command if there's no data

        except requests.RequestException as e:
            self.stderr.write(self.style.ERROR(f"API Request Failed: {e}"))
            return

        # 2. Use a transaction to ensure data integrity
        with transaction.atomic():
            self.stdout.write("Step 2: Clearing old planet and card data...")
            Planet.objects.all().delete()
            Card.objects.all().delete()
            self.stdout.write(self.style.SUCCESS("Successfully cleared old data."))

            self.stdout.write("Step 3: Populating new planet data...")
            for planet in planets_data:
                # Create or update the planet record
                planet_obj, created = Planet.objects.update_or_create(
                    name=planet['pl_name'],
                    defaults={
                        'host_star': planet['hostname'],
                        'discovery_year': planet['disc_year'],
                        'orbital_period': planet['pl_orbper'],
                        'radius': planet['pl_rade'],
                        'mass': planet['pl_bmasse'],
                    }
                )
                if created:
                    self.stdout.write(self.style.SUCCESS(f"Created new planet: {planet['pl_name']}"))
                else:
                    self.stdout.write(self.style.WARNING(f"Updated existing planet: {planet['pl_name']}"))

            self.stdout.write(self.style.SUCCESS("Successfully populated planet data."))

        self.stdout.write("--- Starting database population ---")

        # 1. Fetch data from NASA API
        self.stdout.write("Step 1: Fetching data from NASA Exoplanet Archive...")
        params = {
            "query": " ".join(EXOPLANET_QUERY.split()),
            "format": "json",
        }
        try:
            response = requests.get(TAP_URL, params=params, timeout=120)
            response.raise_for_status()
            planets_data = response.json()
            
            # ADD THIS LOGGING
            self.stdout.write(self.style.SUCCESS(f"Successfully fetched {len(planets_data)} records from NASA."))
            if not planets_data:
                self.stdout.write(self.style.WARNING("Warning: The API returned an empty list. No data will be populated."))
                return # Exit the command if there's no data

        except requests.RequestException as e:
            self.stderr.write(self.style.ERROR(f"API Request Failed: {e}"))
            return

        # 2. Use a transaction to ensure data integrity
        with transaction.atomic():
            self.stdout.write("Step 2: Clearing old planet and card data...")
            # ... (rest of the script) ...
