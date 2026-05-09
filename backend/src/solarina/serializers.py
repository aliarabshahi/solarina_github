from rest_framework import serializers
from .models import ContactUsModel, ExampleModel, ProductModel, ProductCategoryModel, OrderPaymentModel, OrderModel


# ---------------------------------------------------------------------
# Example Serializer
# ---------------------------------------------------------------------
class ExampleModelSerializer(serializers.ModelSerializer):
    """Serializer for ExampleModel."""

    class Meta:
        model = ExampleModel
        fields = '__all__'


# ---------------------------------------------------------------------
# Contact Serializer
# ---------------------------------------------------------------------
class ContactUsSerializer(serializers.ModelSerializer):
    """Serializer for ContactUs model."""
    class Meta:
        model = ContactUsModel
        fields = '__all__'



# ---------------------------------------------------------------------
# Product Category Serializer
# ---------------------------------------------------------------------
class ProductCategoryModelSerializer(serializers.ModelSerializer):
    """Serializer for ProductCategoryModel."""

    class Meta:
        model = ProductCategoryModel
        fields = '__all__'


# ---------------------------------------------------------------------
# Product Serializer
# ---------------------------------------------------------------------
class ProductModelSerializer(serializers.ModelSerializer):
    """Serializer for ProductModel."""

    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = ProductModel
        fields = '__all__'

# ---------------------------------------------------------------------
# Order Serializer
# ---------------------------------------------------------------------
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderModel
        fields = "__all__"
        read_only_fields = ["status", "created_at", "updated_at"]


# ---------------------------------------------------------------------
# OrderPayment Serializer
# ---------------------------------------------------------------------
class OrderPaymentSerializer(serializers.ModelSerializer):
    # Include the full nested order detail (read-only)
    order_detail = OrderSerializer(source='order', read_only=True)

    class Meta:
        model = OrderPaymentModel
        fields = "__all__"
        read_only_fields = ["status", "created_at", "updated_at"]

