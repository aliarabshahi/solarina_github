from rest_framework import serializers
from .models import ContactUsModel, ExampleModel, ProductModel, ProductCategoryModel


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


