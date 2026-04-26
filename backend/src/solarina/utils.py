import requests
import traceback


class CountBasedPaymentHandler:
    def __init__(self, merchant_id, model, description="Default description"):
        """
        Initialize the CountBasedPaymentHandler with the merchant ID, model, and description.

        :param merchant_id: The Zarinpal merchant ID.
        :param model: The Django model to store payment data.
        :param description: Default description for payment requests.
        """
        self.merchant_id = merchant_id
        self.model = model
        self.description = description

    def send_request(self, amount, user_id, callback_url):
        """Send a payment request to Zarinpal."""
        try:
            payload = {
                "merchant_id": self.merchant_id,
                "amount": amount,
                "callback_url": callback_url,
                "description": self.description,
            }

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

            response_data = response.json()
            data = response_data.get("data", {})
            code = data.get("code")

            if code == 100:
                authority = data.get("authority")
                payment_url = f"https://www.zarinpal.com/pg/StartPay/{authority}"
                return payment_url, authority
            else:
                return None, None

        except Exception:
            return None, None

    def save_transaction(self, authority, amount, user_id, user_name='', bot_key=None):
        """Save transaction to database, supports multi-bot architecture."""
        try:
            transaction = self.model.objects.create(
                authority=authority,
                amount=amount,
                user_id=user_id,
                user_name=user_name,
                bot_key=bot_key,   # new field for universal bot tracking
                status='pending'
            )
            return transaction, True
        except Exception as e:
            error_str = str(e)
            traceback.print_exc()
            if 'duplicate key value violates unique constraint' in error_str:
                return None, False
            else:
                return None, False

    def get_transaction(self, authority):
        """Retrieve transaction details by authority."""
        try:
            return self.model.objects.get(authority=authority)
        except self.model.DoesNotExist:
            return None

    def update_transaction_status(self, authority, status):
        """Update the status of a transaction."""
        try:
            transaction = self.model.objects.get(authority=authority)
            transaction.status = status
            transaction.save()
            return transaction
        except self.model.DoesNotExist:
            return None

    def verify_payment(self, authority, amount):
        """Verify a payment with Zarinpal."""
        try:
            payload = {
                "merchant_id": self.merchant_id,
                "amount": amount,
                "authority": authority,
            }

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

            data = response.json().get("data", {})
            code = data.get("code")

            if code == 100:
                return {"status": "success", "data": data}
            elif code == 101:
                return {"status": "already_verified", "data": data}
            else:
                errors = response.json().get("errors", {})
                return {"status": "failed", "errors": errors}

        except Exception as e:
            return {"status": "failed", "errors": str(e)}
