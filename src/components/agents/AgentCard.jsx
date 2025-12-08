import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Activity } from 'lucide-react';

export default function AgentCard({ agent, onClick, isActive }) {
    const statusColors = {
        idle: 'bg-white/5 border-white/10 text-[var(--text-secondary)]',
        processing: 'bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_4px_20px_-10px_rgba(59,130,246,0.5)]',
        active: 'bg-green-500/10 border-green-500/30 text-green-400 shadow-[0_4px_20px_-10px_rgba(34,197,94,0.5)]',
        alert: 'bg-red-500/10 border-red-500/30 text-red-400 shadow-[0_4px_20px_-10px_rgba(239,68,68,0.5)]',
        completed: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
    };

    const statusStyle = statusColors[agent.status] || statusColors.idle;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`
                relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer group hover:border-[var(--color-purple)]/30
                ${statusStyle}
            `}
            onClick={() => onClick(agent)}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-black/20 ${agent.status === 'processing' ? 'animate-pulse' : ''}`}>
                    <agent.icon size={24} className="opacity-90" />
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${statusStyle} bg-black/20`}>
                    {agent.status}
                </div>
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[var(--color-purple)] transition-colors">
                {agent.name}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] line-clamp-2 h-10 mb-4">
                {agent.description}
            </p>

            {/* Footer: Last Action & Link */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <Clock size={12} />
                    <span className="truncate max-w-[120px]">
                        {agent.lastAction || "Waiting for task..."}
                    </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[var(--color-purple)] opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                    Details <ArrowRight size={12} />
                </div>
            </div>

            {/* Active Highlight Border */}
            {agent.status === 'processing' && (
                <div className="absolute inset-0 border-2 border-blue-500/20 rounded-2xl animate-pulse pointer-events-none"></div>
            )}
        </motion.div>
    );
}
