import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play, AlertTriangle, XCircle, Shield, ChevronRight, X,
    Database, Stethoscope, Box, Mic, Calendar, MessageSquare, Factory, ShieldAlert,
    CheckCircle, Clock, Zap, Activity, ArrowRight, Info, AlertCircle
} from 'lucide-react';

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
    { id: 'predictive', name: 'Full Predictive Workflow', icon: Play, color: 'purple', desc: 'Complete maintenance prediction cycle' },
    { id: 'emergency', name: 'Emergency Breakdown', icon: AlertTriangle, color: 'red', desc: 'Urgent roadside assistance flow' },
    { id: 'declined', name: 'User Declined Case', icon: XCircle, color: 'gray', desc: 'Handle user rejection gracefully' },
    { id: 'ueba', name: 'UEBA Threat Simulation', icon: Shield, color: 'amber', desc: 'Security threat detection demo' },
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
        // Update event log
        setEvents(prev => [...prev.slice(-50), {
            id: Date.now(),
            time: new Date().toLocaleTimeString(),
            agent: event.agent || 'SYSTEM',
            message: event.message || event.data,
            type: event.type || 'info'
        }]);

        // Update agent state
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

        // Reset all agents to idle
        const resetStates = {};
        AGENTS.forEach(a => { resetStates[a.id] = { status: 'idle', message: 'Awaiting...' }; });
        setAgentStates(resetStates);

        // Try backend first
        try {
            const res = await fetch(`http://localhost:8000/api/agents/trigger`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ scenario: scenario.id })
            });
            if (res.ok) return; // Events will come via WebSocket
        } catch { /* Fallback to simulation */ }

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
        <div className="h-full flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Agent Orchestrator Console</h1>
                    <p className="text-sm text-[var(--text-secondary)]">Live coordination view of all autonomous agents in Pulse Drive</p>
                </div>
                <div className="flex items-center gap-2">
                    {runningScenario && (
                        <motion.div
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20"
                        >
                            <Activity size={14} className="inline mr-2" />
                            Running...
                        </motion.div>
                    )}
                    <div className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-sm font-medium border border-green-500/20">
                        <CheckCircle size={14} className="inline mr-2" />
                        8 Agents Online
                    </div>
                </div>
            </div>

            {/* Main 3-Column Layout */}
            <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">

                {/* LEFT: Scenario Panel */}
                <div className="col-span-2 flex flex-col gap-3">
                    <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Run Scenario</div>
                    {SCENARIOS.map(scenario => (
                        <motion.button
                            key={scenario.id}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => triggerScenario(scenario)}
                            disabled={runningScenario}
                            className={`p-3 rounded-xl text-left transition-all border ${runningScenario === scenario.id
                                    ? 'bg-[var(--color-purple)]/10 border-[var(--color-purple)]/30'
                                    : 'bg-[var(--bg-glass)] border-[var(--border-light)] hover:border-[var(--color-purple)]/30'
                                } ${runningScenario && runningScenario !== scenario.id ? 'opacity-50' : ''}`}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <scenario.icon size={14} className={`text-${scenario.color}-400`} />
                                <span className="text-xs font-bold text-[var(--text-primary)]">{scenario.name}</span>
                            </div>
                            <p className="text-[10px] text-[var(--text-muted)] leading-tight">{scenario.desc}</p>
                        </motion.button>
                    ))}
                </div>

                {/* CENTER: Vertical Agent Pipeline */}
                <div className="col-span-5 flex flex-col gap-2 overflow-y-auto pr-2">
                    <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Agent Pipeline</div>
                    {AGENTS.map((agent, i) => {
                        const state = agentStates[agent.id] || { status: 'idle', message: 'Awaiting...' };
                        return (
                            <motion.div
                                key={agent.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <AgentCard
                                    agent={agent}
                                    state={state}
                                    index={i + 1}
                                    onClick={() => setSelectedAgent(agent)}
                                    isLast={i === AGENTS.length - 1}
                                />
                            </motion.div>
                        );
                    })}
                </div>

                {/* RIGHT: Live Event Stream */}
                <div className="col-span-5 flex flex-col bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] overflow-hidden">
                    <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2">
                            <Activity size={14} className="text-[var(--color-purple)]" />
                            <span className="text-sm font-bold text-[var(--text-primary)]">Agent Event Stream</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[10px] text-green-400 font-medium">LIVE</span>
                        </div>
                    </div>
                    <div ref={eventLogRef} className="flex-1 overflow-y-auto p-3 space-y-1.5" style={{ scrollbarWidth: 'thin' }}>
                        {events.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-[var(--text-muted)] text-sm">
                                <div className="text-center">
                                    <Zap size={24} className="mx-auto mb-2 opacity-30" />
                                    <p>Select a scenario to start</p>
                                </div>
                            </div>
                        ) : (
                            events.map(event => <EventLogEntry key={event.id} event={event} />)
                        )}
                    </div>
                </div>
            </div>

            {/* Slide-In Agent Details Drawer */}
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

