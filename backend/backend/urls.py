from django.contrib import admin
from django.urls import path, include
from users.views import RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Main API Router
    path('api/', include('api.urls')),
    
    # Authentication Endpoints
    path('api/auth/register/', RegisterView.as_view(), name='auth_register'),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
