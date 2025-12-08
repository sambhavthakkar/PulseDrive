import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Workflow, Clock, Terminal } from 'lucide-react';

export default function AgentDrawer({ agent, onClose }) {
    return (
        <AnimatePresence>
            {agent && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-[450px] bg-[var(--bg-card)] border-l border-white/10 shadow-2xl z-50 flex flex-col pt-20"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-white mb-1">{agent.name}</h2>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    Operational ID: {agent.name.toUpperCase().replace(/\s/g, '_')}
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">

                            {/* Description */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3 flex items-center gap-2">
                                    <Activity size={14} /> Agent Role
                                </h3>
                                <p className="text-sm text-gray-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                                    Responsible for real-time processing of data inputs defined in the active workflow. Monitors signals and emits alerts to the Message Broker (FastAPI).
                                </p>
                            </div>

                            {/* IO Specs */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3 flex items-center gap-2">
                                    <Workflow size={14} /> Interface Spec
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                                        <div className="text-[10px] text-gray-500 uppercase mb-1">Inputs</div>
                                        <div className="text-xs font-mono text-blue-400 max-w-full truncate">topic/sensors/telemetry</div>
                                    </div>
                                    <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                                        <div className="text-[10px] text-gray-500 uppercase mb-1">Outputs</div>
                                        <div className="text-xs font-mono text-green-400 max-w-full truncate">topic/analysis/result</div>
                                    </div>
                                </div>
                            </div>

                            {/* Console History */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3 flex items-center gap-2">
                                    <Terminal size={14} /> Recent Events
                                </h3>
                                <div className="bg-black/40 rounded-xl border border-white/5 p-4 font-mono text-xs space-y-2">
                                    <div className="flex gap-3 text-gray-400">
                                        <span className="opacity-50">[12:04:01]</span>
                                        <span>INIT_PROCESS: PID 4921</span>
                                    </div>
                                    <div className="flex gap-3 text-gray-400">
                                        <span className="opacity-50">[12:04:02]</span>
                                        <span>CONNECT: Broker 192.168.1.10... OK</span>
                                    </div>
                                    <div className="flex gap-3 text-white">
                                        <span className="opacity-50 text-gray-500">[12:04:05]</span>
                                        <span>MSG_RCV: "Telemetry Batch A1"</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
