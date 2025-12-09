import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play, AlertTriangle, XCircle, Shield, ChevronRight, X,
    Database, Stethoscope, Box, Mic, Calendar, MessageSquare, Factory, ShieldAlert,
    CheckCircle, Clock, Zap, Activity, ArrowRight, Info
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { cn } from '../utils/cn';

// Agent definitions
const AGENTS = [
    { id: 'data', name: 'Data Analysis Agent', icon: Database, color: '#818CF8', desc: 'Ingests real-time telemetry and generates analytical insights' },
    { id: 'diagnosis', name: 'Diagnosis Agent', icon: Stethoscope, color: '#F472B6', desc: 'Runs predictive failure models and identifies anomalies' },
    { id: 'twin', name: 'Digital Twin Verification', icon: Box, color: '#34D399', desc: 'Simulates repairs against vehicle digital twin' },
    { id: 'voice', name: 'Voice Engagement Agent', icon: Mic, color: '#60A5FA', desc: 'Handles conversational AI interactions with users' },
    { id: 'scheduling', name: 'Scheduling Agent', icon: Calendar, color: '#FBBF24', desc: 'Finds optimal service slots and books appointments' },
    { id: 'feedback', name: 'Feedback Agent', icon: MessageSquare, color: '#A78BFA', desc: 'Collects and analyzes customer feedback' },
    { id: 'manufacturing', name: 'Manufacturing Insights', icon: Factory, color: '#F97316', desc: 'Aggregates failure data for OEM insights' },
    { id: 'ueba', name: 'UEBA Security Agent', icon: ShieldAlert, color: '#EF4444', desc: 'Monitors all agent behavior for anomalies' },
];

// Scenarios
const SCENARIOS = [
    { id: 'predictive', name: 'Full Predictive Workflow', icon: Play, color: 'text-[var(--color-primary)]', desc: 'Complete maintenance prediction cycle' },
    { id: 'emergency', name: 'Emergency Breakdown', icon: AlertTriangle, color: 'text-[var(--color-error)]', desc: 'Urgent roadside assistance flow' },
    { id: 'declined', name: 'User Declined Case', icon: XCircle, color: 'text-[var(--text-secondary)]', desc: 'Handle user rejection gracefully' },
    { id: 'ueba', name: 'UEBA Threat Simulation', icon: Shield, color: 'text-[var(--color-warning)]', desc: 'Security threat detection demo' },
];

