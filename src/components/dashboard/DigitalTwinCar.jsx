import React from 'react';
import { motion } from 'framer-motion';

export default function DigitalTwinCar({ isVerifying }) {
    return (
        <motion.div
            className="relative w-64 h-[400px] md:w-80 md:h-[500px]"
            animate={isVerifying ? {
                x: [0, -2, 2, -2, 2, 0],
                filter: ["drop-shadow(0 0 0px rgba(161,98,247,0))", "drop-shadow(0 0 20px rgba(161,98,247,0.5))", "drop-shadow(0 0 0px rgba(161,98,247,0))"]
            } : {}}
            transition={{ duration: 0.5, repeat: isVerifying ? Infinity : 0 }}
        >
            {/* Simple SVG Car Outline */}
            <svg viewBox="0 0 200 400" className="w-full h-full drop-shadow-[0_0_15px_rgba(161,98,247,0.3)]">
                <path
                    d="M60,20 C80,10 120,10 140,20 L160,60 L160,320 C160,350 140,380 100,380 C60,380 40,350 40,320 L40,60 Z"
                    fill="#1F2128"
                    stroke={isVerifying ? "#A162F7" : "rgba(255,255,255,0.2)"}
                    strokeWidth="3"
                    className="transition-colors duration-500"
                />
                {/* Wheels */}
                <rect x="30" y="70" width="10" height="40" rx="4" fill="#333" />
                <rect x="160" y="70" width="10" height="40" rx="4" fill="#333" />
                <rect x="30" y="260" width="10" height="40" rx="4" fill="#333" />
                <rect x="160" y="260" width="10" height="40" rx="4" fill="#333" />

                {/* Internal Components - Visible during verification */}
                {isVerifying && (
                    <>
                        <motion.circle cx="100" cy="100" r="20" fill="#22c55e" opacity="0.5" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1, repeat: Infinity }} />
                        <motion.circle cx="100" cy="200" r="30" fill="#3b82f6" opacity="0.5" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.5, repeat: Infinity }} />
                        <motion.circle cx="100" cy="300" r="20" fill="#eab308" opacity="0.5" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.2, repeat: Infinity }} />
                    </>
                )}
            </svg>

            {/* Hotspots Overlay */}
            {isVerifying && (
                <div className="absolute inset-0">
                    <div className="absolute top-[25%] left-0 w-full h-[1px] bg-green-500/30"></div>
                    <div className="absolute top-[50%] left-0 w-full h-[1px] bg-blue-500/30"></div>
                </div>
            )}
        </motion.div>
    );
}
