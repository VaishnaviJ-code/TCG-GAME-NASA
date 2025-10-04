from rest_framework import generics, permissions, viewsets
from django.contrib.auth.models import User
from .models import UserCard
from .serializers import UserRegistrationSerializer, UserCardSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserRegistrationSerializer

class UserCardViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserCardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserCard.objects.filter(user=self.request.user)
