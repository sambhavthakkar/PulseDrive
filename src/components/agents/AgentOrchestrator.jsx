import React, { useState, useEffect, useRef } from 'react';
import ScenarioPanel from './ScenarioPanel';
import AgentPipeline from './AgentPipeline';
import AgentDrawer from './AgentDrawer';
import EventLog from './EventLog';
import { mockBackend } from '../../services/mockAgentBackend';
import { Activity } from 'lucide-react';

const INITIAL_PIPELINE = [
    { name: 'Data Analysis Agent', status: 'idle', lastLog: 'Ready' },
    { name: 'Diagnosis Agent', status: 'idle', lastLog: 'Ready' },
    { name: 'Digital Twin Verification', status: 'idle', lastLog: 'Ready' },
    { name: 'Voice Engagement Agent', status: 'idle', lastLog: 'Ready' },
    { name: 'Scheduling Agent', status: 'idle', lastLog: 'Ready' },
    { name: 'Manufacturing Insights', status: 'idle', lastLog: 'Ready' },
    { name: 'Feedback Agent', status: 'idle', lastLog: 'Ready' },
    { name: 'UEBA Security Agent', status: 'idle', lastLog: 'Active & Monitoring' },
];

export default function AgentOrchestrator() {
    const [pipeline, setPipeline] = useState(INITIAL_PIPELINE);
    const [logs, setLogs] = useState([]);
    const [activeScenario, setActiveScenario] = useState(null);
    const [selectedAgent, setSelectedAgent] = useState(null);

    useEffect(() => {
        // Subscribe to Mock Backend (simulating FastAPI SSE)
        const unsubscribe = mockBackend.subscribe((event) => {
            // 1. Add Log
            const newLog = {
                id: Date.now() + Math.random(),
                timestamp: new Date(event.timestamp).toLocaleTimeString('en-US', { hour12: false }),
                agent: event.agent,
                message: event.message,
                color: event.status === 'alert' ? 'text-red-400' :
                    event.status === 'running' ? 'text-blue-400' :
                        event.agent === 'System' ? 'text-gray-500' : 'text-green-400'
            };
            setLogs(prev => [...prev.slice(-49), newLog]);

            // 2. Update Pipeline Status
            if (event.type !== 'system') {
                setPipeline(prev => prev.map(step => {
                    if (step.name === event.agent) {
                        return {
                            ...step,
                            status: event.status,
                            lastLog: event.message
                        };
                    }
                    return step;
                }));
            }

            // 3. Handle System Events (Reset/Complete)
            if (event.status === 'completed' && event.agent === 'System') {
                setActiveScenario(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleStartScenario = async (id) => {
        setActiveScenario(id);
        setLogs([]); // Clear logs on start
        setPipeline(INITIAL_PIPELINE.map(p => ({ ...p, status: 'idle', lastLog: 'Waiting...' }))); // Reset pipeline

        // Mark UEBA as running/monitoring always
        setPipeline(prev => prev.map(p => p.name === 'UEBA Security Agent' ? { ...p, status: 'idle', lastLog: 'Monitoring...' } : p));

        await mockBackend.startWorkflow(id);
    };

    return (
        <div className="flex h-[calc(100vh-140px)] gap-6 relative">

            {/* LEFT: Controls (20%) */}
            <div className="w-[280px] shrink-0">
                <ScenarioPanel
                    activeScenario={activeScenario}
                    onStartScenario={handleStartScenario}
                />
            </div>

            {/* CENTER: Pipeline (40%) */}
            <div className="flex-1">
                <AgentPipeline
                    steps={pipeline}
                    onStepClick={setSelectedAgent}
                />
            </div>

            {/* RIGHT: Live Logs (30%) */}
            <div className="w-[400px] shrink-0 h-full">
                <EventLog
                    logs={logs}
                    activeCount={pipeline.filter(p => p.status === 'running').length}
                    anomalyCount={logs.filter(l => l.color.includes('red')).length}
                    workflowStatus={activeScenario ? activeScenario.replace(/-/g, ' ').toUpperCase() : 'Idle'}
                />
            </div>

            {/* DRAWER */}
            <AgentDrawer
                agent={selectedAgent}
                onClose={() => setSelectedAgent(null)}
            />
        </div>
    );
}
