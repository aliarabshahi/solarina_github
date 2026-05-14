from rest_framework import serializers
from .models import ContactUsModel, ExampleModel, ProductModel, ProductCategoryModel, OrderPaymentModel, OrderModel, UserModel


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
        read_only_fields = ["tracking_code", "status", "created_at", "updated_at"]

    def to_representation(self, instance):
        # Get the standard serialization
        representation = super().to_representation(instance)
        
        # Get the products JSON list
        products = representation.get('products', [])
        
        # Extract product_ids to query them all at once (prevents N+1 queries per order)
        product_ids = [item.get('product_id') for item in products if item.get('product_id')]
        
        if product_ids:
            # Query the database for these products
            found_products = ProductModel.objects.filter(id__in=product_ids)
            
            # Create a dictionary mapping product ID to product Name
            product_map = {product.id: product.name for product in found_products}
            
            # Inject the product_name back into the representation
            for item in products:
                p_id = item.get('product_id')
                # Add the name, or a default string if the product was deleted
                item['product_name'] = product_map.get(p_id, "Product not found")

        representation['products'] = products
        return representation

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



# ---------------------------------------------------------------------
# Send OTP Serializer
# ---------------------------------------------------------------------
class SendOTPSerializer(serializers.Serializer):

    phone_number = serializers.CharField(max_length=11)

# ---------------------------------------------------------------------
# Verify OTP Serializer
# ---------------------------------------------------------------------
class VerifyOTPSerializer(serializers.Serializer):

    phone_number = serializers.CharField(max_length=11)

    code = serializers.CharField(max_length=4)


# ---------------------------------------------------------------------
# User Serializer
# ---------------------------------------------------------------------
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserModel
        fields = "__all__"
