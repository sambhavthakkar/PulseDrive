# Pulse Drive Backend

FastAPI backend for the Pulse Drive autonomous predictive maintenance platform.

## Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

## Run

```bash
uvicorn main:app --reload --port 8000
```

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/telematics/ingest` | POST | Ingest vehicle telemetry |
| `/api/diagnostics/run` | POST | Run predictive diagnosis |
| `/api/scheduling/find-slots` | GET | Get available slots |
| `/api/scheduling/confirm` | POST | Confirm appointment |
| `/api/feedback/submit` | POST | Submit user feedback |
| `/api/voice/transcribe` | POST | Voice to text |
| `/api/agents/events` | WS | Live agent event stream |
| `/api/ueba/logs` | GET | Security audit logs |
| `/api/dashboard/stats` | GET | Dashboard metrics |
