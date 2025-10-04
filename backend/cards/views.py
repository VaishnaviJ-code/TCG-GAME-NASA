from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Card
from .serializers import CardSerializer
import random

class CardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def deck(self, request):
        all_cards = list(Card.objects.all())
        if len(all_cards) < 5:
            return Response({"error": "Not enough cards in the database to create a deck."}, status=400)
        
        deck_cards = random.sample(all_cards, 5)
        serializer = self.get_serializer(deck_cards, many=True)
        return Response(serializer.data)
