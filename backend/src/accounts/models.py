from django.contrib.auth.models import AbstractUser
from django.db import models

# ---------------------------------------------------------------------
# Custom User Model
# ---------------------------------------------------------------------
class CustomUser(AbstractUser):
    """
    Custom user model extending Django's default AbstractUser.

    Adds an optional 'name' field to store the user's full name or display name.
    This field can be left blank or null.
    """
    name = models.CharField(
        max_length=100,     # Maximum length for the 'name' value
        null=True,          # Allows NULL in the database
        blank=True,         # Field can be left empty in forms
    )
