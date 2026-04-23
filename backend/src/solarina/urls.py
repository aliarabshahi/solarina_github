from django.urls import path, include
from rest_framework.routers import SimpleRouter

from .views import ContactUsViewSet, ExampleModelViewSet, health_check


# ---------------------------------------------------------------------
# Router Configuration
# ---------------------------------------------------------------------
router = SimpleRouter()

# Example Model endpoints
router.register(r'example-items', ExampleModelViewSet, basename='example-items')

# Forms & User Input APIs
router.register(r'contact-us', ContactUsViewSet, basename='contact-us')

# ---------------------------------------------------------------------
# URL Patterns
# ---------------------------------------------------------------------
urlpatterns = [
    path('health/', health_check),   # Health check endpoint
    path('', include(router.urls)),  # REST endpoints for ExampleModel
]
