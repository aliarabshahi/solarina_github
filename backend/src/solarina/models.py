from django.db import models

# ---------------------------------------------------------------------
# Example Models
# ---------------------------------------------------------------------
class ExampleModel(models.Model):
    """
    Minimal reusable example model — text-only.
    Use as a base to scaffold new Django apps.
    """
    title = models.CharField(max_length=150)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Example Item"
        verbose_name_plural = "Example Items"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

# ---------------------------------------------------------------------
# Contact 
# ---------------------------------------------------------------------
class ContactUsModel(models.Model):
    """Stores 'Contact Us' form messages."""
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Contact Us Message"
        verbose_name_plural = "Contact Us Messages"

    def __str__(self):
        return self.full_name
