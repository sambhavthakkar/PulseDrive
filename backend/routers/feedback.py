"""
Feedback Router
===============
Handles user feedback and sentiment collection.
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter()


class FeedbackSubmission(BaseModel):
    vehicle_id: str
    user_id: str
    rating: int  # 1-5 stars
    tags: List[str] = []
    comment: Optional[str] = None
    service_id: Optional[str] = None


class FeedbackResponse(BaseModel):
    feedback_id: str
    status: str
    sentiment: str
    sentiment_score: float
    submitted_at: str


# In-memory feedback storage
feedback_store = []


def analyze_sentiment(rating: int, tags: List[str], comment: Optional[str]) -> tuple:
    """Simple sentiment analysis based on rating and tags."""
    negative_tags = ["wait_time", "cost", "communication", "quality_issue"]
    positive_tags = ["friendly_staff", "quick_service", "value", "professional"]
    
    score = rating / 5.0  # Base score from rating
    
    # Adjust based on tags
    for tag in tags:
        if tag in negative_tags:
            score -= 0.1
        elif tag in positive_tags:
            score += 0.1
    
    score = max(0, min(1, score))  # Clamp to 0-1
    
    if score >= 0.7:
        sentiment = "Positive"
    elif score >= 0.4:
        sentiment = "Neutral"
    else:
        sentiment = "Negative"
    
    return sentiment, round(score, 2)


@router.post("/submit", response_model=FeedbackResponse)
async def submit_feedback(data: FeedbackSubmission):
    """
    Submit user feedback after service.
    This triggers the Feedback Agent for sentiment analysis.
    """
    sentiment, score = analyze_sentiment(data.rating, data.tags, data.comment)
    
    feedback_id = f"FB-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    
    record = {
        "feedback_id": feedback_id,
        **data.model_dump(),
        "sentiment": sentiment,
        "sentiment_score": score,
        "submitted_at": datetime.now().isoformat()
    }
    
    feedback_store.append(record)
    
    return FeedbackResponse(
        feedback_id=feedback_id,
        status="recorded",
        sentiment=sentiment,
        sentiment_score=score,
        submitted_at=record["submitted_at"]
    )


@router.get("/history/{vehicle_id}")
async def get_feedback_history(vehicle_id: str):
    """Get all feedback for a vehicle."""
    return [f for f in feedback_store if f.get("vehicle_id") == vehicle_id]


@router.get("/analytics")
async def get_feedback_analytics():
    """Get aggregated feedback analytics."""
    if not feedback_store:
        return {"total": 0, "avg_rating": 0, "avg_sentiment": 0}
    
    avg_rating = sum(f.get("rating", 0) for f in feedback_store) / len(feedback_store)
    avg_sentiment = sum(f.get("sentiment_score", 0) for f in feedback_store) / len(feedback_store)
    
    return {
        "total": len(feedback_store),
        "avg_rating": round(avg_rating, 2),
        "avg_sentiment": round(avg_sentiment, 2),
        "sentiment_distribution": {
            "positive": len([f for f in feedback_store if f.get("sentiment") == "Positive"]),
            "neutral": len([f for f in feedback_store if f.get("sentiment") == "Neutral"]),
            "negative": len([f for f in feedback_store if f.get("sentiment") == "Negative"]),
        }
    }
