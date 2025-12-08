import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Info, AlertTriangle, CheckCircle, XCircle, Terminal,
    Activity, Clock, Hash
} from 'lucide-react';

const AGENT_TAGS = {
    'Data Analysis Agent': { label: 'DATA', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    'Diagnosis Agent': { label: 'DIAGNOSIS', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    'Digital Twin Verification': { label: 'TWIN', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    'Voice Engagement Agent': { label: 'VOICE', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    'Scheduling Agent': { label: 'SCHEDULER', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
    'Manufacturing Insights': { label: 'MFG', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
    'Feedback Agent': { label: 'FEEDBACK', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
    'UEBA Security Agent': { label: 'UEBA', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    'System': { label: 'SYSTEM', color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20' }
};

const LOG_ICONS = {
    'text-blue-400': Info,
    'text-green-400': CheckCircle,
    'text-amber-400': AlertTriangle,
    'text-red-400': XCircle,
    'text-gray-500': Terminal
};

export default function EventLog({ logs, activeCount = 0, anomalyCount = 0, workflowStatus = 'Idle' }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    return (
        <div className="flex flex-col h-full bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden font-mono text-sm shadow-2xl relative">

            {/* macOS-style Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-card)] border-b border-white/5 z-20">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                    </div>
                    <span className="ml-3 text-xs font-bold text-gray-500 tracking-widest uppercase">Orchestrator.log</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                    <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/5">
                        <Activity size={10} className={activeCount > 0 ? "text-blue-400 animate-pulse" : "text-gray-500"} />
                        {activeCount} Active
                    </span>
                    <span className={`flex items-center gap-1.5 px-2 py-1 rounded border ${anomalyCount > 0 ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-white/5 border-white/5'}`}>
                        <AlertTriangle size={10} />
                        {anomalyCount} Anomalies
                    </span>
                </div>
            </div>

            {/* Content Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar relative">

                {/* Workflow Status Header (Sticky-ish) */}
                {workflowStatus !== 'Idle' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="sticky top-0 z-10 mb-6 mx-auto text-center"
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs text-blue-300 backdrop-blur-md">
                            <Clock size={10} className="animate-spin" />
                            Running Workflow: {workflowStatus}
                        </span>
                    </motion.div>
                )}

                <AnimatePresence initial={false}>
                    {logs.map((log) => {
                        const tagValues = AGENT_TAGS[log.agent] || AGENT_TAGS['System'];
                        const Icon = LOG_ICONS[log.color] || Info;

                        return (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: -20, height: 0 }}
                                animate={{ opacity: 1, x: 0, height: 'auto' }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="relative pl-3 group"
                            >
                                {/* Severity Bar */}
                                <div className={`absolute left-0 top-1 bottom-1 w-[2px] rounded-full ${log.color.replace('text-', 'bg-')}`}></div>

                                <div className="flex items-start gap-3 py-1">
                                    <span className="text-[10px] text-gray-600 font-bold min-w-[55px] pt-1">
                                        {log.timestamp}
                                    </span>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`
                                                text-[9px] font-bold px-1.5 py-0.5 rounded border tracking-wider
                                                ${tagValues.color} ${tagValues.bg} ${tagValues.border}
                                            `}>
                                                [{tagValues.label}]
                                            </span>
                                            {log.color.includes('text-red') && (
                                                <span className="text-[9px] font-bold text-red-500 px-1 rounded bg-red-500/10">ERR</span>
                                            )}
                                        </div>
                                        <div className="text-gray-300 leading-relaxed text-xs opacity-90 group-hover:opacity-100 transition-opacity flex items-start gap-2">
                                            <Icon size={12} className={`mt-0.5 shrink-0 opacity-70 ${log.color}`} />
                                            {log.message}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
                <div ref={bottomRef} className="h-1" />
            </div>
        </div>
    );
}
