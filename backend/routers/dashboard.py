"""
Dashboard Router
================
Provides aggregated stats for the main dashboard.
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from datetime import datetime
import random

router = APIRouter()


class DashboardStats(BaseModel):
    health_score: int
    battery_level: int
    oil_level: int
    brake_fluid: int
    tire_pressure: List[int]
    mileage: int
    range_km: int
    engine_temp: int
    last_service: str
    next_service_due: str
    active_alerts: int


class LiveTelemetry(BaseModel):
    timestamp: str
    speed: int
    rpm: int
    fuel_efficiency: float
    battery_voltage: float


@router.get("/stats", response_model=DashboardStats)
async def get_dashboard_stats():
    """
    Get comprehensive dashboard statistics.
    """
    return DashboardStats(
        health_score=94,
        battery_level=45,
        oil_level=92,
        brake_fluid=88,
        tire_pressure=[32, 32, 31, 32],
        mileage=45231,
        range_km=240,
        engine_temp=82,
        last_service="2024-10-15",
        next_service_due="2025-01-15",
        active_alerts=1
    )


@router.get("/live-telemetry", response_model=LiveTelemetry)
async def get_live_telemetry():
    """
    Get current live telemetry readings.
    """
    return LiveTelemetry(
        timestamp=datetime.now().isoformat(),
        speed=random.randint(0, 120),
        rpm=random.randint(800, 4000),
        fuel_efficiency=round(random.uniform(10, 15), 1),
        battery_voltage=round(random.uniform(12.2, 14.4), 1)
    )


@router.get("/quick-metrics")
async def get_quick_metrics():
    """
    Get key metrics for header/widget display.
    """
    return {
        "health": 94,
        "alerts": 1,
        "upcoming_service": "3 days",
        "last_sync": datetime.now().isoformat()
    }


@router.get("/vehicle-info")
async def get_vehicle_info():
    """
    Get vehicle identification info.
    """
    return {
        "model": "Jeep Compass",
        "year": 2025,
        "vin": "MCA-JP-2025-X7",
        "owner": "Sambhav Thakkar",
        "os_version": "PulseOS v2.4.0",
        "connected": True
    }
