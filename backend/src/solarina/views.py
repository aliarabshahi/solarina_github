from venv import logger

from django.shortcuts import render
from rest_framework import viewsets, status, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination
from datetime import datetime, timedelta
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from django.db import connections
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
import os
import logging
import threading
from .utils import CountBasedPaymentHandler, send_notification_sms, send_sms_otp
# ---------------------------------------------------------------------
# Models & Serializers
# ---------------------------------------------------------------------
from .models import ContactUsModel, ExampleModel, OTPModel, ProductModel, ProductCategoryModel, OrderModel, OrderPaymentModel, UserModel
from .serializers import ContactUsSerializer, ExampleModelSerializer, ProductModelSerializer, ProductCategoryModelSerializer, OrderPaymentSerializer, OrderSerializer, SendOTPSerializer, UserSerializer, VerifyOTPSerializer


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
PAGE_SIZE = 100

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
contact_phones_str = os.getenv("BOSS_CONTACT_PHONES", "")
BOSS_CONTACT_PHONES = [p.strip() for p in contact_phones_str.split(",") if p.strip()]

class ContactUsViewSet(viewsets.ModelViewSet):
    """
    Manage Contact Us messages: stores the message in DB and 
    sends an SMS notification to administrators.
    """
    queryset = ContactUsModel.objects.all()
    serializer_class = ContactUsSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [AllowAny]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["created_at"]
    ordering = ["-created_at"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # 1) Save the record to the database
        instance = serializer.save()

        # 2) Background SMS Notification logic
        try:
            if BOSS_CONTACT_PHONES:
                # Sanitize data for Kavenegar Template Compatibility
                # Mapping based on: %token -> phone, %token2 -> name
                name_val = (instance.full_name or "کاربر").strip()
                name_val = name_val.replace("\n", " ").replace("\r", " ").replace(" ", "_")
                
                phone_val = (instance.phone_number or "09000000000").strip()
                phone_val = phone_val.replace(" ", "").replace("-", "")

                for boss_phone in BOSS_CONTACT_PHONES:
                    send_notification_sms(
                        receptor=boss_phone,
                        template="SolarinaContactUsForm",
                        token=phone_val,   # %token  => شماره موبایل
                        token2=name_val,   # %token2 => نام
                    )
            else:
                logger.warning("BOSS_CONTACT_PHONES is not configured. SMS skipped.")

        except Exception as e:
            # We log the error but do not disrupt the user's response
            logger.error(f"Kavenegar SMS failure in ContactUsViewSet: {e}")

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    

    
# ---------------------------------------------------------------------
# Product Category ViewSet
# ---------------------------------------------------------------------
from rest_framework import filters

class ProductCategoryModelViewSet(viewsets.ModelViewSet):
    """
    Manage Product Categories.
    """
    # ✅ Use the model's default ordering
    queryset = ProductCategoryModel.objects.all()
    serializer_class = ProductCategoryModelSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    
    # ✅ Add filtering backends
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['priority', 'name']
    ordering = ['-priority'] # Default sort for the API

    def get_permissions(self):
        if self.request.method in ["GET"]:
            return [AllowAny()]
        return [IsAuthenticated()]


# ---------------------------------------------------------------------
# Product ViewSet
# ---------------------------------------------------------------------
class ProductModelViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Public Products API
    """
    serializer_class = ProductModelSerializer
    pagination_class = DashboardPagination
    permission_classes = [AllowAny]
    lookup_field = "slug"

    # Added DjangoFilterBackend to support the favorite toggle
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]

    # Added 'priority' and 'is_favorite' to allowed filters/ordering
    filterset_fields = ["is_favorite"] 
    
    ordering_fields = [
        "price",
        "created_at",
        "priority"
    ]

    # ✅ Default Ordering: 
    # Products with higher priority first, then available stock, then newest.
    ordering = [
        "-priority",
        "-stock",
        "-created_at"
    ]

    def get_queryset(self):
        # Base queryset with optimization (select_related/prefetch_related)
        queryset = ProductModel.objects.filter(
            is_active=True
        ).select_related(
            "category"
        ).prefetch_related(
            "images"
        )

        # ✅ Preserving your existing category slug filter logic
        category_slug = self.request.query_params.get("category")
        if category_slug:
            queryset = queryset.filter(
                category__slug=category_slug
            )

        return queryset


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
    """
    Create payment for an existing order using tracking_code or order_id.
    """
    tracking_code = request.data.get('tracking_code')
    order_id = request.data.get('order_id')
    
    try:
        if tracking_code:
            order = OrderModel.objects.get(tracking_code=tracking_code)
        elif order_id:
            order = OrderModel.objects.get(id=order_id)
        else:
            return Response(
                {"error": "tracking_code یا order_id الزامی است"},
                status=status.HTTP_400_BAD_REQUEST
            )
    except OrderModel.DoesNotExist:
        return Response(
            {"error": "سفارش یافت نشد"},
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Use the correct callback URL
    callback_url = "http://solarina.ir/order/verify/"
    
    # Call the correct payment handler methods
    payment_url, authority = order_payment_handler.send_request(
        order.total_price, 
        order.id, 
        callback_url
    )
    
    if payment_url and authority:
        order_payment_handler.save_transaction(
            authority=authority,
            amount=order.total_price,
            order_id=order.id,
            user_name=order.full_name,
            bot_key="web:order"
        )
        return Response({
            "payment_url": payment_url,
            "tracking_code": order.tracking_code
        }, status=status.HTTP_200_OK)
    
    return Response(
        {"error": "خطا در ایجاد لینک پرداخت"}, 
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )


@api_view(['POST'])
@permission_classes([AllowAny])
def create_draft_order(request):
    """
    Create a draft order and return tracking_code for review page.
    """
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        # Save with default status='pending'
        order = serializer.save()
        
        return Response({
            "tracking_code": order.tracking_code,
            "order_id": order.id
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_order_by_tracking(request, tracking_code):
    """
    Retrieve order details by tracking code for review page.
    """
    try:
        order = OrderModel.objects.get(tracking_code=tracking_code)
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except OrderModel.DoesNotExist:
        return Response(
            {"error": "سفارش یافت نشد"},
            status=status.HTTP_404_NOT_FOUND
        )

# Admin/Boss phone number
# BOSS_PHONES = ["09190088190","09123679265"]
# BOSS_PHONES = os.getenv("LOG_LEVEL",deufalt)
phones_str = os.getenv("BOSS_PHONES", "09190088190")
# Split the string by comma to create a list
BOSS_PHONES = phones_str.split(",") if phones_str else []


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

    order = transaction.order
    print(f"[DEBUG] Linked Order Found => ID={order.id}, Status={order.status}")

    # 🚨 PREVENT DUPLICATE SMS
    if transaction.status == "successful":
        print("[DEBUG] ✅ Transaction was already verified. Skipping SMS.")
        return Response({
            "status": "success",
            "ref_id": "already_verified_in_db",
            "order_id": order.id
        })

    # 2️⃣ Verify payment with Zarinpal
    result = order_payment_handler.verify_payment(authority, transaction.amount)
    print(f"[DEBUG] Verification result: {result}")

    # 3️⃣ Handle verification result
    if result["status"] in ["success", "already_verified"]:
        print("[DEBUG] ✅ Verification succeeded.")

        order_payment_handler.update_transaction_status(authority, "successful")

        order.status = "paid"
        order.save()

        print(f"[DEBUG] ✅ Order {order.id} marked as paid")

        # ---------------------------
        # SEND SMS
        # ---------------------------
        customer_phone = order.phone_number

        # ✅ SMS to Customer
        send_notification_sms(
            receptor=customer_phone,
            template="SolarinaUserOrderConfirmation",
            token=order.tracking_code
        )

        # ✅ SMS to Admins
        for boss_phone in BOSS_PHONES:
            send_notification_sms(
                receptor=boss_phone,
                template="SolarinaAdminConfirmation",
                token=str(order.id),
                token2=order.tracking_code
            )

        customer_phone = order.phone_number

        return Response({
            "status": "success",
            "ref_id": result.get("data", {}).get("ref_id"),
            "order_id": order.id
        })

    else:
        print("[ERROR] ❌ Verification failed")

        order_payment_handler.update_transaction_status(authority, "failed")

        order.status = "failed"
        order.save()

        print(f"[DEBUG] ❌ Order {order.id} marked as failed")

        return Response({"status": "failed"})

# ---------------------------------------------------------------------
# Order ViewSet
# ---------------------------------------------------------------------
class OrderViewSet(viewsets.ModelViewSet):
    """
    Manage OrderModel instances.
    - Supports filtering by:
        ?tracking_code=
        ?phone_number=
    """

    queryset = OrderModel.objects.all()
    serializer_class = OrderSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Added .order_by('-created_at') here to fix the UnorderedObjectListWarning
        queryset = super().get_queryset().order_by('-created_at')

        tracking_code = self.request.query_params.get("tracking_code")
        phone_number = self.request.query_params.get("phone_number")

        if tracking_code:
            queryset = queryset.filter(tracking_code=tracking_code)

        if phone_number:
            queryset = queryset.filter(phone_number=phone_number)

        return queryset


# ---------------------------------------------------------------------
# Order Payment ViewSet
# ---------------------------------------------------------------------
class OrderPaymentViewSet(viewsets.ModelViewSet):
    """
    Manage OrderPaymentModel instances.
    - Supports filtering by ?authority=
    - Response includes full order details
    """
    # Use select_related to prevent N+1 query issues when fetching order details
    queryset = OrderPaymentModel.objects.select_related('order').all()
    serializer_class = OrderPaymentSerializer
    pagination_class = DashboardPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # 🔎 Filter based on authority parameter in GET
    def get_queryset(self):
        queryset = super().get_queryset()
        authority = self.request.query_params.get("authority")

        if authority:
            queryset = queryset.filter(authority=authority)

        return queryset
    

# ---------------------------------------------------------------------
# Send OTP API
# ---------------------------------------------------------------------

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
# مطمئن شوید مدل‌ها و متغیرهای مورد نیاز مثل OTP_COOLDOWN_SECONDS وارد شده‌اند
from .models import OTPModel
from .serializers import SendOTPSerializer
from .utils import send_sms_otp


OTP_COOLDOWN_SECONDS = 60

@api_view(["POST"])
@permission_classes([AllowAny])
def send_otp_view(request):
    serializer = SendOTPSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    phone_number = serializer.validated_data["phone_number"]

    # بررسی محدودیت زمانی (Cool down)
    latest_otp = OTPModel.objects.filter(
        phone_number=phone_number,
        is_used=False
    ).order_by("-created_at").first()

    if latest_otp:
        passed_seconds = int((timezone.now() - latest_otp.created_at).total_seconds())
        # فرض بر این است که OTP_COOLDOWN_SECONDS در کانتکست شما تعریف شده است
        remaining_seconds = (OTP_COOLDOWN_SECONDS - passed_seconds)
        if remaining_seconds > 0:
            return Response({
                "success": False,
                "message": f"لطفاً {remaining_seconds} ثانیه صبر کنید",
                "remaining_seconds": remaining_seconds,
            }, status=status.HTTP_429_TOO_MANY_REQUESTS)

    # ساخت OTP در دیتابیس
    otp = OTPModel.create_otp(phone_number)

    # ارسال پیامک
    sms_result = send_sms_otp(phone_number=phone_number, code=otp.code)

    if not sms_result:
        return Response({
            "success": False,
            "message": "خطا در ارسال پیامک. لطفاً بعداً تلاش کنید."
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({
        "success": True,
        "message": "کد تایید ارسال شد",
        "cooldown": OTP_COOLDOWN_SECONDS,
    }, status=status.HTTP_200_OK)



# ---------------------------------------------------------------------
# Verify OTP API
# ---------------------------------------------------------------------
@api_view(["POST"])
@permission_classes([AllowAny])
def verify_otp_view(request):

    serializer = VerifyOTPSerializer(data=request.data)

    serializer.is_valid(raise_exception=True)

    phone_number = serializer.validated_data["phone_number"]

    code = serializer.validated_data["code"]

    otp = OTPModel.objects.filter(
        phone_number=phone_number,
        code=code,
        is_used=False
    ).last()

    if not otp:
        return Response(
            {
                "success": False,
                "message": "کد وارد شده صحیح نمی باشد"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if not otp.is_valid():
        return Response(
            {
                "success": False,
                "message": "کد منقضی شده است"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # mark as used
    otp.is_used = True
    otp.save()

    # create or get user
    user, created = UserModel.objects.get_or_create(
        phone_number=phone_number
    )

    user.is_verified = True
    user.save()

    return Response(
        {
            "success": True,
            "message": "ورود موفق",
            "user": UserSerializer(user).data
        },
        status=status.HTTP_200_OK
    )
