from rest_framework import serializers
from .models import ContactUsModel, ExampleModel, ProductImageModel, ProductModel, ProductCategoryModel, OrderPaymentModel, OrderModel, UserModel


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



class ProductImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProductImageModel
        fields = [
            "id",
            "image",
            "image_url",
            "alt_text",
            "is_primary",
        ]

    def get_image_url(self, obj):
        request = self.context.get("request")

        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)

            return obj.image.url

        return None

class ProductModelSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    images = ProductImageSerializer(
        many=True,
        read_only=True
    )

    primary_image = serializers.SerializerMethodField()

    class Meta:
        model = ProductModel
        fields = [
            "id",
            "name",
            "slug",
            "short_description",
            "description",
            "price",
            "stock",
            "is_active",
            "is_featured",
            "category",
            "category_name",
            "images",
            "primary_image",
        ]

    def get_primary_image(self, obj):
        request = self.context.get("request")

        primary = obj.images.filter(
            is_primary=True
        ).first()

        if not primary:
            primary = obj.images.first()

        if primary and primary.image:
            if request:
                return request.build_absolute_uri(
                    primary.image.url
                )

            return primary.image.url

        return None

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
