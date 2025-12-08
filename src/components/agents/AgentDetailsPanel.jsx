import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Server, Clock, GitCommit, AlertTriangle, Layers } from 'lucide-react';

export default function AgentDetailsPanel({ agent, onClose }) {
    if (!agent) return null;

    const getStatusColor = (s) => {
        if (s === 'alert') return 'text-red-400 bg-red-500/10 border-red-500/20';
        if (s === 'processing') return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
        if (s === 'active') return 'text-green-400 bg-green-500/10 border-green-500/20';
        return 'text-gray-400 bg-white/5 border-white/10';
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute top-0 right-0 h-full w-96 bg-[var(--bg-card)]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-start bg-[var(--color-primary-dark)]/50">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg ${getStatusColor(agent.status)}`}>
                                <agent.icon size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-white">{agent.name}</h2>
                        </div>
                        <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider border ${getStatusColor(agent.status)}`}>
                            {agent.status}
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

                    {/* Role Description */}
                    <div className="space-y-3">
                        <h3 className="text-sm uppercase tracking-wider text-[var(--color-text-secondary)] font-bold flex items-center gap-2">
                            <Layers size={14} /> Agent Role
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                            {agent.description || "Orchestrates sub-tasks and manages communication flow between dependent agents."}
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                            <div className="text-[var(--color-text-muted)] text-xs mb-1">Tasks Processed</div>
                            <div className="text-2xl font-mono text-white">1,248</div>
                        </div>
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                            <div className="text-[var(--color-text-muted)] text-xs mb-1">Uptime</div>
                            <div className="text-2xl font-mono text-green-400">99.9%</div>
                        </div>
                    </div>

                    {/* Current Activity */}
                    <div className="space-y-3">
                        <h3 className="text-sm uppercase tracking-wider text-[var(--color-text-secondary)] font-bold flex items-center gap-2">
                            <Activity size={14} /> Live Activity
                        </h3>
                        <div className="space-y-2">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex gap-3 text-xs p-3 rounded-lg bg-white/5 border border-white/5">
                                    <Clock size={14} className="text-[var(--text-muted)] shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-gray-300">Syncing data with Master Orchestrator...</div>
                                        <div className="text-[var(--text-muted)] mt-1 opacity-60">12:4{i}:05 PM</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dependencies */}
                    <div className="space-y-3">
                        <h3 className="text-sm uppercase tracking-wider text-[var(--color-text-secondary)] font-bold flex items-center gap-2">
                            <GitCommit size={14} /> Dependencies
                        </h3>
                        <div className="flex flex-wrap gap-2 text-xs">
                            {['Master Orchestrator', 'Data Lake', 'Event Bus'].map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-gray-400 border border-white/10">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-white/10 bg-[var(--bg-card)]">
                    <button className="w-full py-3 bg-[var(--color-purple)] hover:bg-[var(--color-purple)]/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/20 active:scale-95 flex items-center justify-center gap-2">
                        <Server size={18} />
                        View Full Logs
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
