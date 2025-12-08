import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Droplets, Gauge, Activity, AlertCircle, CheckCircle, Info } from 'lucide-react';

// Color Configuration
const THEMES = {
    purple: {
        gradient: 'from-[var(--color-purple)]/20 to-[var(--color-purple)]/5',
        stroke: '#A162F7', // Purple
        iconBg: 'bg-[#A162F7]/20',
        iconColor: 'text-[#A162F7]',
        shadow: 'shadow-[#A162F7]/20',
        border: 'group-hover:border-[#A162F7]/50',
    },
    teal: {
        gradient: 'from-teal-500/20 to-teal-500/5',
        stroke: '#14b8a6', // Teal
        iconBg: 'bg-teal-500/20',
        iconColor: 'text-teal-400',
        shadow: 'shadow-teal-500/20',
        border: 'group-hover:border-teal-500/50',
    },
    red: {
        gradient: 'from-red-500/20 to-red-500/5',
        stroke: '#ef4444', // Red
        iconBg: 'bg-red-500/20',
        iconColor: 'text-red-400',
        shadow: 'shadow-red-500/20',
        border: 'group-hover:border-red-500/50',
    },
    yellow: {
        gradient: 'from-amber-500/20 to-amber-500/5',
        stroke: '#f59e0b', // Amber/Yellow
        iconBg: 'bg-amber-500/20',
        iconColor: 'text-amber-400',
        shadow: 'shadow-amber-500/20',
        border: 'group-hover:border-amber-500/50',
    },
    blue: {
        gradient: 'from-blue-500/20 to-blue-500/5',
        stroke: '#3b82f6', // Blue
        iconBg: 'bg-blue-500/20',
        iconColor: 'text-blue-400',
        shadow: 'shadow-blue-500/20',
        border: 'group-hover:border-blue-500/50',
    }
};

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
        <div className="bg-black/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl text-xs text-gray-300 text-center leading-relaxed">
            {text}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 border-l border-t border-white/10"></div>
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
    onClick
}) {
    const [isHovered, setIsHovered] = useState(false);

    const theme = THEMES[color] || THEMES.purple;
    const IconComponent = ICONS[icon] || Activity;

    // Status Badge Logic
    const getStatusColor = (s) => {
        if (s === 'Critical') return 'text-red-400 bg-red-500/20 border-red-500/30';
        if (s === 'Low') return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
        return 'text-green-400 bg-green-500/20 border-green-500/30';
    };

    // Progress Ring Calculation
    const radius = 55;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-full relative group cursor-pointer"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onClick}
        >
            <div className={`
                ${theme.gradient} bg-gradient-to-br
                bg-[var(--bg-card)] rounded-[2rem] p-6 
                flex flex-col items-center justify-between 
                h-[320px] relative overflow-visible
                border border-transparent ${theme.border}
                ${theme.shadow} hover:shadow-2xl
                transition-all duration-500
            `}>

                {/* Optional Floating Tooltip */}
                <AnimatePresence>
                    {isHovered && <Tooltip text={trendText} />}
                </AnimatePresence>

                {/* 1. Floating Icon Bubble */}
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className={`
                        w-14 h-14 rounded-full flex items-center justify-center 
                        ${theme.iconBg} ${theme.iconColor} 
                        shadow-lg ring-4 ring-[var(--bg-card)]/50
                        mb-4 relative z-10
                    `}
                >
                    <IconComponent size={24} strokeWidth={2.5} />
                    {/* Ripple Effect */}
                    <div className={`absolute inset-0 rounded-full ${theme.iconBg} animate-ping opacity-20`}></div>
                </motion.div>

                {/* 2. Title & Status */}
                <div className="flex flex-col items-center mb-4 z-10">
                    <h3 className="font-bold text-lg text-[var(--text-primary)] mb-2">{title}</h3>
                    <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(status)} uppercase tracking-wider flex items-center gap-1`}>
                        {status === 'Good' && <CheckCircle size={10} />}
                        {status === 'Critical' && <AlertCircle size={10} />}
                        {status === 'Low' && <Info size={10} />}
                        {status}
                    </div>
                </div>

                {/* 3. Central Progress Ring with Value */}
                <div className="relative flex items-center justify-center z-10">
                    {/* Ring SVG */}
                    <svg
                        height={radius * 2}
                        width={radius * 2}
                        className="transform -rotate-90 drop-shadow-xl"
                    >
                        {/* Track */}
                        <circle
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth={stroke}
                            fill="transparent"
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                        {/* Indicator */}
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

                    {/* Centered Value */}
                    <div className="absolute flex flex-col items-center justify-center">
                        <motion.span
                            key={value}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-3xl font-bold text-white tracking-tight"
                        >
                            {value}
                            <span className="text-sm font-medium text-white/50 ml-0.5 align-top opacity-70">{unit}</span>
                        </motion.span>
                    </div>
                </div>

                {/* Bottom Decor or Action Hint */}
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