// Agent Card Component
const AgentCard = ({ agent, state, index, onClick, isLast }) => {
    const statusStyles = {
        idle: 'border-[var(--border-light)] bg-[var(--bg-glass)]',
        running: 'border-blue-500/40 bg-blue-500/5 shadow-[0_0_15px_rgba(59,130,246,0.15)]',
        completed: 'border-green-500/40 bg-green-500/5',
        alert: 'border-red-500/40 bg-red-500/5 animate-pulse',
    };

    const statusIcons = {
        idle: <Clock size={14} className="text-[var(--text-muted)]" />,
        running: <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><Activity size={14} className="text-blue-400" /></motion.div>,
        completed: <CheckCircle size={14} className="text-green-400" />,
        alert: <AlertTriangle size={14} className="text-red-400" />,
    };

    return (
        <div className="relative">
            <motion.div
                whileHover={{ scale: 1.01, x: 4 }}
                onClick={onClick}
                className={`p-3 rounded-xl cursor-pointer transition-all border ${statusStyles[state.status]}`}
            >
                <div className="flex items-center gap-3">
                    {/* Step Number */}
                    <div className="w-6 h-6 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[10px] font-bold text-[var(--text-muted)]">
                        {index}
                    </div>

                    {/* Agent Icon */}
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${agent.color}15` }}>
                        <agent.icon size={16} style={{ color: agent.color }} />
                    </div>

                    {/* Agent Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[var(--text-primary)]">{agent.name}</span>
                            {statusIcons[state.status]}
                        </div>
                        <p className="text-[10px] text-[var(--text-muted)] truncate">{state.message}</p>
                    </div>

                    {/* Arrow */}
                    <ChevronRight size={14} className="text-[var(--text-muted)]" />
                </div>
            </motion.div>

            {/* Connector Line */}
            {!isLast && (
                <div className="absolute left-[22px] top-full w-0.5 h-2 bg-[var(--border-light)]"></div>
            )}
        </div>
    );
};

// Event Log Entry Component
const EventLogEntry = ({ event }) => {
    const agentInfo = AGENTS.find(a => a.id === event.agent.toLowerCase()) || { color: '#888', icon: Info };
    const typeStyles = {
        info: 'border-l-blue-500',
        warning: 'border-l-amber-500',
        error: 'border-l-red-500',
        success: 'border-l-green-500',
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-start gap-2 p-2 rounded-lg bg-[var(--bg-glass)] border-l-2 ${typeStyles[event.type] || typeStyles.info}`}
        >
            <span className="text-[10px] text-[var(--text-muted)] font-mono shrink-0 pt-0.5">{event.time}</span>
            <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0"
                style={{ backgroundColor: `${agentInfo.color}20`, color: agentInfo.color }}
            >
                {event.agent}
            </span>
            <span className="text-xs text-[var(--text-primary)] flex-1">{event.message}</span>
        </motion.div>
    );
};

// Agent Details Drawer
const AgentDrawer = ({ agent, state, events, onClose }) => {
    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Drawer */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-96 bg-[var(--bg-card)] border-l border-[var(--border-color)] z-50 flex flex-col"
            >
                {/* Header */}
                <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${agent.color}15` }}>
                            <agent.icon size={20} style={{ color: agent.color }} />
                        </div>
                        <div>
                            <h3 className="font-bold text-[var(--text-primary)]">{agent.name}</h3>
                            <p className="text-xs text-[var(--text-muted)]">{agent.desc}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--bg-glass)]">
                        <X size={18} className="text-[var(--text-muted)]" />
                    </button>
                </div>

                {/* Status */}
                <div className="p-4 border-b border-[var(--border-color)]">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-[var(--text-muted)] uppercase">Current Status</span>
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${state?.status === 'running' ? 'bg-blue-500/10 text-blue-400' :
                                state?.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                                    state?.status === 'alert' ? 'bg-red-500/10 text-red-400' :
                                        'bg-gray-500/10 text-gray-400'
                            }`}>
                            {state?.status || 'Idle'}
                        </span>
                    </div>
                    <p className="text-sm text-[var(--text-primary)]">{state?.message || 'Awaiting trigger...'}</p>
                </div>

                {/* Workflow Flow */}
                <div className="p-4 border-b border-[var(--border-color)]">
                    <div className="text-xs text-[var(--text-muted)] uppercase mb-3">Data Flow</div>
                    <div className="flex items-center justify-between text-xs">
                        <div className="p-2 rounded-lg bg-[var(--bg-glass)] text-center flex-1">
                            <div className="text-[var(--text-muted)]">Receives</div>
                            <div className="text-[var(--text-primary)] font-medium">Events</div>
                        </div>
                        <ArrowRight size={14} className="text-[var(--text-muted)] mx-2" />
                        <div className="p-2 rounded-lg bg-[var(--color-purple)]/10 text-center flex-1">
                            <div className="text-[var(--text-muted)]">Processes</div>
                            <div className="text-[var(--color-purple)] font-medium">Analysis</div>
                        </div>
                        <ArrowRight size={14} className="text-[var(--text-muted)] mx-2" />
                        <div className="p-2 rounded-lg bg-[var(--bg-glass)] text-center flex-1">
                            <div className="text-[var(--text-muted)]">Outputs</div>
                            <div className="text-[var(--text-primary)] font-medium">Actions</div>
                        </div>
                    </div>
                </div>

                {/* Recent Events */}
                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="text-xs text-[var(--text-muted)] uppercase mb-3">Recent Events ({events.length})</div>
                    <div className="space-y-2">
                        {events.slice(-10).map(e => (
                            <div key={e.id} className="p-2 rounded-lg bg-[var(--bg-glass)] text-xs">
                                <span className="text-[var(--text-muted)] font-mono">{e.time}</span>
                                <span className="text-[var(--text-primary)] ml-2">{e.message}</span>
                            </div>
                        ))}
                        {events.length === 0 && (
                            <p className="text-[var(--text-muted)] text-xs">No events yet</p>
                        )}
                    </div>
                </div>
            </motion.div>
        </>
    );
};
