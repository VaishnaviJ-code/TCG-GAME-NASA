from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserCard
from cards.serializers import CardSerializer

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserCardSerializer(serializers.ModelSerializer):
    card = CardSerializer(read_only=True)
    class Meta:
        model = UserCard
        fields = ['id', 'card', 'collected_at']
