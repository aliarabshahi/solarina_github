from django.contrib import admin
from rest_framework.authtoken.models import Token
from .models import ContactUsModel, ExampleModel, ProductModel, ProductCategoryModel, OrderModel, OrderPaymentModel



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
# Product Category Admin Configuration
# ---------------------------------------------------------------------
class ProductCategoryModelAdmin(admin.ModelAdmin):
    """Admin interface for ProductCategoryModel."""
    
    list_display = ('name', 'slug', 'created_at', 'updated_at')
    search_fields = ('name',)
    readonly_fields = ('created_at', 'updated_at')
    prepopulated_fields = {'slug': ('name',)}
    list_per_page = 20

# ---------------------------------------------------------------------
# Product Admin Configuration
# ---------------------------------------------------------------------
class ProductModelAdmin(admin.ModelAdmin):
    """Admin interface for ProductModel."""
    
    list_display = (
        'name',
        'category',
        'price',
        'stock',
        'is_active',
        'created_at'
    )
    search_fields = ('name', 'description')
    list_filter = ('is_active', 'category')
    readonly_fields = ('created_at', 'updated_at')
    prepopulated_fields = {'slug': ('name',)}
    list_per_page = 20

# ---------------------------------------------------------------------
# Orders Admin Configuration
# ---------------------------------------------------------------------
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "full_name", "total_price", "status", "created_at")
    readonly_fields = ("created_at", "updated_at")

class OrderPaymentAdmin(admin.ModelAdmin):
    list_display = ("authority", "amount", "status", "created_at")
    readonly_fields = ("created_at", "updated_at")


# ---------------------------------------------------------------------
# Model Registration
# ---------------------------------------------------------------------
admin.site.register(ExampleModel, ExampleModelAdmin)
admin.site.register(ContactUsModel, ContactUsAdmin)
admin.site.register(ProductCategoryModel, ProductCategoryModelAdmin)
admin.site.register(ProductModel, ProductModelAdmin)
admin.site.register(Token)
admin.site.register(OrderModel, OrderAdmin)
admin.site.register(OrderPaymentModel, OrderPaymentAdmin)
