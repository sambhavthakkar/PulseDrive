import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Droplets, Gauge, Activity, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { cn } from '../../utils/cn';

// Standardized Color Configuration
const THEMES = {
    purple: {
        gradient: 'from-[var(--color-primary)]/20 to-[var(--color-primary)]/5',
        stroke: 'var(--color-primary)',
        iconBg: 'bg-[var(--color-primary)]/20',
        iconColor: 'text-[var(--color-primary)]',
        shadow: 'shadow-[var(--shadow-glow)]',
        border: 'group-hover:border-[var(--color-primary)]/50',
    },
    teal: {
        gradient: 'from-[var(--color-info)]/20 to-[var(--color-info)]/5',
        stroke: 'var(--color-info)',
        iconBg: 'bg-[var(--color-info)]/20',
        iconColor: 'text-[var(--color-info)]',
        shadow: 'shadow-[var(--color-info)]/20',
        border: 'group-hover:border-[var(--color-info)]/50',
    },
    red: {
        gradient: 'from-[var(--color-error)]/20 to-[var(--color-error)]/5',
        stroke: 'var(--color-error)',
        iconBg: 'bg-[var(--color-error)]/20',
        iconColor: 'text-[var(--color-error)]',
        shadow: 'shadow-[var(--color-error)]/20',
        border: 'group-hover:border-[var(--color-error)]/50',
    },
    yellow: {
        gradient: 'from-[var(--color-warning)]/20 to-[var(--color-warning)]/5',
        stroke: 'var(--color-warning)',
        iconBg: 'bg-[var(--color-warning)]/20',
        iconColor: 'text-[var(--color-warning)]',
        shadow: 'shadow-[var(--color-warning)]/20',
        border: 'group-hover:border-[var(--color-warning)]/50',
    },
    // Adding default fallback
    default: {
        gradient: 'from-[var(--bg-elevated)] to-[var(--bg-card)]',
        stroke: 'var(--text-secondary)',
        iconBg: 'bg-[var(--bg-elevated)]',
        iconColor: 'text-[var(--text-primary)]',
        shadow: 'shadow-[var(--shadow-card)]',
        border: 'group-hover:border-[var(--border-default)]',
    }
};

// ... ICONS map remains same ...
const ICONS = {
    energy: Zap,
    fluid: Droplets,
    tires: Gauge,
    activity: Activity,
};

const Tooltip = ({ text }) => (
    <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.9 }}
        className="absolute top-16 left-0 right-0 z-50 mx-4"
    >
        <div className="bg-[var(--bg-elevated)]/95 backdrop-blur-md border border-[var(--border-default)] p-3 rounded-[var(--radius-input)] shadow-xl text-xs text-[var(--text-secondary)] text-center leading-relaxed">
            {text}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--bg-elevated)]/95 rotate-45 border-l border-t border-[var(--border-default)]"></div>
        </div>
    </motion.div>
);

export default function StatCard({
    title,
    value,
    unit,
    icon = 'energy',
    color = 'purple',
    progress = 0,
    status = 'Good',
    trendText = 'Stable condition',
    onClick,
    className
}) {
    const [isHovered, setIsHovered] = useState(false);

    const theme = THEMES[color] || THEMES.default;
    const IconComponent = ICONS[icon] || Activity;

    // Status Badge Logic
    const getStatusColor = (s) => {
        if (s === 'Critical') return 'text-[var(--color-error)] bg-[var(--color-error)]/10 border-[var(--color-error)]/20';
        if (s === 'Low') return 'text-[var(--color-warning)] bg-[var(--color-warning)]/10 border-[var(--color-warning)]/20';
        return 'text-[var(--color-success)] bg-[var(--color-success)]/10 border-[var(--color-success)]/20';
    };

    // Progress Ring Calculation
    const radius = 55;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (Math.min(100, Math.max(0, progress)) / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn("h-full relative group cursor-pointer", className)}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onClick}
        >
            <div className={cn(
                "card-base p-6 flex flex-col items-center justify-between h-[320px] relative overflow-visible bg-gradient-to-br",
                theme.gradient,
                theme.border,
                "hover:shadow-2xl transition-all duration-500",
                theme.shadow
            )}>

                <AnimatePresence>
                    {isHovered && <Tooltip text={trendText} />}
                </AnimatePresence>

                {/* 1. Floating Icon Bubble */}
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className={cn(
                        "w-14 h-14 rounded-full flex items-center justify-center shadow-lg ring-4 ring-[var(--bg-card)]/50 mb-4 relative z-10",
                        theme.iconBg,
                        theme.iconColor
                    )}
                >
                    <IconComponent size={24} strokeWidth={2.5} />
                    <div className={cn("absolute inset-0 rounded-full animate-ping opacity-20", theme.iconBg)}></div>
                </motion.div>

                {/* 2. Title & Status */}
                <div className="flex flex-col items-center mb-4 z-10">
                    <h3 className="font-bold text-lg text-[var(--text-primary)] mb-2">{title}</h3>
                    <div className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider flex items-center gap-1", getStatusColor(status))}>
                        {status === 'Good' && <CheckCircle size={10} />}
                        {status === 'Critical' && <AlertCircle size={10} />}
                        {status === 'Low' && <Info size={10} />}
                        {status}
                    </div>
                </div>

                {/* 3. Central Progress Ring with Value */}
                <div className="relative flex items-center justify-center z-10">
                    <svg height={radius * 2} width={radius * 2} className="transform -rotate-90 drop-shadow-xl">
                        <circle
                            stroke="var(--border-strong)"
                            strokeWidth={stroke}
                            fill="transparent"
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                        <motion.circle
                            stroke={theme.stroke}
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

                    <div className="absolute flex flex-col items-center justify-center">
                        <motion.span
                            key={value}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-3xl font-bold text-[var(--text-primary)] tracking-tight"
                        >
                            {value}
                            <span className="text-sm font-bold text-[var(--text-secondary)] ml-0.5 align-top">{unit}</span>
                        </motion.span>
                    </div>
                </div>

                {/* Bottom Hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute bottom-4 text-[10px] text-[var(--text-secondary)] font-medium uppercase tracking-widest"
                >
                    View Analysis
                </motion.div>
            </div>
        </motion.div>
    );
}
