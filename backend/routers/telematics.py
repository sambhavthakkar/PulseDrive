"""
Telematics Router
=================
Handles vehicle telemetry ingestion and processing.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

router = APIRouter()


class TelemetryData(BaseModel):
    vehicle_id: str
    timestamp: Optional[str] = None
    battery_level: float
    oil_level: float
    brake_fluid: float
    tire_pressure: List[float]
    engine_temp: float
    mileage: int
    speed: Optional[float] = 0


class TelemetryResponse(BaseModel):
    status: str
    vehicle_id: str
    processed_at: str
    anomalies_detected: int


# In-memory storage for demo
telemetry_store = []


@router.post("/ingest", response_model=TelemetryResponse)
async def ingest_telemetry(data: TelemetryData):
    """
    Ingest raw vehicle telemetry data.
    This triggers the Data Analysis Agent pipeline.
    """
    # Store telemetry
    record = data.model_dump()
    record["processed_at"] = datetime.now().isoformat()
    telemetry_store.append(record)
    
    # Simple anomaly detection
    anomalies = 0
    if data.battery_level < 20:
        anomalies += 1
    if data.oil_level < 30:
        anomalies += 1
    if data.brake_fluid < 50:
        anomalies += 1
    if any(p < 28 for p in data.tire_pressure):
        anomalies += 1
    if data.engine_temp > 100:
        anomalies += 1
    
    return TelemetryResponse(
        status="ingested",
        vehicle_id=data.vehicle_id,
        processed_at=record["processed_at"],
        anomalies_detected=anomalies
    )


@router.get("/latest/{vehicle_id}")
async def get_latest_telemetry(vehicle_id: str):
    """Get the most recent telemetry for a vehicle."""
    for record in reversed(telemetry_store):
        if record.get("vehicle_id") == vehicle_id:
            return record
    raise HTTPException(status_code=404, detail="No telemetry found for vehicle")


@router.get("/history/{vehicle_id}")
async def get_telemetry_history(vehicle_id: str, limit: int = 10):
    """Get telemetry history for a vehicle."""
    history = [r for r in telemetry_store if r.get("vehicle_id") == vehicle_id]
    return history[-limit:]