export default function AgentConsole() {
    const [agentStates, setAgentStates] = useState({});
    const [events, setEvents] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [runningScenario, setRunningScenario] = useState(null);
    const eventLogRef = useRef(null);

    // Initialize agent states
    useEffect(() => {
        const initialStates = {};
        AGENTS.forEach(a => { initialStates[a.id] = { status: 'idle', message: 'Awaiting trigger...' }; });
        setAgentStates(initialStates);
    }, []);

    // Auto-scroll event log
    useEffect(() => {
        if (eventLogRef.current) {
            eventLogRef.current.scrollTop = eventLogRef.current.scrollHeight;
        }
    }, [events]);

    // WebSocket connection for real events
    useEffect(() => {
        const wsUrl = `ws://localhost:8000/api/agents/events`;
        let ws;
        try {
            ws = new WebSocket(wsUrl);
            ws.onmessage = (e) => {
                const event = JSON.parse(e.data);
                handleEvent(event);
            };
            ws.onerror = () => console.log('WebSocket not available, using simulation');
        } catch { /* Fallback to simulation */ }
        return () => ws?.close();
    }, []);

    const handleEvent = (event) => {
        setEvents(prev => [...prev.slice(-50), {
            id: Date.now(),
            time: new Date().toLocaleTimeString(),
            agent: event.agent || 'SYSTEM',
            message: event.message || event.data,
            type: event.type || 'info'
        }]);

        if (event.agent) {
            setAgentStates(prev => ({
                ...prev,
                [event.agent.toLowerCase()]: {
                    status: event.status || 'running',
                    message: event.message || event.data
                }
            }));
        }
    };

    const triggerScenario = async (scenario) => {
        setRunningScenario(scenario.id);
        setEvents([]);

        const resetStates = {};
        AGENTS.forEach(a => { resetStates[a.id] = { status: 'idle', message: 'Awaiting...' }; });
        setAgentStates(resetStates);

        // Simulate workflow
        await simulateWorkflow(scenario);
        setRunningScenario(null);
    };

    const simulateWorkflow = async (scenario) => {
        const steps = [
            { agent: 'data', delay: 500, message: 'Ingesting telemetry data from OBD-II sensors...', status: 'running' },
            { agent: 'data', delay: 1000, message: 'Analysis complete: 3 anomalies detected', status: 'completed' },
            { agent: 'diagnosis', delay: 500, message: 'Running predictive failure model...', status: 'running' },
            { agent: 'diagnosis', delay: 1200, message: 'Brake pad wear detected (86% probability)', status: 'completed', type: 'warning' },
            { agent: 'twin', delay: 500, message: 'Loading vehicle digital twin...', status: 'running' },
            { agent: 'twin', delay: 1000, message: 'Simulation PASSED - repair verified safe', status: 'completed' },
            { agent: 'voice', delay: 500, message: 'Initiating customer engagement...', status: 'running' },
            { agent: 'voice', delay: 1500, message: 'User confirmed: "Yes, schedule service"', status: 'completed' },
            { agent: 'scheduling', delay: 500, message: 'Finding optimal service slots...', status: 'running' },
            { agent: 'scheduling', delay: 1000, message: 'Booked: Dec 20, 10:30 AM @ Hero Pitstop', status: 'completed' },
            { agent: 'feedback', delay: 500, message: 'Preparing feedback collection...', status: 'running' },
            { agent: 'feedback', delay: 800, message: 'Post-service survey scheduled', status: 'completed' },
            { agent: 'manufacturing', delay: 500, message: 'Aggregating failure patterns...', status: 'running' },
            { agent: 'manufacturing', delay: 800, message: 'OEM report updated: Brake batch #2024-B7', status: 'completed' },
            { agent: 'ueba', delay: 500, message: 'Monitoring agent behavior patterns...', status: 'running' },
            { agent: 'ueba', delay: 600, message: 'All agents operating within normal parameters', status: 'completed' },
        ];

        for (const step of steps) {
            await new Promise(r => setTimeout(r, step.delay));
            handleEvent({ agent: step.agent.toUpperCase(), message: step.message, status: step.status, type: step.type || 'info' });
        }
    };

    return (
        <div className="h-full flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="h1 text-[var(--text-primary)]">Agent Orchestrator</h1>
                    <p className="body-reg text-[var(--text-secondary)]">Live coordination of autonomous agents</p>
                </div>
                <div className="flex items-center gap-3">
                    {runningScenario && (
                        <Badge variant="info" className="flex items-center gap-1 px-3 py-1">
                            <Activity size={14} className="animate-spin" />
                            Running Simulation
                        </Badge>
                    )}
                    <Badge variant="success" className="flex items-center gap-2 px-3 py-1">
                        <CheckCircle size={14} />
                        8 Agents Online
                    </Badge>
                </div>
            </div>

            {/* Main Layout */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">

                {/* 1. Scenarios (Left) */}
                <Card noPadding className="lg:col-span-3 flex flex-col h-full bg-[var(--bg-card)]">
                    <div className="p-4 border-b border-[var(--border-subtle)]">
                        <h3 className="h3 text-[var(--text-primary)]">Scenarios</h3>
                    </div>
                    <div className="p-4 space-y-3 flex-1 overflow-y-auto custom-scrollbar">
                        {SCENARIOS.map(scenario => (
                            <button
                                key={scenario.id}
                                onClick={() => triggerScenario(scenario)}
                                disabled={runningScenario}
                                className={cn(
                                    "w-full p-3 rounded-[var(--radius-button)] text-left transition-all border group",
                                    runningScenario === scenario.id
                                        ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)]/30"
                                        : "bg-[var(--bg-elevated)] border-transparent hover:border-[var(--border-strong)] hover:bg-[var(--bg-card-hover)]",
                                    runningScenario && runningScenario !== scenario.id && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <scenario.icon size={16} className={scenario.color} />
                                    <span className="font-bold text-sm text-[var(--text-primary)]">{scenario.name}</span>
                                </div>
                                <p className="text-xs text-[var(--text-secondary)]">{scenario.desc}</p>
                            </button>
                        ))}
                    </div>
                </Card>

                {/* 2. Pipeline (Center) */}
                <Card noPadding className="lg:col-span-5 flex flex-col h-full bg-[var(--bg-card)]">
                    <div className="p-4 border-b border-[var(--border-subtle)]">
                        <h3 className="h3 text-[var(--text-primary)]">Agent Pipeline</h3>
                    </div>
                    <div className="p-4 space-y-2 flex-1 overflow-y-auto custom-scrollbar">
                        {AGENTS.map((agent, i) => (
                            <AgentCard
                                key={agent.id}
                                agent={agent}
                                state={agentStates[agent.id] || { status: 'idle', message: 'Awaiting...' }}
                                index={i + 1}
                                onClick={() => setSelectedAgent(agent)}
                                isLast={i === AGENTS.length - 1}
                            />
                        ))}
                    </div>
                </Card>

                {/* 3. Event Log (Right) */}
                <Card noPadding className="lg:col-span-4 flex flex-col h-full bg-[var(--bg-card)]">
                    <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
                        <h3 className="h3 text-[var(--text-primary)]">Live Events</h3>
                        <Badge variant="outline" className="text-xs font-mono">WS: CONNECTED</Badge>
                    </div>
                    <div ref={eventLogRef} className="p-3 space-y-2 flex-1 overflow-y-auto custom-scrollbar bg-[var(--bg-elevated)]/30">
                        {events.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-[var(--text-muted)] opacity-50">
                                <Zap size={32} className="mb-2" />
                                <p>Waiting for trigger...</p>
                            </div>
                        ) : (
                            events.map(event => <EventLogEntry key={event.id} event={event} />)
                        )}
                    </div>
                </Card>
            </div>

            {/* Agent Drawer Details */}
            <AnimatePresence>
                {selectedAgent && (
                    <AgentDrawer
                        agent={selectedAgent}
                        state={agentStates[selectedAgent.id]}
                        events={events.filter(e => e.agent.toLowerCase() === selectedAgent.id)}
                        onClose={() => setSelectedAgent(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

// Sub-components
const AgentCard = ({ agent, state, index, onClick, isLast }) => {
    const statusClass = {
        idle: 'border-transparent bg-[var(--bg-elevated)] opacity-60',
        running: 'border-[var(--color-info)]/30 bg-[var(--color-info)]/5 shadow-[0_0_15px_rgba(40,132,255,0.1)]',
        completed: 'border-[var(--color-success)]/30 bg-[var(--color-success)]/5',
        alert: 'border-[var(--color-error)]/30 bg-[var(--color-error)]/5 animate-pulse',
    }[state.status] || 'border-transparent';

    return (
        <div className="relative group">
            <div
                onClick={onClick}
                className={cn(
                    "relative z-10 p-3 rounded-[var(--radius-button)] cursor-pointer transition-all border flex items-center gap-3 hover:scale-[1.01]",
                    statusClass
                )}
            >
                <div className="w-6 h-6 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center text-[10px] font-bold text-[var(--text-muted)]">
                    {index}
                </div>
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${agent.color}20`, color: agent.color }}>
                    <agent.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[var(--text-primary)]">{agent.name}</span>
                        {state.status === 'running' && <Activity size={14} className="text-[var(--color-info)] animate-spin" />}
                        {state.status === 'completed' && <CheckCircle size={14} className="text-[var(--color-success)]" />}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] truncate">{state.message}</p>
                </div>
                <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)]" />
            </div>
            {!isLast && <div className="absolute left-[23px] top-full w-0.5 h-2 bg-[var(--border-subtle)] -z-0" />}
        </div>
    );
};

const EventLogEntry = ({ event }) => {
    const agentInfo = AGENTS.find(a => a.id === event.agent.toLowerCase());
    const color = agentInfo ? agentInfo.color : 'var(--text-muted)';

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3 p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors"
        >
            <div className="w-1 bg-current rounded-full shrink-0 opacity-50" style={{ color }} />
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-70" style={{ color }}>{event.agent}</span>
                    <span className="text-[10px] text-[var(--text-muted)] ml-auto">{event.time}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] break-words leading-relaxed">{event.message}</p>
            </div>
        </motion.div>
    );
};

const AgentDrawer = ({ agent, state, events, onClose }) => (
    <>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--bg-card)] border-l border-[var(--border-default)] z-50 flex flex-col shadow-2xl"
        >
            <div className="p-6 border-b border-[var(--border-subtle)] flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: `${agent.color}20`, color: agent.color }}>
                        <agent.icon size={24} />
                    </div>
                    <div>
                        <h2 className="h3 text-[var(--text-primary)]">{agent.name}</h2>
                        <Badge variant="outline" className="mt-1">{state?.status || 'Idle'}</Badge>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}><X size={20} /></Button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
                <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase mb-4">Activity Log</h4>
                <div className="space-y-4">
                    {events.map((e, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-2 h-2 rounded-full bg-[var(--text-muted)]" />
                                <div className="w-px h-full bg-[var(--border-subtle)] my-1" />
                            </div>
                            <div className="pb-4">
                                <div className="text-xs text-[var(--text-muted)] mb-1">{e.time}</div>
                                <p className="text-sm text-[var(--text-primary)]">{e.message}</p>
                            </div>
                        </div>
                    ))}
                    {events.length === 0 && <p className="text-sm text-[var(--text-muted)]">No activity recorded for this session.</p>}
                </div>
            </div>
        </motion.div>
    </>
);
