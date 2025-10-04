from rest_framework import viewsets, permissions
from rest_framework.pagination import PageNumberPagination # Import this
from .models import Planet
from .serializers import PlanetSerializer

class StandardResultsSetPagination(PageNumberPagination):
    """
    Custom pagination class to set the page size.
    """
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class PlanetViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Planet.objects.all().order_by('name')
    serializer_class = PlanetSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = StandardResultsSetPagination # Add this line
