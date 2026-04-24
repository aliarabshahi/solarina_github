from django.urls import path, include
from rest_framework.routers import SimpleRouter

from .views import ContactUsViewSet, ExampleModelViewSet, health_check, ProductModelViewSet, ProductCategoryModelViewSet


# ---------------------------------------------------------------------
# Router Configuration
# ---------------------------------------------------------------------
router = SimpleRouter()

# Example Model endpoints
router.register(r'example-items', ExampleModelViewSet, basename='example-items')

# Forms & User Input APIs
router.register(r'contact-us', ContactUsViewSet, basename='contact-us')

# Products
router.register(r'product-categories', ProductCategoryModelViewSet, basename='product-categories')
router.register(r'products', ProductModelViewSet, basename='products')

# ---------------------------------------------------------------------
# URL Patterns
# ---------------------------------------------------------------------
urlpatterns = [
    path('health/', health_check),   # Health check endpoint
    path('', include(router.urls)),  # REST endpoints for ExampleModel
]
