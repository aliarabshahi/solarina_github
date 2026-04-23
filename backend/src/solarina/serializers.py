from rest_framework import serializers
from .models import ContactUsModel, ExampleModel


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
