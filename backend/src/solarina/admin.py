import json
from django.contrib import admin
from rest_framework.authtoken.models import Token
from .models import ContactUsModel, ExampleModel, ProductModel, ProductCategoryModel, OrderModel, OrderPaymentModel
from django.utils.safestring import mark_safe



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
    list_display = (
        "id", 
        "tracking_code", 
        "full_name",
        "phone_number",  # Added phone number here
        "total_price", 
        "status", 
        "display_products", 
        "created_at"
    )
    
    # Added phone number to search capabilities
    search_fields = ("tracking_code", "full_name", "phone_number")
    
    # Filtering capabilities on the right sidebar
    list_filter = ("status", "created_at", "updated_at")
    
    readonly_fields = ("tracking_code", "created_at", "updated_at", "display_products")

    def display_products(self, obj):
        if not obj.products:
            return "[]"
            
        # Extract product IDs
        product_ids = [item.get('product_id') for item in obj.products if item.get('product_id')]
        
        # Fetch related products efficiently
        found_products = ProductModel.objects.filter(id__in=product_ids)
        product_map = {p.id: p.name for p in found_products}
        
        # Create a new list to hold the enriched JSON objects
        enriched_products = []
        for item in obj.products:
            product_data = dict(item) 
            p_id = product_data.get('product_id')
            # Add the product name to the JSON object
            product_data['product_name'] = product_map.get(p_id, "Unknown Product")
            enriched_products.append(product_data)
            
        # Convert the Python list back to a formatted JSON string
        json_string = json.dumps(enriched_products, ensure_ascii=False, indent=2)
        
        # Wrap in a <pre> tag to maintain formatting
        return mark_safe(f'<pre style="text-align: left; direction: ltr; margin: 0;">{json_string}</pre>')

    display_products.short_description = "Products Details"


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
