# backend/planets/management/commands/fetch_images.py

import requests
import time
from django.core.management.base import BaseCommand
from django.conf import settings
from planets.models import Planet

class Command(BaseCommand):
    help = 'Fetches image URLs for existing planets from the NASA Image Library.'

    def handle(self, *args, **kwargs):
        self.stdout.write("--- Starting to fetch planet images ---")
        
        api_key = settings.NASA_API_KEY
        if not api_key or api_key == 'DEMO_KEY':
            self.stderr.write(self.style.ERROR("NASA_API_KEY is not configured in your .env file. Please add it."))
            return

        planets_to_update = Planet.objects.filter(image_url__exact='')
        total_planets = planets_to_update.count()
        self.stdout.write(f"Found {total_planets} planets that need an image URL.")

        for i, planet in enumerate(planets_to_update):
            # Pause briefly to respect API rate limits
            time.sleep(0.5) 
            
            search_term = planet.name
            url = f"https://images-api.nasa.gov/search?q={search_term}&media_type=image"
            
            self.stdout.write(f"({i+1}/{total_planets}) Searching for '{search_term}'...")

            try:
                # Make the network request
                response = requests.get(url, timeout=20) # Increased timeout
                response.raise_for_status()
                data = response.json()
                
                items = data.get('collection', {}).get('items', [])
                if items:
                    image_url = items[0].get('links', [{}])[0].get('href')
                    if image_url:
                        planet.image_url = image_url
                        planet.save()
                        self.stdout.write(self.style.SUCCESS(f"  -> Success! Found and saved image for {planet.name}"))
                    else:
                        self.stdout.write(self.style.WARNING(f"  -> Found item but no image link for {planet.name}."))
                else:
                    self.stdout.write(self.style.WARNING(f"  -> No image found for {planet.name}."))

            except requests.exceptions.RequestException as e:
                # This block now catches any network error (timeout, connection error, etc.)
                self.stderr.write(self.style.ERROR(f"  -> Network error for {planet.name}: {e}"))
                # The script will now continue to the next planet instead of crashing

        self.stdout.write(self.style.SUCCESS("--- Image fetching complete. ---"))

