"""
Pulse Drive Backend - FastAPI Entry Point
==========================================
Main application server for the autonomous predictive maintenance platform.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

# Import routers
from routers import telematics, diagnostics, scheduling, feedback, voice, agents, ueba, dashboard

app = FastAPI(
    title="Pulse Drive API",
    description="Backend for autonomous predictive vehicle maintenance",
    version="1.0.0",
)

# CORS Middleware for React frontend - Allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=False,  # Must be False when allow_origins is "*"
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Register routers
app.include_router(telematics.router, prefix="/api/telematics", tags=["Telematics"])
app.include_router(diagnostics.router, prefix="/api/diagnostics", tags=["Diagnostics"])
app.include_router(scheduling.router, prefix="/api/scheduling", tags=["Scheduling"])
app.include_router(feedback.router, prefix="/api/feedback", tags=["Feedback"])
app.include_router(voice.router, prefix="/api/voice", tags=["Voice"])
app.include_router(agents.router, prefix="/api/agents", tags=["Agents"])
app.include_router(ueba.router, prefix="/api/ueba", tags=["UEBA"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])


@app.get("/")
async def root():
    return {
        "service": "Pulse Drive API",
        "status": "operational",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
