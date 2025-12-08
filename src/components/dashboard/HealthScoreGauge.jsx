import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export default function HealthScoreGauge({ score = 82 }) {
    // Determine color based on score
    let color = 'var(--color-accent-green, #10B981)'; // Default Good
    let statusText = 'Excellent';

    if (score < 50) {
        color = 'var(--color-accent-red)';
        statusText = 'Critical';
    } else if (score < 80) {
        color = 'var(--color-accent-yellow)';
        statusText = 'Attention Needed';
    }

    const radius = 30;
    const stroke = 5;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="flex items-center gap-4 bg-[var(--bg-card)]/50 backdrop-blur-md p-3 rounded-2xl border border-[var(--border-color)]">
            <div className="relative flex items-center justify-center w-16 h-16">
                {/* Rotating outer ring for effect */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-white/10 w-full h-full"
                />

                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="transform -rotate-90 drop-shadow-lg"
                >
                    <circle
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth={stroke}
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <motion.circle
                        stroke={color}
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                </svg>
                <div className="absolute flex items-center justify-center inset-0">
                    <span className="text-sm font-bold text-[var(--text-primary)]">{score}%</span>
                </div>
            </div>

            <div className="flex flex-col">
                <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider font-semibold">Vehicle Health</span>
                <span className="text-sm font-bold text-[var(--text-primary)]" style={{ color: score < 80 ? color : undefined }}>{statusText}</span>
            </div>
        </div>
    );
}
