import requests
import traceback
import json


class CountBasedPaymentHandler:
    def __init__(self, merchant_id, model, description="Default description"):
        self.merchant_id = merchant_id
        self.model = model
        self.description = description


    # --------------------------------------------------
    # STEP 1: SEND PAYMENT REQUEST TO ZARINPAL
    # --------------------------------------------------
    def send_request(self, amount, order_id, callback_url):
        print("\n[DEBUG] → send_request() called")
        print(f"Merchant ID: {self.merchant_id}")
        print(f"Amount: {amount}")
        print(f"Order ID: {order_id}")
        print(f"Callback URL: {callback_url}")

        try:
            payload = {
                "merchant_id": self.merchant_id,
                "amount": amount,
                "callback_url": callback_url,
                "description": self.description,
            }
            print("[DEBUG] Payload to Zarinpal:", payload)

            headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }

            response = requests.post(
                url="https://api.zarinpal.com/pg/v4/payment/request.json",
                json=payload,
                headers=headers,
                timeout=15
            )

            print("[DEBUG] Zarinpal HTTP Status:", response.status_code)
            print("[DEBUG] Zarinpal Raw Response:", response.text)

            response_data = response.json()
            data = response_data.get("data", {})
            errors = response_data.get("errors", {})
            print("[DEBUG] Parsed data:", json.dumps(data, indent=2))
            if errors:
                print("[DEBUG] Errors:", json.dumps(errors, indent=2))

            code = data.get("code")

            if code == 100:
                authority = data.get("authority")
                payment_url = f"https://www.zarinpal.com/pg/StartPay/{authority}"
                print("[DEBUG] ✅ Payment request success, redirect to:", payment_url)
                return payment_url, authority
            else:
                print("[ERROR] ❌ Zarinpal did not return code 100. Response:", response_data)
                return None, None

        except Exception as e:
            print("[ERROR] Exception in send_request():", str(e))
            traceback.print_exc()
            return None, None


    # --------------------------------------------------
    # STEP 2: SAVE TRANSACTION
    # --------------------------------------------------
    def save_transaction(self, authority, amount, order_id, user_name='', bot_key=None):
        print("\n[DEBUG] → save_transaction() called")
        print(f"Authority: {authority}, Amount: {amount}, Order ID: {order_id}, Bot key: {bot_key}")

        try:
            # ❗ ONLY changing THIS LINE – saving using correct FK field
            transaction = self.model.objects.create(
                authority=authority,
                amount=amount,
                order_id=order_id,    # ✔ correct field
                status='pending'
            )

            print("[DEBUG] ✅ Transaction saved:", transaction.id)
            return transaction, True

        except Exception as e:
            print("[ERROR] ❌ Failed to save transaction:", str(e))
            traceback.print_exc()
            return None, False


    # --------------------------------------------------
    # STEP 3: GET TRANSACTION
    # --------------------------------------------------
    def get_transaction(self, authority):
        print("\n[DEBUG] → get_transaction() called for authority:", authority)
        try:
            tx = self.model.objects.get(authority=authority)
            print("[DEBUG] ✅ Transaction found:", tx.id)
            return tx
        except self.model.DoesNotExist:
            print("[ERROR] ❌ Transaction not found.")
            return None


    # --------------------------------------------------
    # STEP 4: UPDATE TRANSACTION STATUS
    # --------------------------------------------------
    def update_transaction_status(self, authority, status):
        print("\n[DEBUG] → update_transaction_status() called")
        print(f"Authority: {authority}, New status: {status}")

        try:
            tx = self.model.objects.get(authority=authority)
            tx.status = status
            tx.save()
            print("[DEBUG] ✅ Status updated")
            return tx
        except self.model.DoesNotExist:
            print("[ERROR] ❌ Transaction not found for update.")
            return None


    # --------------------------------------------------
    # STEP 5: VERIFY PAYMENT
    # --------------------------------------------------
    def verify_payment(self, authority, amount):
        print("\n[DEBUG] → verify_payment() called")
        print(f"Authority: {authority}, Amount: {amount}")

        try:
            payload = {
                "merchant_id": self.merchant_id,
                "amount": amount,
                "authority": authority,
            }
            print("[DEBUG] Verification payload:", payload)

            headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }

            response = requests.post(
                url="https://api.zarinpal.com/pg/v4/payment/verify.json",
                json=payload,
                headers=headers,
                timeout=15
            )

            print("[DEBUG] Verify HTTP status:", response.status_code)
            print("[DEBUG] Verify raw response:", response.text)

            data = response.json().get("data", {})
            code = data.get("code")
            errors = response.json().get("errors", {})

            if code == 100:
                print("[DEBUG] ✅ Payment verification success:", data)
                return {"status": "success", "data": data}
            elif code == 101:
                print("[DEBUG] ⚠ Payment already verified:", data)
                return {"status": "already_verified", "data": data}
            else:
                print("[ERROR] ❌ Payment verify failed with code:", code)
                print("[DEBUG] Zarinpal errors:", errors)
                return {"status": "failed", "errors": errors}

        except Exception as e:
            print("[ERROR] 💥 Exception in verify_payment():", str(e))
            traceback.print_exc()
            return {"status": "failed", "errors": str(e)}












import logging
from kavenegar import KavenegarAPI, APIException, HTTPException

# کلید API که ارائه دادید
KAVENEGAR_API_KEY = "48316731674E6D74715A6A6F696931304C7A7353464F393734566E4970747A793379555A3742524A6830593D"

def send_sms_otp(phone_number, code):
    """
    ارسال کد تایید با استفاده از سرویس Lookup کاوه‌نگار
    """
    try:
        api = KavenegarAPI(KAVENEGAR_API_KEY)
        
        params = {
            'receptor': phone_number,
            'token': code,
            'template': 'SolarinaOTP', # نام الگویی که در پنل کاوه‌نگار ثبت کردید
        }
        
        response = api.verify_lookup(params)
        logging.info(f"[SMS KAVENEGAR SUCCESS] {response}")
        return response

    except APIException as e:
        # خطاهای برگشتی از خودِ API کاوه‌نگار (مانند عدم تایید الگو و ...)
        logging.error(f"[KAVENEGAR API ERROR] {e}")
        return None
    except HTTPException as e:
        # خطاهای مربوط به شبکه و ارتباط با سرور کاوه‌نگار
        logging.error(f"[KAVENEGAR HTTP ERROR] {e}")
        return None
    except Exception as e:
        # هر خطای پیش‌بینی نشده دیگر
        logging.error(f"[SMS GENERAL ERROR] {e}")
        return None












import requests
import logging

logger = logging.getLogger(__name__)

SEND_SMS_API_URL = "https://s.api.ir/api/sw1/SendSms"
SEND_SMS_API_TOKEN = "Bearer ImmJ+7dwBXNXsYPOR+Vn/BIrFGFm8lgqSkGmDcf6hBBThCYoqcWaLivTbGuHUGo6eNqgBCj5ofn293hjUW5TQcKl5p/UmyqHFzsEkFYz5bI="

def send_notification_sms(mobiles: list, message: str):
    """
    Sends a general SMS notification using s.api.ir.
    """
    payload = {
        "MessageBody": message,
        "Mobiles": mobiles
    }
    
    headers = {
        "Authorization": SEND_SMS_API_TOKEN,
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(SEND_SMS_API_URL, json=payload, headers=headers, timeout=10)
        response.raise_for_status()
        logger.info(f"SMS sent successfully to {mobiles}")
        return True
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to send SMS to {mobiles}. Error: {e}")
        return False
