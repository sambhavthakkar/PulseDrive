"""
Scheduling Router
=================
Handles service appointment scheduling.
Integrates with the external Scheduler Agent logic via MockAPI.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from services.scheduler_integration import scheduler_service

router = APIRouter()


class TimeSlot(BaseModel):
    slot_id: str
    slot_time: str
    center_id: str
    center_name: str
    available: bool


from services.notification import notification_service

class BookingRequest(BaseModel):
    vehicle_id: str
    owner: dict
    email: str  # Added email field
    slot_id: str
    service_type: str
    notes: Optional[str] = None


class BookingConfirmation(BaseModel):
    booking_id: str
    vehicle_id: str
    slot_id: str
    center_name: str
    slot_datetime: str
    service_type: str
    estimated_cost: str
    status: str


@router.get("/find-slots", response_model=List[TimeSlot])
async def find_available_slots(
    center_id: Optional[str] = None,
    date: Optional[str] = None
):
    """
    Find available service slots using the Scheduler Agent logic.
    """
    slots = scheduler_service.find_available_slots()
    
    # Filter by center if requested
    if center_id:
        slots = [s for s in slots if s["center_id"] == center_id]
    
    # Filter by date if requested
    if date:
        slots = [s for s in slots if date in s["slot_time"]]
    
    return slots[:20]  # Return top 20 slots


@router.post("/confirm", response_model=BookingConfirmation)
async def confirm_booking(request: BookingRequest):
    """
    Confirm a service appointment.
    This creates a booking in the external MockAPI and sends an email.
    """
    # Verify slot availability again
    taken_slots = scheduler_service.get_taken_slots()
    if request.slot_id in taken_slots:
        raise HTTPException(status_code=409, detail="Slot is no longer available")
    
    # Find slot details
    available_slots = scheduler_service.find_available_slots()
    slot_details = next((s for s in available_slots if s["slot_id"] == request.slot_id), None)
    
    if not slot_details:
        # Fallback if slot not found in available list (edge case)
        # Try to parse from ID or reject
        raise HTTPException(status_code=400, detail="Invalid slot ID")

    # Prepare booking data for MockAPI
    booking_payload = {
        "vehicle_id": request.vehicle_id,
        "owner": request.owner,
        "email": request.email, # Store email in mock API too
        "slot_id": request.slot_id,
        "centre_name": slot_details["center_name"],
        "slot_datetime": slot_details["slot_time"],
        "predicted_maintenance": [{"component": request.service_type, "urgency": 5}], # Mock data
        "status": "confirmed",
        "created_at": datetime.now().isoformat()
    }
    
    # Save to MockAPI
    saved_booking = scheduler_service.create_booking(booking_payload)
    
    if "error" in saved_booking:
        raise HTTPException(status_code=500, detail="Failed to create booking in external system")
    
    # Estimate cost
    cost_map = {
        "brake_service": "₹3,500",
        "oil_change": "₹1,200",
        "full_inspection": "₹2,500",
        "tire_rotation": "₹800",
        "general": "₹1,500"
    }
    estimated_cost = cost_map.get(request.service_type, "₹2,000")
    
    confirmation = BookingConfirmation(
        booking_id=saved_booking.get("id", "UNKNOWN"),
        vehicle_id=request.vehicle_id,
        slot_id=request.slot_id,
        center_name=slot_details["center_name"],
        slot_datetime=slot_details["slot_time"],
        service_type=request.service_type,
        estimated_cost=estimated_cost,
        status="confirmed"
    )
    
    # Send Email Notification
    notification_service.send_booking_confirmation(request.email, confirmation.model_dump())
    
    return confirmation


@router.get("/bookings/{vehicle_id}")
async def get_vehicle_bookings(vehicle_id: str):
    """Get all bookings for a vehicle from MockAPI."""
    all_bookings = scheduler_service.get_bookings()
    return [b for b in all_bookings if isinstance(b, dict) and b.get("vehicle_id") == vehicle_id]


@router.delete("/cancel/{booking_id}")
async def cancel_booking(booking_id: str):
    """
    Cancel a booking.
    Note: MockAPI deletion might not be fully supported by the simple client, 
    but we can implement a basic version if the API supports DELETE.
    """
    # For now, just return success as the MockAPI client didn't have delete logic
    return {"status": "cancelled", "booking_id": booking_id, "message": "Cancellation not fully implemented in MockAPI client"}
