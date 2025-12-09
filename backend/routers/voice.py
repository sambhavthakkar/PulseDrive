"""
Voice Router
============
Handles voice transcription and commands.
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

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
    action_type: Optional[str]
    action_data: Optional[dict]


# Intent patterns
INTENT_PATTERNS = {
    "schedule": ["book", "schedule", "appointment", "service", "slot"],
    "status": ["status", "health", "check", "diagnostic", "how"],
    "navigation": ["navigate", "directions", "route", "go to"],
    "control": ["start", "stop", "lock", "unlock", "turn on", "turn off"],
}


def detect_intent(text: str) -> tuple:
    """Simple intent detection from text."""
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
    
    return entities


@router.post("/transcribe", response_model=TranscribeResponse)
async def transcribe_voice(request: TranscribeRequest):
    """
    Transcribe voice input and detect intent.
    In production, this would use a speech-to-text service.
    """
    # Use text fallback for demo
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
    Process a voice command and determine action.
    """
    text = request.text_fallback or ""
    intent, confidence = detect_intent(text)
    
    responses = {
        "schedule": {
            "understood": True,
            "response_text": "I can help you schedule a service. I found available slots for tomorrow. Would you like me to book one?",
            "action_type": "schedule_prompt",
            "action_data": {"suggested_date": "tomorrow", "slots_available": 3}
        },
        "status": {
            "understood": True,
            "response_text": "Your vehicle health is at 94%. All systems are operating normally. Tire pressure is slightly low on the front left.",
            "action_type": "status_report",
            "action_data": {"health_score": 94, "alerts": ["tire_pressure_low"]}
        },
        "general": {
            "understood": True,
            "response_text": "I'm your Pulse Drive assistant. I can help with vehicle diagnostics, scheduling service, or answering questions about your car.",
            "action_type": None,
            "action_data": None
        }
    }
    
    return VoiceCommandResponse(**responses.get(intent, responses["general"]))
