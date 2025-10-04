from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserCardViewSet

router = DefaultRouter()
router.register(r'collection', UserCardViewSet, basename='user-collection')

urlpatterns = [
    path('', include(router.urls)),
]
