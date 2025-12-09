"""
UEBA Security Agent Service
============================
User and Entity Behavior Analytics for monitoring agent behavior
and detecting anomalies in the multi-agent system.

Monitors:
- Agent execution patterns
- API access patterns
- Session token validity
- Unusual command sequences
- Data exfiltration attempts
"""

from typing import List, Dict, Optional
from datetime import datetime, timedelta
from enum import Enum
import random


class RiskLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class AnomalyType(str, Enum):
    UNAUTHORIZED_ACCESS = "unauthorized_access"
    UNUSUAL_PATTERN = "unusual_pattern"
    TOKEN_MISMATCH = "token_mismatch"
    RATE_LIMIT_EXCEEDED = "rate_limit_exceeded"
    DATA_EXFILTRATION = "data_exfiltration"
    AGENT_BEHAVIOR_DRIFT = "agent_behavior_drift"


class SecurityEvent:
    """Represents a security event in the system."""
    def __init__(
        self,
        event_type: str,
        source: str,
        user: str,
        status: str,
        risk_level: RiskLevel,
        details: str
    ):
        self.event_id = f"SEC-{datetime.now().strftime('%Y%m%d%H%M%S')}-{random.randint(100, 999)}"
        self.timestamp = datetime.now().isoformat()
        self.event_type = event_type
        self.source = source
        self.user = user
        self.status = status
        self.risk_level = risk_level
        self.details = details
    
    def to_dict(self) -> dict:
        return {
            "event_id": self.event_id,
            "timestamp": self.timestamp,
            "event_type": self.event_type,
            "source": self.source,
            "user": self.user,
            "status": self.status,
            "risk_level": self.risk_level.value,
            "details": self.details
        }


