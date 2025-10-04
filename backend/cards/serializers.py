from rest_framework import serializers
from .models import Card
from planets.serializers import PlanetSerializer

class CardSerializer(serializers.ModelSerializer):
    planet = PlanetSerializer(read_only=True) # Nest the planet details
    class Meta:
        model = Card
        fields = ['id', 'planet', 'rarity', 'attack_power', 'defense_power']
