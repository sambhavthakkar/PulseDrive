from datetime import datetime
from scheduler_agent import SchedulerAgent

print("Running Scheduler Agent...")

requests_data = [
    {
        "vehicle_id": "V101",
        "owner": {"name": "Asha", "contact": "asu@example.com"},
        "predicted_maintenance": [{"component": "brake_pads", "urgency": 8}],
        "request_time": datetime.now()
    },
    {
        "vehicle_id": "V102",
        "owner": {"name": "Rohit", "contact": "roh@example.com"},
        "predicted_maintenance": [{"component": "engine_oil", "urgency": 4}],
        "request_time": datetime.now()
    }
]

agent = SchedulerAgent()
assignments = agent.schedule_priority_optimization(requests_data)

print("\n=== FINAL ASSIGNMENTS ===")
for a in assignments:
    print(a)
