import React from 'react';
import Card from '../common/Card';
import { motion } from 'framer-motion';

export default function CarStatus() {
    return (
        <Card className="h-full relative overflow-hidden flex flex-col items-center">
            {/* Title */}
            <div className="text-center mb-6 z-10 w-full">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">System Status</h3>
                <div className="text-[var(--color-text-secondary)] text-sm">Real-time Diagnostics for VIN-4993</div>
            </div>

            {/* Health Score */}
            <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                {/* Rotating Borders */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[var(--color-primary)] opacity-50"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full border-b-2 border-l-2 border-[var(--color-accent-blue)] opacity-50"
                />

                {/* Score Text */}
                <div className="text-center z-10">
                    <div className="text-6xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-white bg-clip-text text-transparent">
                        94
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-tertiary)] mt-1">
                        Health Score
                    </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-[var(--color-primary)] opacity-10 blur-3xl rounded-full"></div>
            </div>

            {/* Car Visual with Hitboxes (Simplified for now using CSS shapes or a basic SVG path) */}
            <div className="relative w-full flex-1 flex items-center justify-center min-h-[300px]">
                {/* Simple SVG Car Outline */}
                <svg viewBox="0 0 200 400" className="h-full opacity-80 drop-shadow-[0_0_15px_rgba(161,98,247,0.3)]">
                    {/* Car Body Body */}
                    <path
                        d="M60,20 C80,10 120,10 140,20 L160,60 L160,320 C160,350 140,380 100,380 C60,380 40,350 40,320 L40,60 Z"
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="2"
                    />
                    {/* Wheels */}
                    <rect x="30" y="70" width="10" height="40" rx="4" fill="#333" />
                    <rect x="160" y="70" width="10" height="40" rx="4" fill="#333" />
                    <rect x="30" y="260" width="10" height="40" rx="4" fill="#333" />
                    <rect x="160" y="260" width="10" height="40" rx="4" fill="#333" />
                </svg>

                {/* Hotspots - Absolute Positioning relative to container */}
                {/* Engine / Front */}
                <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute top-[25%] left-[50%] -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"
                >
                    <div className="absolute left-6 top-0 text-[10px] whitespace-nowrap bg-black/50 px-2 py-1 rounded text-green-400 border border-green-500/30">
                        Engine: OK
                    </div>
                </motion.div>

                {/* Battery / Center */}
                <motion.div
                    className="absolute top-[50%] left-[50%] -translate-x-1/2 w-8 h-16 border border-[var(--color-accent-blue)] rounded bg-[var(--color-accent-blue)]/20"
                >
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 text-[10px] whitespace-nowrap bg-black/50 px-2 py-1 rounded text-blue-400 border border-blue-500/30">
                        Pack: 78%
                    </div>
                </motion.div>

                {/* Brake / Rear Right - Warning */}
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute top-[70%] right-[35%] w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]"
                >
                    <div className="absolute left-6 top-0 text-[10px] whitespace-nowrap bg-black/50 px-2 py-1 rounded text-red-400 border border-red-500/30 font-bold">
                        Brake Wear
                    </div>
                </motion.div>
            </div>

        </Card>
    );
}
