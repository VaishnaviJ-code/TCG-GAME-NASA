# backend/cards/models.py
from django.db import models
from planets.models import Planet

class Card(models.Model):
    planet = models.OneToOneField(Planet, on_delete=models.CASCADE, related_name='card')
    rarity = models.CharField(max_length=20, default='Common')
    # Add other game-specific stats here, e.g., attack, defense, etc.
    attack_power = models.IntegerField(default=10)
    defense_power = models.IntegerField(default=10)

    def __str__(self):
        return f"{self.planet.name} Card ({self.rarity})"
