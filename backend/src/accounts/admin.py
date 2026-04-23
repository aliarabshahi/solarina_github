from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser

# ---------------------------------------------------------------------
# Custom User Admin Configuration
# ---------------------------------------------------------------------
class CustomUserAdmin(UserAdmin):
    """
    Admin customization for the CustomUser model.
    Extends Django's built-in UserAdmin to include additional fields.
    """
    # Forms used for add/change actions
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser

    # Columns displayed in the admin list view
    list_display = [
        "username",
        "email",
        "name",
        "is_staff",
        "is_superuser",
    ]

    # Extra fields displayed in the user detail form (edit view)
    fieldsets = UserAdmin.fieldsets + (
        (None, {"fields": ("name",)}),
    )

    # Extra fields displayed in the add-user form
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {"fields": ("name",)}),
    )

# ---------------------------------------------------------------------
# Admin Site Registration
# ---------------------------------------------------------------------
# Register CustomUser with its corresponding admin configuration
admin.site.register(CustomUser, CustomUserAdmin)
