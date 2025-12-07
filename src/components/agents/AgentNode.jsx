import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export default function AgentNode({
    id,
    name,
    status = 'idle',
    icon: Icon,
    onClick,
    x,
    y
}) {
    const statusColors = {
        idle: 'bg-[var(--color-primary-dark)] border-white/10 text-[var(--color-text-secondary)]',
        active: 'bg-[var(--color-primary)]/20 border-[var(--color-primary)] text-white shadow-[0_0_15px_rgba(161,98,247,0.5)]',
        processing: 'bg-[var(--color-accent-blue)]/20 border-[var(--color-accent-blue)] text-white animate-pulse',
        alert: 'bg-[var(--color-accent-red)]/20 border-[var(--color-accent-red)] text-white',
    };

    return (
        <motion.div
            className={cn(
                "absolute w-32 h-32 rounded-full border-2 flex flex-col items-center justify-center cursor-pointer backdrop-blur-md transition-all duration-300 z-10",
                statusColors[status]
            )}
            style={{ left: x, top: y }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onClick(id)}
            animate={{
                y: status === 'active' ? [y - 5, y + 5, y - 5] : y,
            }}
            transition={{
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
        >
            <Icon size={32} className="mb-2" />
            <div className="text-xs font-bold text-center tracking-wide">{name}</div>
            <div className="text-[10px] uppercase tracking-wider opacity-70 mt-1">{status}</div>

            {/* Connecting Lines would go here in a SVG overlay in the parent */}
        </motion.div>
    );
}
