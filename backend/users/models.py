# backend/users/models.py
from django.db import models
from django.contrib.auth.models import User
from cards.models import Card

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    # Add any extra user info here, like experience points, level, etc.
    experience_points = models.IntegerField(default=0)
    level = models.IntegerField(default=1)

    def __str__(self):
        return self.user.username

class UserCard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cards')
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    collected_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'card') # A user can only have one of each card

    def __str__(self):
        return f"{self.user.username}'s {self.card.planet.name}"
