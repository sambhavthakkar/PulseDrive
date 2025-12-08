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
    const isProcessing = status === 'processing' || status === 'active';
    const isAlert = status === 'alert';

    const statusConfig = {
        idle: {
            bg: 'bg-gray-800/80',
            border: 'border-white/10',
            iconColor: 'text-gray-400',
            glow: ''
        },
        processing: {
            bg: 'bg-blue-900/40',
            border: 'border-blue-500/50',
            iconColor: 'text-blue-400',
            glow: 'shadow-[0_0_30px_rgba(59,130,246,0.5)]'
        },
        active: {
            bg: 'bg-green-900/40',
            border: 'border-green-500/50',
            iconColor: 'text-green-400',
            glow: 'shadow-[0_0_30px_rgba(34,197,94,0.5)]'
        },
        alert: {
            bg: 'bg-red-900/40',
            border: 'border-red-500/50',
            iconColor: 'text-red-400',
            glow: 'shadow-[0_0_40px_rgba(239,68,68,0.6)]'
        },
        waiting: {
            bg: 'bg-amber-900/40',
            border: 'border-amber-500/50',
            iconColor: 'text-amber-400',
            glow: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]'
        }
    };

    const config = statusConfig[status] || statusConfig.idle;

    return (
        <div
            className="absolute flex flex-col items-center justify-center z-20 pointer-events-auto"
            style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }} // Centralize coordinates
        >
            {/* Ripple Animation Layers */}
            {(isProcessing || isAlert) && (
                <>
                    <motion.div
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        className={`absolute inset-0 rounded-full ${isAlert ? 'bg-red-500/30' : 'bg-blue-500/20'}`}
                    />
                    <motion.div
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
                        className={`absolute inset-0 rounded-full ${isAlert ? 'bg-red-500/30' : 'bg-blue-500/20'}`}
                    />
                </>
            )}

            {/* Main Node Circle */}
            <motion.div
                className={`
                    w-24 h-24 rounded-full flex flex-col items-center justify-center 
                    backdrop-blur-md border-[2px] cursor-pointer transition-colors duration-500
                    ${config.bg} ${config.border} ${config.glow}
                `}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onClick(id)}
                layout
            >
                <Icon size={28} className={`${config.iconColor} transition-colors duration-300`} strokeWidth={2} />
                {(isProcessing || isAlert) && (
                    <div className={`absolute inset-0 rounded-full border-t-2 border-r-2 ${isAlert ? 'border-red-400' : 'border-blue-400'} animate-spin`} />
                )}
            </motion.div>

            {/* Label */}
            <motion.div
                className="mt-3 text-center"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="text-xs font-bold text-white tracking-wide shadow-black drop-shadow-md whitespace-nowrap">{name}</div>
                <div className={`text-[10px] uppercase tracking-wider font-bold mt-0.5 ${config.iconColor}`}>
                    {status}
                </div>
            </motion.div>
        </div>
    );
}
