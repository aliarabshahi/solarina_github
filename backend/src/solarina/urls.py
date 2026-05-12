from django.urls import path, include
from rest_framework.routers import SimpleRouter

from .views import ContactUsViewSet, ExampleModelViewSet, OrderPaymentViewSet, OrderViewSet, create_order_payment_view, create_order_view, health_check, ProductModelViewSet, ProductCategoryModelViewSet, verify_order_payment


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

# Orders
router.register(r'orders', OrderViewSet, basename='orders')
router.register(r'order-payments', OrderPaymentViewSet, basename='order-payments')

# ---------------------------------------------------------------------
# URL Patterns
# ---------------------------------------------------------------------
urlpatterns = [
    path('health/', health_check),
    
    # Manual paths FIRST
    path("orders/create/", create_order_view),
    path("orders/payment/create/", create_order_payment_view),
    path("orders/payment/verify/", verify_order_payment),
    
    # Router LAST
    path('', include(router.urls)),
]
