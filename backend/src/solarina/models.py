import random
import string
from django.db import models
import random
from datetime import timedelta

from django.utils import timezone
from django.core.validators import RegexValidator

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



class ProductCategoryModel(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField(unique=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Product Category"
        verbose_name_plural = "Product Categories"

    def __str__(self):
        return self.name


class ProductModel(models.Model):
    category = models.ForeignKey(
        ProductCategoryModel,
        on_delete=models.CASCADE,
        related_name="products"
    )

    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True, blank=True)

    short_description = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)

    price = models.PositiveIntegerField(help_text="Price in Rial")
    stock = models.PositiveIntegerField(default=0)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Product"
        verbose_name_plural = "Products"

    def __str__(self):
        return self.name


def generate_tracking_code():
    """Generate a random 8-character alphanumeric string."""
    length = 8
    while True:
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))
        if not OrderModel.objects.filter(tracking_code=code).exists():
            return code

class OrderModel(models.Model):
    """
    Stores order information before payment.
    """

    tracking_code = models.CharField(
        max_length=8,
        unique=True,
        null=True,
        blank=True,
        db_index=True
    )

    full_name = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)

    address = models.TextField()
    postal_code = models.CharField(max_length=20)
    notes = models.TextField(blank=True, null=True)

    products = models.JSONField(default=list)

    total_price = models.PositiveIntegerField()

    status = models.CharField(
        max_length=20,
        default="pending",   # pending / paid / failed
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def save(self, *args, **kwargs):
        if not self.tracking_code:
            self.tracking_code = generate_tracking_code()
        super().save(*args, **kwargs)


    def __str__(self):
        return f"Order {self.tracking_code or self.id} - {self.full_name}"


class OrderPaymentModel(models.Model):
    order = models.ForeignKey(OrderModel, on_delete=models.CASCADE)

    authority = models.CharField(max_length=50, unique=True)
    amount = models.PositiveIntegerField()
    status = models.CharField(max_length=20, default="pending")  # pending/successful/failed

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Payment {self.authority} - {self.status}"



# ---------------------------------------------------------------------
# User
# ---------------------------------------------------------------------
class UserModel(models.Model):
    phone_validator = RegexValidator(
        regex=r'^09\d{9}$',
        message="Phone number must be in format: 09123456789"
    )

    phone_number = models.CharField(
        max_length=11,
        unique=True,
        validators=[phone_validator],
        db_index=True
    )

    full_name = models.CharField(max_length=150, blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ["-created_at"]

    def __str__(self):
        return self.phone_number


# ---------------------------------------------------------------------
# OTP
# ---------------------------------------------------------------------
class OTPModel(models.Model):
    phone_validator = RegexValidator(
        regex=r'^09\d{9}$',
        message="Phone number must be in format: 09123456789"
    )

    phone_number = models.CharField(
        max_length=11,
        validators=[phone_validator],
        db_index=True
    )

    code = models.CharField(max_length=4)

    is_used = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    class Meta:
        verbose_name = "OTP"
        verbose_name_plural = "OTPs"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.phone_number} - {self.code}"

    def is_valid(self):
        """
        OTP is valid if:
        - not used
        - not expired
        """
        return (
            not self.is_used and
            timezone.now() < self.expires_at
        )

    @staticmethod
    def generate_code():
        """
        Generate random 4-digit OTP
        """
        return str(random.randint(1000, 9999))

    @classmethod
    def create_otp(cls, phone_number):
        """
        Create new OTP valid for 2 minutes
        """

        code = cls.generate_code()

        return cls.objects.create(
            phone_number=phone_number,
            code=code,
            expires_at=timezone.now() + timedelta(minutes=2)
        )