"""
Notification Service
====================
Handles sending notifications via Email using SMTP.
"""

import logging
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger("uvicorn")

class NotificationService:
    def __init__(self):
        self.smtp_server = "smtp.gmail.com"
        self.smtp_port = 465
        self.username = os.getenv("MAIL_USERNAME")
        self.password = os.getenv("MAIL_PASSWORD")
        
        # Debug prints to help user verify credentials
        print(f"DEBUG: Loaded Username: {self.username}")
        print(f"DEBUG: Loaded Password: {'*' * 5 if self.password else 'None'}")

    def send_booking_confirmation(self, to_email: str, booking_details: dict):
        """
        Sends a booking confirmation email via SMTP.
        """
        if not self.username or not self.password or "your_email" in self.username:
            print("\n[WARNING] Email credentials not set correctly in .env. Falling back to console log.")
            self._log_to_console(to_email, booking_details)
            return False

        subject = f"Booking Confirmed: {booking_details.get('service_type', 'Service')} for {booking_details.get('vehicle_id')}"
        
        body = f"""
        Dear Customer,

        Your service appointment has been confirmed!

        Booking ID: {booking_details.get('booking_id')}
        Vehicle: {booking_details.get('vehicle_id')}
        Service Center: {booking_details.get('center_name')}
        Date & Time: {booking_details.get('slot_datetime')}
        Service: {booking_details.get('service_type')}
        Estimated Cost: {booking_details.get('estimated_cost')}

        Thank you for choosing PulseDrive.
        """

        msg = MIMEMultipart()
        msg['From'] = self.username
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        try:
            with smtplib.SMTP_SSL(self.smtp_server, self.smtp_port) as server:
                server.login(self.username, self.password)
                server.send_message(msg)
            
            print(f"\n[SUCCESS] Email sent to {to_email}")
            logger.info(f"Sent confirmation email to {to_email}")
            return True
            
        except Exception as e:
            print(f"\n[ERROR] Failed to send email: {e}")
            logger.error(f"Failed to send email to {to_email}: {e}")
            self._log_to_console(to_email, booking_details)
            return False

    def _log_to_console(self, email, booking_details):
        print("\n" + "="*60)
        print(f"📧 [MOCK] SENDING EMAIL TO: {email}")
        print(f"Subject: Booking Confirmed: {booking_details.get('service_type')}")
        print("="*60 + "\n")

notification_service = NotificationService()
