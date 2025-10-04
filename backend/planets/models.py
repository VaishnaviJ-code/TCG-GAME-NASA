# backend/planets/models.py
from django.db import models

class Planet(models.Model):
    name = models.CharField(max_length=100, unique=True, db_index=True)
    host_star = models.CharField(max_length=100, default='') 
    radius = models.FloatField(null=True, blank=True)
    mass = models.FloatField(null=True, blank=True)
    orbital_period = models.FloatField(null=True, blank=True)
    eccentricity = models.FloatField(null=True, blank=True)
    insolation = models.FloatField(null=True, blank=True)
    star_temp = models.IntegerField(null=True, blank=True)
    star_spectral_type = models.CharField(max_length=20, blank=True)
    discovery_method = models.CharField(max_length=100, blank=True)
    discovery_year = models.IntegerField(null=True, blank=True)
    discovery_facility = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    image_url = models.URLField(max_length=500, blank=True)

    def __str__(self):
        return self.name
