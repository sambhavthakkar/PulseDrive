
import os
import requests
from dotenv import load_dotenv

# Force reload
load_dotenv(override=True)

API_KEY = os.getenv("ELEVENLABS_API_KEY")
VOICE_ID = os.getenv("ELEVENLABS_VOICE_ID", "21m00Tcm4TlvDq8ikWAM")

print(f"API Key: {API_KEY}")
print(f"Voice ID: {VOICE_ID}")

# Also try with the simpler model
url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"

headers = {
    "Accept": "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": API_KEY
}

# Simpler payload
payload = {
    "text": "Test",
    "model_id": "eleven_monolingual_v1"  # Try older/simpler model
}

try:
    print("Testing with eleven_monolingual_v1...")
    response = requests.post(url, json=payload, headers=headers)
    print(f"Status: {response.status_code}")
    if response.status_code != 200:
        print(f"Response: {response.text}")
    else:
        print("SUCCESS!")
except Exception as e:
    print(f"Exception: {e}")
