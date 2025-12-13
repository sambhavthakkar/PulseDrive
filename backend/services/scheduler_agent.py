import heapq
from datetime import datetime, timedelta
from services.api_client import get_bookings, create_booking


class SchedulerAgent:
    def __init__(self):
        print("=== SchedulerAgent Initializing ===")

        # ----------- Load existing bookings -----------
        bookings_raw = get_bookings()
        print("DEBUG: Raw bookings from API:", bookings_raw)

        # Ensure list of dicts
        if not isinstance(bookings_raw, list):
            bookings_raw = []

        self.historical_bookings = [
            b for b in bookings_raw if isinstance(b, dict)
        ]

        # Extract taken slots
        self.taken_slots = set()
        for b in self.historical_bookings:
            sid = b.get("slot_id")
            if sid:
                self.taken_slots.add(sid)

        print("DEBUG: Taken slots:", self.taken_slots)

        # ----------- Create Service Centers Locally -----------
        now = datetime.now().replace(minute=0, second=0, microsecond=0)

        self.centers = [
            {
                "id": "SC001",
                "name": "Hero Service Center - North",
                "slots": [
                    {
                        "slot_time": (now + timedelta(hours=i)).isoformat(),
                        "slot_id": f"SC001-SLOT-{i}"
                    }
                    for i in range(1, 8)
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
                    for i in range(2, 10)
                ]
            }
        ]

        print("DEBUG: Generated service centers:", self.centers)

    # ---------- Slot Conflict ----------
    def slot_conflict(self, slot_id):
        return slot_id in self.taken_slots

    def mark_slot_taken(self, slot_id):
        self.taken_slots.add(slot_id)

    # ---------- Find Available Slots ----------
    def _find_nearest_center_slots(self, within_hours=48):
        now_local = datetime.now().replace(minute=0, second=0, microsecond=0)
        candidates = []

        for center in self.centers:
            for slot in center["slots"]:
                dt = datetime.fromisoformat(slot["slot_time"])
                sid = slot["slot_id"]

                if dt >= now_local and (dt - now_local).total_seconds() <= within_hours * 3600:
                    if not self.slot_conflict(sid):
                        candidates.append({
                            "center_id": center["id"],
                            "centre_name": center["name"],   # British spelling
                            "slot_dt": dt,
                            "slot_id": sid
                        })

        candidates.sort(key=lambda x: x["slot_dt"])
        return candidates

    # ---------- Confirm Booking ----------
    def _confirm_booking(self, req, slot):
        self.mark_slot_taken(slot["slot_id"])

        booking = {
            "vehicle_id": req["vehicle_id"],
            "owner": req["owner"],
            "slot_id": slot["slot_id"],
            "centre_name": slot["centre_name"],     # British spelling
            "slot_datetime": slot["slot_dt"].isoformat(),
            "predicted_maintenance": req["predicted_maintenance"]
        }

        saved = create_booking(booking)

        print("\n✔ BOOKING CREATED")
        print("Vehicle:", req["vehicle_id"])
        print("Center :", slot["centre_name"])
        print("Slot   :", slot["slot_dt"])
        print("Saved  :", saved)

        return saved

    # ---------- Priority Scheduling ----------
    def schedule_priority_optimization(self, requests):
        assignments = []

        for req in requests:
            slots = self._find_nearest_center_slots()

            if not slots:
                print(f"[!] No available slots for {req['vehicle_id']}")
                continue

            chosen = slots[0]  # earliest slot
            booking = self._confirm_booking(req, chosen)
            assignments.append(booking)

        return assignments
