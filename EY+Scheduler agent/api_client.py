import requests

BASE_URL = "https://693709f0f8dc350aff332a08.mockapi.io/api/v1"

# Fetch bookings (stored in service-centres)
def get_bookings():
    url = f"{BASE_URL}/service-centres"
    print("API GET:", url)
    try:
        r = requests.get(url)
        return r.json()
    except:
        return []

# Create a booking (POST into the same resource)
def create_booking(data):
    url = f"{BASE_URL}/service-centres"
    print("API POST:", url)
    try:
        r = requests.post(url, json=data)
        return r.json()
    except:
        return {"error": "POST failed"}
