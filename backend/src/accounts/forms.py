from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import CustomUser

# ---------------------------------------------------------------------
# Custom User Creation Form
# ---------------------------------------------------------------------
class CustomUserCreationForm(UserCreationForm):
    """
    Form for creating new users based on the CustomUser model.
    Extends Django's built-in UserCreationForm to include the 'name' field.
    Used in the Django admin add-user page.
    """
    class Meta:
        model = CustomUser
        # Explicitly define which fields to include in the form
        fields = [
            "username",
            "email",
            "password1",
            "password2",
            "name",
        ]

# ---------------------------------------------------------------------
# Custom User Change Form
# ---------------------------------------------------------------------
class CustomUserChangeForm(UserChangeForm):
    """
    Form for updating existing CustomUser instances.
    Extends Django's built-in UserChangeForm to add the 'name' field.
    Used in the Django admin edit-user page.
    """
    class Meta:
        model = CustomUser
        # Explicitly define which fields to display for edit
        fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "name",
        ]
