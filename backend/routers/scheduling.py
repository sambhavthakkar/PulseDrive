"""
Scheduling Router
=================
Handles service appointment scheduling.
Integrates with the existing SchedulerAgent module.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta

router = APIRouter()


class TimeSlot(BaseModel):
    slot_id: str
    slot_time: str
    center_id: str
    center_name: str
    available: bool


class BookingRequest(BaseModel):
    vehicle_id: str
    owner: str
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


# In-memory slot and booking storage
bookings = []
taken_slots = set()


def generate_slots():
    """Generate available time slots for the next 7 days."""
    now = datetime.now().replace(minute=0, second=0, microsecond=0)
    centers = [
        {"id": "SC001", "name": "Pulse Service Hub - North"},
        {"id": "SC002", "name": "Pulse Service Hub - South"},
        {"id": "SC003", "name": "Authorized Jeep Center"},
    ]
    
    slots = []
    for center in centers:
        for day in range(1, 8):
            for hour in [9, 11, 14, 16]:
                slot_time = now + timedelta(days=day, hours=hour - now.hour)
                slot_id = f"{center['id']}-{slot_time.strftime('%Y%m%d-%H%M')}"
                slots.append(TimeSlot(
                    slot_id=slot_id,
                    slot_time=slot_time.isoformat(),
                    center_id=center["id"],
                    center_name=center["name"],
                    available=slot_id not in taken_slots
                ))
    return slots


@router.get("/find-slots", response_model=List[TimeSlot])
async def find_available_slots(
    center_id: Optional[str] = None,
    date: Optional[str] = None
):
    """
    Find available service slots.
    Optionally filter by center or date.
    """
    slots = generate_slots()
    
    if center_id:
        slots = [s for s in slots if s.center_id == center_id]
    
    if date:
        slots = [s for s in slots if date in s.slot_time]
    
    # Only return available slots
    return [s for s in slots if s.available][:20]


@router.post("/confirm", response_model=BookingConfirmation)
async def confirm_booking(request: BookingRequest):
    """
    Confirm a service appointment.
    This locks the slot and creates a booking record.
    """
    if request.slot_id in taken_slots:
        raise HTTPException(status_code=409, detail="Slot is no longer available")
    
    # Mark slot as taken
    taken_slots.add(request.slot_id)
    
    # Parse center info from slot_id
    parts = request.slot_id.split("-")
    center_id = parts[0]
    center_names = {
        "SC001": "Pulse Service Hub - North",
        "SC002": "Pulse Service Hub - South",
        "SC003": "Authorized Jeep Center",
    }
    
    # Create booking
    booking_id = f"BK-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    
    # Estimate cost based on service type
    cost_map = {
        "brake_service": "₹3,500",
        "oil_change": "₹1,200",
        "full_inspection": "₹2,500",
        "tire_rotation": "₹800",
        "general": "₹1,500"
    }
    estimated_cost = cost_map.get(request.service_type, "₹2,000")
    
    booking = BookingConfirmation(
        booking_id=booking_id,
        vehicle_id=request.vehicle_id,
        slot_id=request.slot_id,
        center_name=center_names.get(center_id, "Service Center"),
        slot_datetime=datetime.now().isoformat(),
        service_type=request.service_type,
        estimated_cost=estimated_cost,
        status="confirmed"
    )
    
    bookings.append(booking.model_dump())
    
    return booking


@router.get("/bookings/{vehicle_id}")
async def get_vehicle_bookings(vehicle_id: str):
    """Get all bookings for a vehicle."""
    return [b for b in bookings if b.get("vehicle_id") == vehicle_id]


@router.delete("/cancel/{booking_id}")
async def cancel_booking(booking_id: str):
    """Cancel a booking and release the slot."""
    for i, b in enumerate(bookings):
        if b.get("booking_id") == booking_id:
            taken_slots.discard(b.get("slot_id"))
            bookings.pop(i)
            return {"status": "cancelled", "booking_id": booking_id}
    raise HTTPException(status_code=404, detail="Booking not found")
