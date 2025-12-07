import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Zap, Droplets, Gauge } from 'lucide-react';

// Icon mapping for different stat types
const ICONS = {
    energy: Zap,
    fluid: Droplets,
    tires: Gauge,
};

export default function StatCard({
    title,
    icon = 'energy',
    color = 'purple',
    value,
    unit,
    subtext,
    variant = 'default', // 'primary' | 'default'
    progress = 0
}) {
    const IconComponent = ICONS[icon] || Zap;

    // Variant Styles
    const isPrimary = variant === 'primary';
    const bgClass = isPrimary ? 'bg-[var(--color-purple)]' : 'bg-[var(--bg-card)]';
    const textClass = isPrimary ? 'text-white' : 'text-[var(--text-primary)]';
    const subtextClass = isPrimary ? 'text-white/80' : 'text-[var(--text-secondary)]';

    // Progress Circle Config
    const radius = 35;
    const stroke = 6;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="h-full"
        >
            <div className={`${bgClass} rounded-[2rem] p-6 flex flex-col items-center justify-between text-center h-[280px] hover:shadow-lg transition-all duration-300 relative overflow-hidden group border border-transparent hover:border-[var(--color-primary)]/10`}>

                {/* 1. Icon Top */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${isPrimary ? 'bg-white/20 text-white' : `bg-[var(--color-${color}-light)] text-[var(--color-${color})]`}`}>
                    <IconComponent size={18} />
                </div>

                {/* 2. Title */}
                <h3 className={`font-bold text-lg mb-4 ${textClass}`}>{title}</h3>

                {/* 3. Circular Progress & Value */}
                <div className="relative flex items-center justify-center mb-6">
                    <svg
                        height={radius * 2}
                        width={radius * 2}
                        className="transform -rotate-90"
                    >
                        <circle
                            stroke={isPrimary ? "rgba(255,255,255,0.2)" : "var(--color-gray-100)"}
                            strokeWidth={stroke}
                            fill="transparent"
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                        <circle
                            stroke={isPrimary ? "white" : `var(--color-${color})`}
                            strokeWidth={stroke}
                            strokeDasharray={circumference + ' ' + circumference}
                            style={{ strokeDashoffset }}
                            strokeLinecap="round"
                            fill="transparent"
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                        <span className={`text-2xl font-bold ${textClass}`}>{value}{unit}</span>
                        {unit === 'Km/L' && <span className={`text-xs ${subtextClass}`}>{unit}</span>}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
