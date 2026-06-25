import json

from django.contrib import admin
from django.utils.safestring import mark_safe
from rest_framework.authtoken.models import Token

from .models import (
    ContactUsModel,
    ExampleModel,
    ProductModel,
    ProductImageModel,
    ProductCategoryModel,
    OrderModel,
    OrderPaymentModel,
    UserModel,
    OTPModel,
)


# ---------------------------------------------------------------------
# Example Model Admin Configuration
# ---------------------------------------------------------------------
class ExampleModelAdmin(admin.ModelAdmin):
    """Admin interface for ExampleModel."""

    list_display = (
        'title',
        'slug',
        'is_active',
        'created_at',
        'updated_at'
    )

    search_fields = ('title', 'description')

    list_filter = ('is_active',)

    readonly_fields = ('created_at', 'updated_at')

    prepopulated_fields = {'slug': ('title',)}

    list_per_page = 20


# ---------------------------------------------------------------------
# Forms Admin Configurations
# ---------------------------------------------------------------------
class ContactUsAdmin(admin.ModelAdmin):

    list_display = (
        'full_name',
        'email',
        'phone_number',
        'created_at'
    )

    search_fields = (
        'full_name',
        'email',
        'phone_number'
    )

    readonly_fields = ('created_at',)

    list_per_page = 20


# ---------------------------------------------------------------------
# Product Category Admin Configuration
# ---------------------------------------------------------------------
class ProductCategoryModelAdmin(admin.ModelAdmin):
    """Admin interface for ProductCategoryModel."""

    list_display = (
        'name',
        'priority', # ✅ Added
        'slug',
        'created_at',
    )

    # ✅ Quickly reorder from the list
    list_editable = ('priority',)

    search_fields = ('name',)
    readonly_fields = ('created_at', 'updated_at')
    prepopulated_fields = {'slug': ('name',)}
    list_per_page = 20

# ---------------------------------------------------------------------
# Product Images Inline
# ---------------------------------------------------------------------
class ProductImageInline(admin.TabularInline):
    model = ProductImageModel
    extra = 1

    fields = (
        'image',
        'alt_text',
        'is_primary',
    )


# ---------------------------------------------------------------------
# Product Admin Configuration
# ---------------------------------------------------------------------
class ProductModelAdmin(admin.ModelAdmin):
    """Admin interface for ProductModel."""

    # ✅ Added priority and is_favorite to the display
    list_display = (
        'name',
        'category',
        'price',
        'stock',
        'priority',      # New
        'is_favorite',   # New
        'is_active',
        'created_at'
    )

    # ✅ This allows you to change priority and favorite status 
    # directly from the list page without opening the product.
    list_editable = (
        'priority',
        'is_favorite',
        'is_active',
        'stock',
    )

    search_fields = (
        'name',
        'description'
    )

    # ✅ Added is_favorite to the sidebar filters
    list_filter = (
        'is_favorite',   # New
        'is_active',
        'category',
        'created_at',
    )

    readonly_fields = (
        'created_at',
        'updated_at'
    )

    prepopulated_fields = {'slug': ('name',)}

    inlines = [ProductImageInline]

    list_per_page = 20

    # Optional: Organize the detail page layout
    fieldsets = (
        ("General Information", {
            'fields': ('name', 'slug', 'category', 'short_description', 'description')
        }),
        ("Inventory & Pricing", {
            'fields': ('price', 'stock')
        }),
        ("Visibility & Ranking", {
            'fields': ('priority', 'is_favorite', 'is_active', 'is_featured')
        }),
        ("Timestamps", {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

# ---------------------------------------------------------------------
# Orders Admin Configuration
# ---------------------------------------------------------------------
class OrderAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "tracking_code",
        "full_name",
        "phone_number",
        "total_price",
        "status",
        "display_products",
        "created_at"
    )

    search_fields = (
        "tracking_code",
        "full_name",
        "phone_number"
    )

    list_filter = (
        "status",
        "created_at",
        "updated_at"
    )

    readonly_fields = (
        "tracking_code",
        "created_at",
        "updated_at",
        "display_products"
    )

    list_per_page = 20

    def display_products(self, obj):

        if not obj.products:
            return "[]"

        product_ids = [
            item.get('product_id')
            for item in obj.products
            if item.get('product_id')
        ]

        found_products = ProductModel.objects.filter(id__in=product_ids)

        product_map = {
            p.id: p.name
            for p in found_products
        }

        enriched_products = []

        for item in obj.products:

            product_data = dict(item)

            p_id = product_data.get('product_id')

            product_data['product_name'] = product_map.get(
                p_id,
                "Unknown Product"
            )

            enriched_products.append(product_data)

        json_string = json.dumps(
            enriched_products,
            ensure_ascii=False,
            indent=2
        )

        return mark_safe(
            f'<pre style="text-align: left; direction: ltr; margin: 0;">{json_string}</pre>'
        )

    display_products.short_description = "Products Details"


# ---------------------------------------------------------------------
# Order Payment Admin Configuration
# ---------------------------------------------------------------------
class OrderPaymentAdmin(admin.ModelAdmin):

    list_display = (
        "authority",
        "amount",
        "status",
        "created_at"
    )

    search_fields = (
        "authority",
    )

    list_filter = (
        "status",
        "created_at"
    )

    readonly_fields = (
        "created_at",
        "updated_at"
    )

    list_per_page = 20


# ---------------------------------------------------------------------
# User Admin Configuration
# ---------------------------------------------------------------------
class UserModelAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "phone_number",
        "full_name",
        "is_verified",
        "is_active",
        "created_at"
    )

    search_fields = (
        "phone_number",
        "full_name"
    )

    list_filter = (
        "is_verified",
        "is_active",
        "created_at"
    )

    readonly_fields = (
        "created_at",
    )

    list_per_page = 20


# ---------------------------------------------------------------------
# OTP Admin Configuration
# ---------------------------------------------------------------------
class OTPModelAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "phone_number",
        "code",
        "is_used",
        "created_at",
        "expires_at",
        "is_expired"
    )

    search_fields = (
        "phone_number",
        "code"
    )

    list_filter = (
        "is_used",
        "created_at"
    )

    readonly_fields = (
        "created_at",
    )

    list_per_page = 20

    def is_expired(self, obj):
        return not obj.is_valid()

    is_expired.boolean = True
    is_expired.short_description = "Expired"


# ---------------------------------------------------------------------
# Model Registration
# ---------------------------------------------------------------------
admin.site.register(ExampleModel, ExampleModelAdmin)

admin.site.register(ContactUsModel, ContactUsAdmin)

admin.site.register(ProductCategoryModel, ProductCategoryModelAdmin)

admin.site.register(ProductModel, ProductModelAdmin)

admin.site.register(OrderModel, OrderAdmin)

admin.site.register(OrderPaymentModel, OrderPaymentAdmin)

admin.site.register(UserModel, UserModelAdmin)

admin.site.register(OTPModel, OTPModelAdmin)

admin.site.register(Token)
