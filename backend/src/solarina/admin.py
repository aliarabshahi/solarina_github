from django.contrib import admin
from rest_framework.authtoken.models import Token
from .models import ContactUsModel, ExampleModel


# ---------------------------------------------------------------------
# Example Model Admin Configuration
# ---------------------------------------------------------------------
class ExampleModelAdmin(admin.ModelAdmin):
    """Admin interface for ExampleModel."""
    list_display = ('title', 'slug', 'is_active', 'created_at', 'updated_at')
    search_fields = ('title', 'description')
    list_filter = ('is_active',)
    readonly_fields = ('created_at', 'updated_at')
    prepopulated_fields = {'slug': ('title',)}
    list_per_page = 20


# ---------------------------------------------------------------------
# Forms Admin Configurations
# ---------------------------------------------------------------------
class ContactUsAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone_number', 'created_at')
    search_fields = ('full_name', 'email', 'phone_number')
    readonly_fields = ('created_at',)
    list_per_page = 20


# ---------------------------------------------------------------------
# Model Registration
# ---------------------------------------------------------------------
admin.site.register(ExampleModel, ExampleModelAdmin)
admin.site.register(ContactUsModel, ContactUsAdmin)
admin.site.register(Token)
