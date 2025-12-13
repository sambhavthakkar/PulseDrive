"""
Voice Router
============
Handles voice transcription and commands with ElevenLabs TTS.
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from services.elevenlabs_service import text_to_speech

router = APIRouter()


class TranscribeRequest(BaseModel):
    audio_base64: Optional[str] = None
    text_fallback: Optional[str] = None


class TranscribeResponse(BaseModel):
    text: str
    confidence: float
    intent: str
    entities: dict
    processed_at: str


class VoiceCommandResponse(BaseModel):
    understood: bool
    response_text: str
    response_audio: Optional[str] = None  # Base64 encoded audio from ElevenLabs
    action_type: Optional[str] = None
    action_data: Optional[dict] = None


# Intent patterns for feedback agent
INTENT_PATTERNS = {
    "positive_feedback": ["good", "great", "excellent", "amazing", "wonderful", "fantastic", "loved", "happy", "satisfied"],
    "negative_feedback": ["bad", "poor", "terrible", "awful", "disappointed", "unhappy", "frustrated", "angry"],
    "neutral_feedback": ["okay", "fine", "average", "alright", "decent"],
    "schedule": ["book", "schedule", "appointment", "service", "slot"],
    "status": ["status", "health", "check", "diagnostic", "how is my"],
    "tire": ["tire", "tyre", "pressure", "wheel"],
    "oil": ["oil", "engine", "fluid"],
    "brake": ["brake", "braking", "stop"],
    "greeting": ["hello", "hi", "hey", "good morning", "good afternoon"],
    "thanks": ["thank", "thanks", "appreciate"],
    "help": ["help", "what can you do", "assist"],
}


def detect_intent(text: str) -> tuple:
    """Detect intent from text with priority for feedback-related intents."""
    text_lower = text.lower()
    
    for intent, keywords in INTENT_PATTERNS.items():
        for keyword in keywords:
            if keyword in text_lower:
                return intent, 0.85
    
    return "general", 0.5


def extract_entities(text: str) -> dict:
    """Extract simple entities from text."""
    entities = {}
    
    # Time detection
    time_keywords = ["tomorrow", "today", "next week", "monday", "tuesday", "wednesday", "thursday", "friday"]
    for kw in time_keywords:
        if kw in text.lower():
            entities["time"] = kw
            break
    
    # Service type detection
    service_keywords = {"brake": "brake_service", "oil": "oil_change", "tire": "tire_rotation", "inspection": "full_inspection"}
    for kw, service in service_keywords.items():
        if kw in text.lower():
            entities["service_type"] = service
            break
    
    # Rating detection
    for i in range(1, 6):
        if str(i) in text or f"{i} star" in text.lower():
            entities["rating"] = i
            break
    
    return entities


def get_response_for_intent(intent: str, text: str) -> dict:
    """Generate appropriate response based on detected intent."""
    
    responses = {
        "positive_feedback": {
            "understood": True,
            "response_text": "That's wonderful to hear! Thank you for your positive feedback. We're glad you had a great experience. Would you like to rate the service on a scale of 1 to 5 stars?",
            "action_type": "feedback_positive",
            "action_data": {"sentiment": "positive", "suggested_rating": 5}
        },
        "negative_feedback": {
            "understood": True,
            "response_text": "I'm sorry to hear that. We value your feedback and want to improve. Could you tell me more about what went wrong so we can address it?",
            "action_type": "feedback_negative",
            "action_data": {"sentiment": "negative", "escalate": True}
        },
        "neutral_feedback": {
            "understood": True,
            "response_text": "Thank you for sharing. We'd love to make your next experience even better. Is there anything specific we could improve?",
            "action_type": "feedback_neutral",
            "action_data": {"sentiment": "neutral"}
        },
        "schedule": {
            "understood": True,
            "response_text": "I can help you schedule a service appointment. We have slots available tomorrow at 10 AM and 2 PM. Would you like me to book one for you?",
            "action_type": "schedule_prompt",
            "action_data": {"suggested_date": "tomorrow", "slots_available": ["10:00 AM", "2:00 PM"]}
        },
        "status": {
            "understood": True,
            "response_text": "Your vehicle health is at 94%. All major systems are operational. Tire pressure is slightly low on the front left. Would you like a detailed report?",
            "action_type": "status_report",
            "action_data": {"health_score": 94, "alerts": ["tire_pressure_low"]}
        },
        "tire": {
            "understood": True,
            "response_text": "Your tire pressure readings are: Front Left 30 PSI, which is slightly low. Front Right, Rear Left, and Rear Right are all at 32 PSI. I recommend inflating the front left tire.",
            "action_type": "tire_status",
            "action_data": {"front_left": 30, "front_right": 32, "rear_left": 32, "rear_right": 32}
        },
        "oil": {
            "understood": True,
            "response_text": "Oil level is at 92%, which is in good condition. Engine temperature is normal. Oil change is recommended in approximately 2,500 miles.",
            "action_type": "oil_status",
            "action_data": {"oil_level": 92, "next_change_miles": 2500}
        },
        "brake": {
            "understood": True,
            "response_text": "Brake pad wear is at 65% for the front and 78% for the rear. Brake fluid level is good. Estimated remaining life is about 8,000 miles. No immediate action required.",
            "action_type": "brake_status",
            "action_data": {"front_wear": 65, "rear_wear": 78, "remaining_miles": 8000}
        },
        "greeting": {
            "understood": True,
            "response_text": "Hello! I'm your Pulse Drive feedback assistant. How was your recent service experience? I'd love to hear your thoughts.",
            "action_type": None,
            "action_data": None
        },
        "thanks": {
            "understood": True,
            "response_text": "You're welcome! Is there anything else I can help you with today?",
            "action_type": None,
            "action_data": None
        },
        "help": {
            "understood": True,
            "response_text": "I can help you with vehicle diagnostics, scheduling service appointments, and collecting your feedback. What would you like to know?",
            "action_type": "help",
            "action_data": {"capabilities": ["diagnostics", "scheduling", "feedback"]}
        },
        "general": {
            "understood": True,
            "response_text": "Thank you for sharing! I'm here to help with vehicle diagnostics, scheduling service, or collecting your feedback. How was your recent experience with us?",
            "action_type": None,
            "action_data": None
        }
    }
    
    return responses.get(intent, responses["general"])


@router.post("/transcribe", response_model=TranscribeResponse)
async def transcribe_voice(request: TranscribeRequest):
    """
    Transcribe voice input and detect intent.
    """
    text = request.text_fallback or "Hello, how can I help?"
    
    intent, confidence = detect_intent(text)
    entities = extract_entities(text)
    
    return TranscribeResponse(
        text=text,
        confidence=confidence,
        intent=intent,
        entities=entities,
        processed_at=datetime.now().isoformat()
    )


@router.post("/command", response_model=VoiceCommandResponse)
async def process_voice_command(request: TranscribeRequest):
    """
    Process a voice command and return response with optional audio.
    """
    text = request.text_fallback or ""
    print(f"[Voice] Received command: {text}")
    
    intent, confidence = detect_intent(text)
    print(f"[Voice] Detected intent: {intent} (confidence: {confidence})")
    
    # Get appropriate response
    response_data = get_response_for_intent(intent, text)
    
    # Generate audio response using ElevenLabs
    audio_base64 = await text_to_speech(response_data["response_text"])
    
    return VoiceCommandResponse(
        understood=response_data["understood"],
        response_text=response_data["response_text"],
        response_audio=audio_base64,
        action_type=response_data.get("action_type"),
        action_data=response_data.get("action_data")
    )


@router.get("/test-tts")
async def test_tts():
    """Test ElevenLabs TTS integration."""
    test_text = "Hello! This is a test of the ElevenLabs voice system."
    audio = await text_to_speech(test_text)
    
    if audio:
        return {
            "status": "success",
            "message": "ElevenLabs TTS is working!",
            "audio_length": len(audio),
            "audio_base64": audio[:100] + "..."  # First 100 chars only
        }
    else:
        return {
            "status": "error",
            "message": "ElevenLabs TTS failed. Check API key and logs."
        }
