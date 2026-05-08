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