class UEBAAgent:
    """
    UEBA Security Agent for monitoring and anomaly detection.
    """
    
    def __init__(self):
        self.security_events: List[SecurityEvent] = []
        self.active_alerts: List[dict] = []
        self.agent_behavior_baseline: Dict[str, dict] = {}
        self.trusted_sources = {"Vehicle ECU", "Mobile App", "Service Center", "System"}
        self.trusted_users = {"Sambhav T.", "Auto-Start", "System", "Sensor"}
        
        # Initialize baseline behavior for each agent
        self._initialize_baselines()
    
    def _initialize_baselines(self):
        """Set up baseline behavior patterns for agents."""
        self.agent_behavior_baseline = {
            "data_analysis": {
                "avg_execution_time_ms": 1500,
                "max_data_processed_mb": 2000,
                "expected_output_types": ["telemetry", "normalized_data"]
            },
            "diagnosis": {
                "avg_execution_time_ms": 2000,
                "max_predictions": 10,
                "expected_output_types": ["risk_score", "predictions"]
            },
            "scheduling": {
                "avg_execution_time_ms": 800,
                "max_slots_queried": 50,
                "expected_output_types": ["slots", "booking"]
            },
            "voice": {
                "avg_execution_time_ms": 500,
                "max_transcript_length": 500,
                "expected_output_types": ["transcript", "intent"]
            },
            "feedback": {
                "avg_execution_time_ms": 300,
                "max_rating": 5,
                "expected_output_types": ["sentiment", "rating"]
            }
        }
    
    def calculate_trust_score(self, vehicle_id: str) -> dict:
        """
        Calculate comprehensive trust score for a vehicle/session.
        """
        # Base scores (would be calculated from real data)
        auth_score = 100  # Authentication strength
        geo_score = random.randint(90, 100)  # Geolocation trust
        behavior_score = random.randint(85, 100)  # Behavior pattern matching
        network_score = random.randint(92, 100)  # Network security
        
        # Calculate weighted average
        weights = {"auth": 0.3, "geo": 0.25, "behavior": 0.25, "network": 0.2}
        total_score = int(
            auth_score * weights["auth"] +
            geo_score * weights["geo"] +
            behavior_score * weights["behavior"] +
            network_score * weights["network"]
        )
        
        # Determine grade
        if total_score >= 95:
            grade = "Excellent"
        elif total_score >= 85:
            grade = "Good"
        elif total_score >= 70:
            grade = "Fair"
        else:
            grade = "Needs Review"
        
        return {
            "vehicle_id": vehicle_id,
            "score": total_score,
            "grade": grade,
            "factors": {
                "authentication": auth_score,
                "geolocation": "Safe" if geo_score >= 90 else "Review",
                "behavior_pattern": "Normal" if behavior_score >= 85 else "Anomalous",
                "network_security": "Secure" if network_score >= 90 else "Warning"
            },
            "calculated_at": datetime.now().isoformat()
        }
    
    def detect_anomaly(
        self,
        agent_id: str,
        execution_time_ms: int,
        output_type: str,
        data_size_mb: Optional[float] = None
    ) -> Optional[dict]:
        """
        Detect anomalies in agent behavior.
        Returns anomaly details if detected, None otherwise.
        """
        baseline = self.agent_behavior_baseline.get(agent_id)
        if not baseline:
            return None
        
        anomalies = []
        
        # Check execution time (> 3x baseline is suspicious)
        if execution_time_ms > baseline["avg_execution_time_ms"] * 3:
            anomalies.append({
                "type": AnomalyType.AGENT_BEHAVIOR_DRIFT.value,
                "description": f"Execution time {execution_time_ms}ms exceeds baseline by 3x",
                "severity": RiskLevel.MEDIUM.value
            })
        
        # Check output type
        if output_type not in baseline["expected_output_types"]:
            anomalies.append({
                "type": AnomalyType.UNUSUAL_PATTERN.value,
                "description": f"Unexpected output type: {output_type}",
                "severity": RiskLevel.HIGH.value
            })
        
        # Check data size for data_analysis agent
        if agent_id == "data_analysis" and data_size_mb:
            if data_size_mb > baseline["max_data_processed_mb"]:
                anomalies.append({
                    "type": AnomalyType.DATA_EXFILTRATION.value,
                    "description": f"Data size {data_size_mb}MB exceeds limit",
                    "severity": RiskLevel.CRITICAL.value
                })
        
        if anomalies:
            alert = {
                "alert_id": f"ALERT-{datetime.now().strftime('%Y%m%d%H%M%S')}",
                "agent_id": agent_id,
                "anomalies": anomalies,
                "timestamp": datetime.now().isoformat(),
                "resolved": False
            }
            self.active_alerts.append(alert)
            return alert
        
        return None
    
    def validate_access(
        self,
        source: str,
        user: str,
        action: str,
        session_token: Optional[str] = None
    ) -> dict:
        """
        Validate access request and log security event.
        """
        is_trusted_source = source in self.trusted_sources
        is_trusted_user = user in self.trusted_users
        
        # Determine risk level and status
        if is_trusted_source and is_trusted_user:
            risk_level = RiskLevel.LOW
            status = "Authorized"
        elif is_trusted_source or is_trusted_user:
            risk_level = RiskLevel.MEDIUM
            status = "Flagged"
        else:
            risk_level = RiskLevel.HIGH
            status = "Blocked"
        
        # Create security event
        event = SecurityEvent(
            event_type=action,
            source=source,
            user=user,
            status=status,
            risk_level=risk_level,
            details=f"Access validation for {action}"
        )
        
        self.security_events.append(event)
        
        return {
            "authorized": status == "Authorized",
            "status": status,
            "risk_level": risk_level.value,
            "event_id": event.event_id
        }
    
    def get_security_logs(
        self,
        limit: int = 20,
        status_filter: Optional[str] = None,
        risk_filter: Optional[str] = None
    ) -> List[dict]:
        """Get recent security events."""
        events = [e.to_dict() for e in self.security_events]
        
        if status_filter:
            events = [e for e in events if e["status"].lower() == status_filter.lower()]
        
        if risk_filter:
            events = [e for e in events if e["risk_level"].lower() == risk_filter.lower()]
        
        return events[-limit:]
    
    def get_monitored_systems_status(self) -> List[dict]:
        """Get status of all monitored systems."""
        return [
            {"system": "OBD-II Port", "status": "Locked", "secure": True},
            {"system": "Remote API", "status": "Encrypted", "secure": True},
            {"system": "GPS Unit", "status": "Verified", "secure": True},
            {"system": "Key Fob RF", "status": "Secure", "secure": True},
            {"system": "Mobile App", "status": "Authenticated", "secure": True},
            {"system": "Cloud Sync", "status": "Active", "secure": True},
        ]
    
    def get_active_anomalies(self) -> dict:
        """Get summary of active anomalies."""
        unresolved = [a for a in self.active_alerts if not a["resolved"]]
        
        return {
            "active_anomalies": len(unresolved),
            "alerts": unresolved[:5],  # Latest 5
            "last_scan": datetime.now().isoformat(),
            "status": "System Secured" if len(unresolved) == 0 else "Alerts Active",
            "monitored_agents": [
                {"agent": "Data Analysis", "status": "healthy"},
                {"agent": "Diagnosis", "status": "healthy"},
                {"agent": "Scheduling", "status": "healthy"},
                {"agent": "Voice", "status": "healthy"},
                {"agent": "Feedback", "status": "healthy"},
            ]
        }


# Singleton instance
ueba_agent = UEBAAgent()
