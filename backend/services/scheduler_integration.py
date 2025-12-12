"""
Scheduler Integration Service
=============================
Integrates with the external MockAPI and implements the Scheduler Agent logic.
Ported from 'EY+Scheduler agent'.
"""

import requests
import heapq
from datetime import datetime, timedelta
from typing import List, Dict, Optional

BASE_URL = "https://693709f0f8dc350aff332a08.mockapi.io/api/v1"

class SchedulerIntegration:
    def __init__(self):
        pass  # No static initialization

    def _generate_local_centers(self):
        """Generate service centers and slots locally relative to NOW."""
        now = datetime.now().replace(minute=0, second=0, microsecond=0)
        return [
            {
                "id": "SC001",
                "name": "Hero Service Center - North",
                "slots": [
                    {
                        "slot_time": (now + timedelta(hours=i)).isoformat(),
                        "slot_id": f"SC001-SLOT-{i}"
                    }
                    for i in range(1, 48)  # Next 48 hours
                ]
            },
            {
                "id": "SC002",
                "name": "Hero Service Center - South",
                "slots": [
                    {
                        "slot_time": (now + timedelta(hours=i)).isoformat(),
                        "slot_id": f"SC002-SLOT-{i}"
                    }
                    for i in range(2, 48)
                ]
            }
        ]

    def get_bookings(self) -> List[Dict]:
        """Fetch existing bookings from MockAPI."""
        url = f"{BASE_URL}/service-centres"
        try:
            r = requests.get(url, timeout=5)
            if r.status_code == 200:
                data = r.json()
                return data if isinstance(data, list) else []
            return []
        except Exception as e:
            print(f"Error fetching bookings: {e}")
            return []

    def create_booking(self, booking_data: Dict) -> Dict:
        """Create a new booking in MockAPI."""
        url = f"{BASE_URL}/service-centres"
        try:
            r = requests.post(url, json=booking_data, timeout=5)
            if r.status_code in [200, 201]:
                return r.json()
            return {"error": "Failed to create booking", "status": r.status_code}
        except Exception as e:
            print(f"Error creating booking: {e}")
            return {"error": str(e)}

    def get_taken_slots(self) -> set:
        """Get a set of all taken slot IDs."""
        bookings = self.get_bookings()
        taken = set()
        for b in bookings:
            if isinstance(b, dict) and b.get("slot_id"):
                taken.add(b.get("slot_id"))
        return taken

    def find_available_slots(self, within_hours=48) -> List[Dict]:
        """Find available slots across all centers."""
        # regenerate centers to get fresh time slots
        centers = self._generate_local_centers()
        taken_slots = self.get_taken_slots()
        now_local = datetime.now().replace(minute=0, second=0, microsecond=0)
        candidates = []

        for center in centers:
            for slot in center["slots"]:
                dt = datetime.fromisoformat(slot["slot_time"])
                sid = slot["slot_id"]

                if dt >= now_local and (dt - now_local).total_seconds() <= within_hours * 3600:
                    if sid not in taken_slots:
                        candidates.append({
                            "center_id": center["id"],
                            "center_name": center["name"],
                            "slot_time": slot["slot_time"],
                            "slot_id": sid,
                            "available": True
                        })

        candidates.sort(key=lambda x: x["slot_time"])
        return candidates

# Singleton instance
scheduler_service = SchedulerIntegration()
