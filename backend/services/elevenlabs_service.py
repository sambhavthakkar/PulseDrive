"""
ElevenLabs Voice Service
========================
Text-to-speech service using ElevenLabs API.
"""

import os
import base64
import httpx
from typing import Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


def get_api_key():
    """Get API key (lazy loading to ensure dotenv is loaded)."""
    return os.getenv("ELEVENLABS_API_KEY")


def get_voice_id():
    """Get voice ID (lazy loading)."""
    return os.getenv("ELEVENLABS_VOICE_ID", "21m00Tcm4TlvDq8ikWAM")


async def text_to_speech(text: str, voice_id: Optional[str] = None) -> Optional[str]:
    """
    Convert text to speech using ElevenLabs API.
    Returns base64-encoded MP3 audio or None if failed.
    """
    api_key = get_api_key()
    
    if not api_key:
        print("[ElevenLabs] API key not configured")
        return None
    
    voice = voice_id or get_voice_id()
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice}"
    
    headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": api_key
    }
    
    payload = {
        "text": text,
        "model_id": "eleven_turbo_v2_5",  # Fast model for free tier
        "voice_settings": {
            "stability": 0.75,  # Higher stability = smoother, less breaking
            "similarity_boost": 0.5,  # Balanced for natural sound
            "style": 0.0,  # Neutral style
            "use_speaker_boost": True  # Enhances speaker clarity
        }
    }
    
    try:
        print(f"[ElevenLabs] Generating speech for: {text[:50]}...")
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(url, json=payload, headers=headers)
            
            if response.status_code == 200:
                audio_bytes = response.content
                audio_base64 = base64.b64encode(audio_bytes).decode('utf-8')
                print(f"[ElevenLabs] ✓ Audio generated successfully ({len(audio_base64)} bytes)")
                return audio_base64
            else:
                print(f"[ElevenLabs] ✗ Error: {response.status_code} - {response.text}")
                try:
                    error_detail = response.json()
                    print(f"[ElevenLabs] Error Details: {error_detail}")
                except:
                    pass
                return None
                
    except Exception as e:
        print(f"[ElevenLabs] ✗ Exception: {str(e)}")
        return None


def get_available_voices():
    """Get list of available ElevenLabs voices (for reference)."""
    return {
        "Rachel": "21m00Tcm4TlvDq8ikWAM",
        "Domi": "AZnzlk1XvdvUeBnXmlld",
        "Bella": "EXAVITQu4vr4xnSDxMaL",
        "Antoni": "ErXwobaYiN019PkySvjV",
        "Elli": "MF3mGyEYCl7XYWbV9V6O",
        "Josh": "TxGEqnHWrfWFTfGW9XjX",
        "Arnold": "VR6AewLTigWG4xSOukaG",
        "Adam": "pNInz6obpgDQGcFmaJgB",
        "Sam": "yoZ06aMxZJJ28mfd3POQ"
    }
