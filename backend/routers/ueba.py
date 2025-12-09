"""
UEBA Router
===========
User and Entity Behavior Analytics for security monitoring.
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import random

router = APIRouter()


class SecurityEvent(BaseModel):
    event_id: str
    timestamp: str
    event_type: str
    source: str
    user: str
    status: str  # authorized, flagged, blocked
    risk_level: str  # low, medium, high
    details: str


class TrustScore(BaseModel):
    vehicle_id: str
    score: int
    grade: str
    factors: dict
    calculated_at: str


class AnomalyAlert(BaseModel):
    alert_id: str
    severity: str
    description: str
    source_agent: str
    timestamp: str
    resolved: bool


# In-memory security log
security_log = []


def generate_mock_events() -> List[dict]:
    """Generate realistic security events."""
    events = [
        {"type": "Remote unlock requested via App", "status": "Authorized", "risk": "Low", "user": "Sambhav T."},
        {"type": "Engine start sequence initiated", "status": "Authorized", "risk": "Low", "user": "Auto-Start"},
        {"type": "Unusual geolocation access (New Device)", "status": "Flagged", "risk": "Medium", "user": "Unknown"},
        {"type": "Password reset attempt detected", "status": "Blocked", "risk": "High", "user": "IP: 192.168.x.x"},
        {"type": "Diagnostic port access", "status": "Authorized", "risk": "Low", "user": "Service Center"},
        {"type": "Firmware OTA update check", "status": "Authorized", "risk": "Low", "user": "System"},
        {"type": "Failed login attempt (Mobile App)", "status": "Blocked", "risk": "Medium", "user": "IP: 45.33.x.x"},
        {"type": "Geofence exit detected (Work)", "status": "Authorized", "risk": "Low", "user": "Sambhav T."},
        {"type": "Battery disconnect warning", "status": "Flagged", "risk": "Medium", "user": "Sensor"},
    ]
    
    result = []
    now = datetime.now()
    for i, e in enumerate(events):
        result.append(SecurityEvent(
            event_id=f"SEC-{1000 + i}",
            timestamp=(now - timedelta(hours=i * 4)).isoformat(),
            event_type=e["type"],
            source="Vehicle ECU" if i % 2 == 0 else "Mobile App",
            user=e["user"],
            status=e["status"],
            risk_level=e["risk"],
            details=f"Event recorded from {'vehicle sensors' if i % 2 == 0 else 'remote connection'}"
        ))
    
    return result


@router.get("/logs", response_model=List[SecurityEvent])
async def get_security_logs(
    limit: int = 20,
    status: Optional[str] = None,
    risk_level: Optional[str] = None
):
    """
    Get security audit logs.
    Optionally filter by status or risk level.
    """
    events = generate_mock_events()
    
    if status:
        events = [e for e in events if e.status.lower() == status.lower()]
    
    if risk_level:
        events = [e for e in events if e.risk_level.lower() == risk_level.lower()]
    
    return events[:limit]


@router.get("/trust-score/{vehicle_id}", response_model=TrustScore)
async def get_trust_score(vehicle_id: str):
    """
    Get the trust/security score for a vehicle.
    """
    score = random.randint(92, 99)
    
    if score >= 95:
        grade = "Excellent"
    elif score >= 85:
        grade = "Good"
    elif score >= 70:
        grade = "Fair"
    else:
        grade = "Needs Review"
    
    return TrustScore(
        vehicle_id=vehicle_id,
        score=score,
        grade=grade,
        factors={
            "authentication": 100,
            "geolocation": "Safe",
            "behavior_pattern": "Normal",
            "network_security": "Secure"
        },
        calculated_at=datetime.now().isoformat()
    )


@router.get("/anomalies")
async def get_active_anomalies():
    """Get currently active anomaly alerts."""
    # In a real system, this would query the UEBA agent
    return {
        "active_anomalies": 0,
        "last_scan": datetime.now().isoformat(),
        "status": "System Secured",
        "monitored_agents": [
            {"agent": "Data Analysis", "status": "healthy"},
            {"agent": "Diagnosis", "status": "healthy"},
            {"agent": "Scheduling", "status": "healthy"},
            {"agent": "Voice", "status": "healthy"},
        ]
    }


@router.post("/report-anomaly")
async def report_anomaly(
    source_agent: str,
    description: str,
    severity: str = "medium"
):
    """
    Report an anomaly detected by an agent.
    """
    alert = AnomalyAlert(
        alert_id=f"ALERT-{datetime.now().strftime('%Y%m%d%H%M%S')}",
        severity=severity,
        description=description,
        source_agent=source_agent,
        timestamp=datetime.now().isoformat(),
        resolved=False
    )
    
    return alert
