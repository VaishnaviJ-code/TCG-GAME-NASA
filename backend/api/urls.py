from django.urls import path, include
from rest_framework.routers import DefaultRouter
from planets.views import PlanetViewSet
from cards.views import CardViewSet
from users.views import UserCardViewSet

router = DefaultRouter()
router.register(r'planets', PlanetViewSet, basename='planet')
router.register(r'cards', CardViewSet, basename='card')
router.register(r'collection', UserCardViewSet, basename='user-collection')

urlpatterns = [
    path('', include(router.urls)),
]
