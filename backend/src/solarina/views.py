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
from .utils import CountBasedPaymentHandler
# ---------------------------------------------------------------------
# Models & Serializers
# ---------------------------------------------------------------------
from .models import ContactUsModel, ExampleModel, ProductModel, ProductCategoryModel, OrderModel, OrderPaymentModel
from .serializers import ContactUsSerializer, ExampleModelSerializer, ProductModelSerializer, ProductCategoryModelSerializer, OrderPaymentSerializer, OrderSerializer


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
# order_payment_handler 
# ---------------------------------------------------------------------
MERCHANT_ID = "970073f1-6fd6-4690-8a31-27b74e30e4e3"   #os.getenv("MMERCHANT_ID")

order_payment_handler = CountBasedPaymentHandler(
    merchant_id=MERCHANT_ID,
    model=OrderPaymentModel,
    description="Solarina Website Purchase",
)

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


# ---------------------------------------------------------------------
# Product Category ViewSet
# ---------------------------------------------------------------------
class ProductCategoryModelViewSet(viewsets.ModelViewSet):
    """
    Manage Product Categories.
    Public GET
    Authenticated write operations
    """
    queryset = ProductCategoryModel.objects.all()
    serializer_class = ProductCategoryModelSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]

    def get_permissions(self):
        if self.request.method in ["GET"]:
            return [AllowAny()]
        return [IsAuthenticated()]


# ---------------------------------------------------------------------
# Product ViewSet
# ---------------------------------------------------------------------
class ProductModelViewSet(viewsets.ModelViewSet):
    """
    Manage Products.
    Public GET
    Authenticated write operations
    """
    queryset = ProductModel.objects.filter(is_active=True)
    serializer_class = ProductModelSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["price", "created_at"]
    ordering = ["-created_at"]

    def get_permissions(self):
        if self.request.method in ["GET"]:
            return [AllowAny()]
        return [IsAuthenticated()]



@api_view(['POST'])
@permission_classes([AllowAny])
def create_order_view(request):
    serializer = OrderSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    order = serializer.save(status="pending")
    return Response({"order_id": order.id}, status=201)


@api_view(['POST'])
@permission_classes([AllowAny])
def create_order_payment_view(request):
    order_id = request.data.get("order_id")

    try:
        order = OrderModel.objects.get(id=order_id)
    except OrderModel.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)

    callback_url = "http://solarina.ir/order/verify/"

    payment_url, authority = order_payment_handler.send_request(
        order.total_price, order_id, callback_url
    )

    if payment_url and authority:
        order_payment_handler.save_transaction(
            authority=authority,
            amount=order.total_price,
            order_id=order_id,
            user_name=order.full_name,
            bot_key="web:order"
        )
        return Response({"payment_url": payment_url})

    return Response({"error": "Payment request failed"}, status=500)

@api_view(["GET"])
@permission_classes([AllowAny])
def verify_order_payment(request):
    print("\n" + "=" * 40)
    print("[DEBUG] → verify_order_payment called")
    print("=" * 40)

    status_param = request.GET.get("Status")
    authority = request.GET.get("Authority")

    print(f"[DEBUG] Callback Params => Status: {status_param}, Authority: {authority}")

    if not status_param or not authority:
        print("[ERROR] ❌ Missing parameters in callback URL")
        return Response({"status": "error", "message": "Missing params"}, status=400)

    # 1️⃣ Get the transaction object based on the Authority code
    transaction = order_payment_handler.get_transaction(authority)

    if not transaction:
        print("[ERROR] ❌ Transaction not found for authority:", authority)
        return Response({"status": "not_found"}, status=404)

    print(f"[DEBUG] Transaction found ID={transaction.id}, amount={transaction.amount}")

    # 2️⃣ Verify payment with Zarinpal
    result = order_payment_handler.verify_payment(authority, transaction.amount)
    print(f"[DEBUG] Verification result: {result}")

    # 3️⃣ Get the related order object (fix: use ForeignKey field)
    order = transaction.order
    print(f"[DEBUG] Linked Order Found => ID={order.id}, Status={order.status}")

    # 4️⃣ Handle verification result and update models
    if result["status"] in ["success", "already_verified"]:
        print("[DEBUG] ✅ Verification succeeded (either new or already verified).")
        order_payment_handler.update_transaction_status(authority, "successful")

        order.status = "paid"
        order.save()
        print(f"[DEBUG] ✅ Order {order.id} marked as paid")

        return Response({
            "status": "success",
            "ref_id": result.get("data", {}).get("ref_id"),
            "order_id": order.id
        })

    else:
        print("[ERROR] ❌ Verification failed, updating statuses to failed")
        order_payment_handler.update_transaction_status(authority, "failed")

        order.status = "failed"
        order.save()
        print(f"[DEBUG] ❌ Order {order.id} marked as failed")

        return Response({"status": "failed"})
