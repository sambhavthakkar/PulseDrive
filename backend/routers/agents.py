"""
Agents Router
=============
Handles agent orchestration and real-time event streaming.
"""

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import asyncio
import json

router = APIRouter()


class AgentStatus(BaseModel):
    agent_id: str
    name: str
    status: str  # idle, running, completed, error
    last_activity: str
    message: Optional[str] = None


class WorkflowTrigger(BaseModel):
    workflow_id: str
    vehicle_id: Optional[str] = None
    params: Optional[dict] = None


# Agent registry
AGENTS = [
    {"id": "data_analysis", "name": "Data Analysis Agent"},
    {"id": "diagnosis", "name": "Diagnosis Agent"},
    {"id": "digital_twin", "name": "Digital Twin Verification"},
    {"id": "voice", "name": "Voice Engagement Agent"},
    {"id": "scheduling", "name": "Scheduling Agent"},
    {"id": "feedback", "name": "Feedback Agent"},
    {"id": "manufacturing", "name": "Manufacturing Insights"},
    {"id": "ueba", "name": "UEBA Security Agent"},
]

# Connected WebSocket clients
active_connections: List[WebSocket] = []


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except:
                pass


manager = ConnectionManager()


@router.get("/status", response_model=List[AgentStatus])
async def get_all_agent_status():
    """Get status of all agents."""
    return [
        AgentStatus(
            agent_id=a["id"],
            name=a["name"],
            status="idle",
            last_activity=datetime.now().isoformat(),
            message="Standing by"
        )
        for a in AGENTS
    ]


@router.post("/trigger")
async def trigger_workflow(trigger: WorkflowTrigger):
    """
    Trigger an agent workflow.
    This starts the orchestration pipeline.
    """
    # Broadcast workflow start
    await manager.broadcast({
        "timestamp": datetime.now().isoformat(),
        "type": "workflow_start",
        "workflow_id": trigger.workflow_id,
        "message": f"Workflow '{trigger.workflow_id}' initiated"
    })
    
    # Simulate agent sequence (in production, this would be actual orchestration)
    asyncio.create_task(run_simulated_workflow(trigger.workflow_id))
    
    return {"status": "started", "workflow_id": trigger.workflow_id}


from services.data_analysis_agent import data_analysis_agent

@router.post("/analyze")
async def run_analysis():
    """
    Trigger the Data Analysis Agent to process vehicle data.
    """
    report = data_analysis_agent.analyze()
    
    # Broadcast completion event
    await manager.broadcast({
        "timestamp": datetime.now().isoformat(),
        "type": "agent_complete",
        "agent": "data_analysis",
        "status": "completed",
        "message": f"Analysis complete. Processed {len(report)} vehicles."
    })
    
    return {"status": "success", "report": report}


async def run_simulated_workflow(workflow_id: str):
    """Simulate a multi-agent workflow with events."""
    # ... (rest of the function remains same)
    sequence = [
        ("data_analysis", "Ingesting telemetry stream...", "Data normalized. No errors."),
        ("diagnosis", "Running predictive models...", "Analysis complete. Risk score: 42/100"),
        ("digital_twin", "Simulating load parameters...", "Simulation PASSED."),
        ("voice", "Formulating notification...", "Driver notified via App."),
        ("scheduling", "Querying service centers...", "Slots retrieved. Appointment ready."),
        ("ueba", "Scanning behavior patterns...", "No anomalies detected."),
    ]
    
    for agent_id, start_msg, complete_msg in sequence:
        # Agent starting
        await manager.broadcast({
            "timestamp": datetime.now().isoformat(),
            "type": "agent_start",
            "agent": agent_id,
            "status": "running",
            "message": start_msg
        })
        
        # If it's the data analysis step, actually run the analysis logic briefly
        if agent_id == "data_analysis":
             # We can run it here to simulate real work, but for now just sleep
             pass

        await asyncio.sleep(1.5)  # Simulate processing
        
        # Agent complete
        await manager.broadcast({
            "timestamp": datetime.now().isoformat(),
            "type": "agent_complete",
            "agent": agent_id,
            "status": "completed",
            "message": complete_msg
        })
        
        await asyncio.sleep(0.5)
    
    # Workflow complete
    await manager.broadcast({
        "timestamp": datetime.now().isoformat(),
        "type": "workflow_complete",
        "workflow_id": workflow_id,
        "status": "completed",
        "message": f"Workflow '{workflow_id}' finished successfully."
    })


@router.websocket("/events")
async def websocket_events(websocket: WebSocket):
    """
    WebSocket endpoint for real-time agent events.
    Frontend connects to this for live updates.
    """
    await manager.connect(websocket)
    try:
        # Send initial connection message
        await websocket.send_json({
            "timestamp": datetime.now().isoformat(),
            "type": "connected",
            "message": "Connected to Pulse Drive Agent Events"
        })
        
        # Keep connection alive
        while True:
            try:
                # Wait for any incoming messages (ping/pong)
                data = await asyncio.wait_for(websocket.receive_text(), timeout=30)
                if data == "ping":
                    await websocket.send_text("pong")
            except asyncio.TimeoutError:
                # Send heartbeat
                await websocket.send_json({
                    "timestamp": datetime.now().isoformat(),
                    "type": "heartbeat"
                })
    except WebSocketDisconnect:
        manager.disconnect(websocket)
