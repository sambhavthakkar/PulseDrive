"""
Master Orchestrator Service
============================
Coordinates the multi-agent workflow for predictive maintenance.

Workflow:
1. Data Analysis Agent → Ingest & normalize telemetry
2. Diagnosis Agent → Predict failures
3. Digital Twin → Verify predictions
4. Voice Agent → Notify user
5. Scheduling Agent → Book appointment
6. Feedback Agent → Collect rating
7. Manufacturing Agent → Report insights
8. UEBA Agent → Monitor all agents
"""

from typing import List, Dict, Any, Callable, Optional
from datetime import datetime
import asyncio


class AgentEvent:
    """Represents an event emitted by an agent."""
    def __init__(
        self,
        agent_id: str,
        agent_name: str,
        status: str,
        message: str,
        event_type: str = "info"
    ):
        self.timestamp = datetime.now().isoformat()
        self.agent_id = agent_id
        self.agent_name = agent_name
        self.status = status
        self.message = message
        self.event_type = event_type

    def to_dict(self) -> dict:
        return {
            "timestamp": self.timestamp,
            "agent": self.agent_name,
            "agent_id": self.agent_id,
            "status": self.status,
            "message": self.message,
            "type": self.event_type
        }


class MasterOrchestrator:
    """
    Orchestrates the multi-agent workflow.
    Broadcasts events via registered callbacks (WebSocket).
    """
    
    def __init__(self):
        self.event_callbacks: List[Callable] = []
        self.active_workflow: Optional[str] = None
        self.workflow_history: List[dict] = []
        
        # Agent definitions
        self.agents = {
            "data_analysis": {"name": "Data Analysis Agent", "order": 1},
            "diagnosis": {"name": "Diagnosis Agent", "order": 2},
            "digital_twin": {"name": "Digital Twin Verification", "order": 3},
            "voice": {"name": "Voice Engagement Agent", "order": 4},
            "scheduling": {"name": "Scheduling Agent", "order": 5},
            "feedback": {"name": "Feedback Agent", "order": 6},
            "manufacturing": {"name": "Manufacturing Insights", "order": 7},
            "ueba": {"name": "UEBA Security Agent", "order": 8},
        }
    
    def register_callback(self, callback: Callable):
        """Register a callback for event notifications."""
        self.event_callbacks.append(callback)
    
    def unregister_callback(self, callback: Callable):
        """Unregister a callback."""
        self.event_callbacks = [cb for cb in self.event_callbacks if cb != callback]
    
    async def emit_event(self, event: AgentEvent):
        """Emit an event to all registered callbacks."""
        event_dict = event.to_dict()
        self.workflow_history.append(event_dict)
        
        for callback in self.event_callbacks:
            try:
                if asyncio.iscoroutinefunction(callback):
                    await callback(event_dict)
                else:
                    callback(event_dict)
            except Exception as e:
                print(f"[Orchestrator] Callback error: {e}")
    
    async def run_predictive_workflow(self, vehicle_id: str):
        """
        Execute the full predictive maintenance workflow.
        """
        self.active_workflow = f"predictive-{vehicle_id}"
        
        # Workflow start event
        await self.emit_event(AgentEvent(
            agent_id="system",
            agent_name="System",
            status="running",
            message=f"Starting predictive workflow for vehicle {vehicle_id}",
            event_type="workflow_start"
        ))
        
        # Execute agent sequence
        sequence = [
            ("data_analysis", "Ingesting telemetry stream...", "Data normalized. 1.2GB processed."),
            ("diagnosis", "Running predictive models...", "Brake pad wear detected (12%). Risk score: 42/100."),
            ("digital_twin", "Simulating load parameters...", "Wear pattern CONFIRMED by physics model."),
            ("voice", "Drafting driver notification...", "Driver notified: 'Service recommended'."),
            ("scheduling", "Querying service centers...", "Slot available: Tomorrow 10AM."),
            ("ueba", "Monitoring process integrity...", "Security check passed. No anomalies."),
        ]
        
        for agent_id, start_msg, complete_msg in sequence:
            agent = self.agents.get(agent_id, {"name": agent_id})
            
            # Agent starting
            await self.emit_event(AgentEvent(
                agent_id=agent_id,
                agent_name=agent["name"],
                status="running",
                message=start_msg,
                event_type="agent_start"
            ))
            
            # Simulate processing time
            await asyncio.sleep(1.5)
            
            # Agent complete
            await self.emit_event(AgentEvent(
                agent_id=agent_id,
                agent_name=agent["name"],
                status="completed",
                message=complete_msg,
                event_type="agent_complete"
            ))
            
            await asyncio.sleep(0.3)
        
        # Workflow complete
        await self.emit_event(AgentEvent(
            agent_id="system",
            agent_name="System",
            status="completed",
            message=f"Predictive workflow completed for vehicle {vehicle_id}",
            event_type="workflow_complete"
        ))
        
        self.active_workflow = None
    
    async def run_emergency_workflow(self, vehicle_id: str, alert_type: str):
        """
        Execute emergency/critical workflow.
        """
        self.active_workflow = f"emergency-{vehicle_id}"
        
        await self.emit_event(AgentEvent(
            agent_id="system",
            agent_name="System",
            status="alert",
            message=f"EMERGENCY: {alert_type} detected for {vehicle_id}",
            event_type="workflow_start"
        ))
        
        sequence = [
            ("data_analysis", "Emergency telemetry capture...", "Critical flag from ECU received."),
            ("diagnosis", "Isolating fault...", f"CRITICAL: {alert_type}"),
            ("voice", "Emergency override active...", "Emergency services notified."),
            ("ueba", "Verifying command origin...", "Command authenticated. Emergency protocol active."),
        ]
        
        for agent_id, start_msg, complete_msg in sequence:
            agent = self.agents.get(agent_id, {"name": agent_id})
            
            await self.emit_event(AgentEvent(
                agent_id=agent_id,
                agent_name=agent["name"],
                status="running",
                message=start_msg,
                event_type="agent_start"
            ))
            
            await asyncio.sleep(0.8)
            
            is_critical = "CRITICAL" in complete_msg
            await self.emit_event(AgentEvent(
                agent_id=agent_id,
                agent_name=agent["name"],
                status="alert" if is_critical else "completed",
                message=complete_msg,
                event_type="agent_alert" if is_critical else "agent_complete"
            ))
        
        await self.emit_event(AgentEvent(
            agent_id="system",
            agent_name="System",
            status="completed",
            message="Emergency workflow executed.",
            event_type="workflow_complete"
        ))
        
        self.active_workflow = None
    
    def get_agent_status(self) -> List[dict]:
        """Get current status of all agents."""
        return [
            {
                "agent_id": agent_id,
                "name": info["name"],
                "status": "running" if self.active_workflow else "idle",
                "order": info["order"]
            }
            for agent_id, info in self.agents.items()
        ]


# Singleton instance
orchestrator = MasterOrchestrator()
