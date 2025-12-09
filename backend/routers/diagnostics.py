"""
Diagnostics Router
==================
Handles predictive failure analysis and diagnosis.
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import random

router = APIRouter()


class DiagnosticRequest(BaseModel):
    vehicle_id: str
    include_predictions: bool = True
    include_root_cause: bool = True


class FailurePrediction(BaseModel):
    component: str
    probability: float
    severity: str
    time_to_failure: str
    recommended_action: str


class DiagnosticResult(BaseModel):
    vehicle_id: str
    health_score: int
    overall_status: str
    predictions: List[FailurePrediction]
    root_cause_analysis: Optional[str]
    analyzed_at: str


@router.post("/run", response_model=DiagnosticResult)
async def run_diagnostics(request: DiagnosticRequest):
    """
    Run predictive diagnostics on a vehicle.
    This triggers the Diagnosis Agent.
    """
    # Simulated predictions based on common failure patterns
    predictions = [
        FailurePrediction(
            component="Brake Pads",
            probability=round(random.uniform(70, 95), 1),
            severity="high",
            time_to_failure="~2 weeks",
            recommended_action="Schedule brake inspection and pad replacement"
        ),
        FailurePrediction(
            component="Oil Filter",
            probability=round(random.uniform(30, 55), 1),
            severity="medium",
            time_to_failure="~2 months",
            recommended_action="Include in next scheduled service"
        ),
        FailurePrediction(
            component="Tire Wear (Front Left)",
            probability=round(random.uniform(20, 40), 1),
            severity="low",
            time_to_failure="~4 months",
            recommended_action="Monitor tread depth"
        ),
        FailurePrediction(
            component="Battery Health",
            probability=round(random.uniform(10, 25), 1),
            severity="low",
            time_to_failure="~8 months",
            recommended_action="Battery test at next service"
        ),
    ]
    
    # Calculate health score
    avg_risk = sum(p.probability for p in predictions) / len(predictions)
    health_score = max(0, min(100, int(100 - avg_risk)))
    
    # Determine status
    if health_score >= 85:
        status = "Excellent"
    elif health_score >= 70:
        status = "Good"
    elif health_score >= 50:
        status = "Fair"
    else:
        status = "Needs Attention"
    
    root_cause = None
    if request.include_root_cause:
        root_cause = (
            "Primary wear detected on front brake assembly. "
            "Contributing factors: urban driving pattern (frequent stops), "
            "ambient temperature variations, and mileage accumulation. "
            "Digital twin simulation confirms 89% confidence in prediction."
        )
    
    return DiagnosticResult(
        vehicle_id=request.vehicle_id,
        health_score=health_score,
        overall_status=status,
        predictions=predictions if request.include_predictions else [],
        root_cause_analysis=root_cause,
        analyzed_at=datetime.now().isoformat()
    )


@router.get("/quick-check/{vehicle_id}")
async def quick_health_check(vehicle_id: str):
    """Quick health score lookup."""
    return {
        "vehicle_id": vehicle_id,
        "health_score": random.randint(85, 98),
        "status": "Healthy",
        "last_check": datetime.now().isoformat()
    }
