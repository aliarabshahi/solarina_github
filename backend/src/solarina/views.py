from django.shortcuts import render
from rest_framework import viewsets, status, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination
from datetime import datetime
from django.core.mail import send_mail
from django.conf import settings
from django.db import connections
import os
import logging
import threading

# ---------------------------------------------------------------------
# Models & Serializers
# ---------------------------------------------------------------------
from .models import ContactUsModel, ExampleModel
from .serializers import ContactUsSerializer, ExampleModelSerializer


# ---------------------------------------------------------------------
# Email Sender (Keep for future use)
# ---------------------------------------------------------------------
def send_email_async_safe(subject, message, from_email, recipient_list):
    """Send email in background, safely (fail silently)."""
    def _send():
        try:
            send_mail(subject, message, from_email, recipient_list, fail_silently=True)
        except Exception as e:
            logging.warning(f"[AsyncEmail] Sending failed: {e}")
    threading.Thread(target=_send, daemon=True).start()

# Example usage (commented out for future use):
# send_email_async_safe(
#     subject="New message",
#     message="Example email body",
#     from_email=settings.DEFAULT_FROM_EMAIL,
#     recipient_list=[settings.ADMIN_EMAIL],
# )


# ---------------------------------------------------------------------
# Health Check Endpoint
# ---------------------------------------------------------------------
@api_view(["GET"])
@permission_classes([])  # Public by default
def health_check(request):
    """Verify database connectivity."""
    try:
        connections['default'].cursor()
        return Response({"status": "ok"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {"status": "error", "message": str(e)},
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )


# ---------------------------------------------------------------------
# Pagination Class
# ---------------------------------------------------------------------
MAX_RESULTS = os.getenv("MAX_RESULTS", 100)
PAGE_SIZE = 10

class DashboardPagination(PageNumberPagination):
    """Custom pagination with max limits."""
    page_size = PAGE_SIZE
    page_size_query_param = "page_size"
    max_page_size = int(MAX_RESULTS)



# ---------------------------------------------------------------------
# Example Model ViewSet
# ---------------------------------------------------------------------
class ExampleModelViewSet(viewsets.ModelViewSet):
    """
    Manage ExampleModel instances.
    - Supports GET (list/retrieve)
    - Supports POST (create)
    """
    queryset = ExampleModel.objects.all()
    serializer_class = ExampleModelSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # Uncomment the create override below if you ever want to send emails on creation
    """
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()

        # Example email sending (optional)
        subject = "New ExampleModel Entry Created"
        message = f"Title: {instance.title}\nDescription: {instance.description}"
        send_email_async_safe(subject, message, settings.DEFAULT_FROM_EMAIL, [settings.ADMIN_EMAIL])

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    """


# ---------------------------------------------------------------------
# Contact Model ViewSet
# ---------------------------------------------------------------------
class ContactUsViewSet(viewsets.ModelViewSet):
    """Manage Contact Us messages (store + async email)."""
    queryset = ContactUsModel.objects.all()
    serializer_class = ContactUsSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [AllowAny]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at']
    ordering = ['-created_at']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        instance = serializer.save()

        # subject = "پیام جدید از فرم تماس با ما هوبوک"
        # message = (
        #     f"نام: {instance.full_name}\n"
        #     f"ایمیل: {instance.email}\n"
        #     f"تلفن: {instance.phone_number}\n"
        #     "----------------------------------------\n\n"
        #     f"پیام:\n{instance.message}\n"
        # )

        # # Send email asynchronously, without blocking or raising errors
        # send_email_async_safe(
        #     subject,
        #     message,
        #     settings.DEFAULT_FROM_EMAIL,
        #     [settings.ADMIN_EMAIL],
        # )

        # Return the normal success response (unchanged)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
