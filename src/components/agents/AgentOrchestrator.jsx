import React, { useState, useEffect } from 'react';
import AgentNode from './AgentNode';
import EventLog from './EventLog';
import {
    Activity, Zap, MessageSquare, Calendar, ShieldCheck
} from 'lucide-react';
import { mockApi } from '../../services/api';

const INITIAL_AGENTS = [
    { id: 'master', name: 'Master Orchestrator', icon: Activity, x: '50%', y: '10%' },
    { id: 'diagnosis', name: 'Diagnosis Agent', icon: Zap, x: '20%', y: '40%' },
    { id: 'voice', name: 'Voice Agent', icon: MessageSquare, x: '80%', y: '40%' },
    { id: 'schedule', name: 'Scheduling Agent', icon: Calendar, x: '35%', y: '70%' },
    { id: 'security', name: 'UEBA Security', icon: ShieldCheck, x: '65%', y: '70%' },
];

export default function AgentOrchestrator() {
    const [agents, setAgents] = useState(INITIAL_AGENTS.map(a => ({ ...a, status: 'idle' })));
    const [logs, setLogs] = useState([]);

    const addLog = (agent, message, color) => {
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
        const id = Date.now() + Math.random();
        setLogs(prev => [...prev.slice(-19), { id, timestamp, agent, message, color }]);
    };

    // Poll for random background events
    useEffect(() => {
        const interval = setInterval(async () => {
            // 30% chance to generate a random event every 3 seconds
            if (Math.random() > 0.7) {
                const event = await mockApi.getAgentEvents();
                addLog(event.agent, event.message, event.severity === 'critical' ? 'text-red-400' : 'text-[var(--color-text-secondary)]');

                // Briefly animate the agent
                const agentId = event.agent.toLowerCase().includes('diagnosis') ? 'diagnosis' :
                    event.agent.toLowerCase().includes('voice') ? 'voice' :
                        event.agent.toLowerCase().includes('schedule') ? 'schedule' :
                            event.agent.toLowerCase().includes('security') ? 'security' : 'master';

                setAgents(prev => prev.map(a => a.id === agentId ? { ...a, status: 'processing' } : a));
                setTimeout(() => {
                    setAgents(prev => prev.map(a => a.id === agentId ? { ...a, status: 'idle' } : a));
                }, 1500);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleAgentClick = (id) => {
        // Reset statuses
        setAgents(prev => prev.map(a => ({
            ...a,
            status: a.id === id ? 'active' : (a.id === 'master' ? 'processing' : 'idle')
        })));

        // Simulate Agent Interaction Flow
        const agentName = agents.find(a => a.id === id).name;

        // Step 1: Trigger
        addLog('System', `User manual trigger: ${agentName}`, 'text-blue-400');
        addLog('Master Orchestrator', `Routing request to ${agentName}...`, 'text-[var(--color-primary)]');

        // Step 2: Response (Delayed)
        setTimeout(() => {
            const responses = {
                diagnosis: "Analyzing telemetry... Anomaly detected in Brake Fluid lines.",
                voice: "Voice command received. Parsing natural language intent.",
                schedule: "Checking service center availability for ZIP 94103.",
                security: "Scanning user behavior patterns. Authentication Score: 98/100.",
                master: "System integrity check complete. All subsystems nominal."
            };

            addLog(agentName, responses[id] || "Processing task...", 'text-white');

            // Reset to idle after processing
            setTimeout(() => {
                setAgents(prev => prev.map(a => ({ ...a, status: 'idle' })));
                addLog('Master Orchestrator', `Task completed for ${agentName}.`, 'text-green-400');
            }, 2000);
        }, 800);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
            {/* Visual Interactive Area */}
            <div className="lg:col-span-2 bg-[var(--color-primary-dark)] rounded-2xl relative overflow-hidden p-8 border border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--color-primary)]/5 via-transparent to-transparent"></div>

                {/* Connection Lines (SVG) - Simple Star Topology */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                    <line x1="50%" y1="18%" x2="25%" y2="48%" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="50%" y1="18%" x2="75%" y2="48%" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="50%" y1="18%" x2="40%" y2="78%" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="50%" y1="18%" x2="60%" y2="78%" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                </svg>

                {agents.map(agent => (
                    <AgentNode
                        key={agent.id}
                        {...agent}
                        // Convert percentage strings to calc for centered positioning
                        x={`calc(${agent.x} - 4rem)`}
                        y={`calc(${agent.y} - 4rem)`}
                        onClick={handleAgentClick}
                    />
                ))}
            </div>

            {/* Event Log Panel */}
            <div className="h-full">
                <div className="h-full flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Activity className="text-[var(--color-primary)]" />
                        Live Event Stream
                    </h3>
                    <EventLog logs={logs} />
                </div>
            </div>
        </div>
    );
}
