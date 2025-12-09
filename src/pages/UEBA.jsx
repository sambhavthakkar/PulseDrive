import React from 'react';
import Card from '../components/common/Card';
import {
    Shield, AlertTriangle, UserCheck, Lock, Activity, Scan, CheckCircle,
    Wifi, MapPin, Key, Eye, Clock, TrendingUp, AlertCircle, ShieldCheck,
    Fingerprint, Radio, Server, Cpu, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export default function UEBA() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="h2 text-[var(--text-primary)]">Security Analytics</h2>
                    <p className="body-reg text-[var(--text-secondary)]">User & Entity Behavior Analytics • Real-time Monitoring</p>
                </div>
                <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--color-success)]/10 text-[var(--color-success)] rounded-xl border border-[var(--color-success)]/20 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                >
                    <ShieldCheck size={18} />
                    <span className="font-bold text-sm">All Systems Secure</span>
                </motion.div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SecurityStat icon={Shield} value="98" label="Trust Score" suffix="%" variant="primary" />
                <SecurityStat icon={Eye} value="0" label="Active Threats" suffix="" variant="success" />
                <SecurityStat icon={Activity} value="247" label="Events Today" suffix="" variant="info" />
                <SecurityStat icon={Clock} value="0.3" label="Avg Response" suffix="s" variant="warning" />
            </div>

            {/* 2x2 Grid with 3 Blocks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Block 1: Trust Score Gauge (Top Left) */}
                <Card className="relative overflow-hidden bg-[var(--bg-card)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 via-transparent to-transparent pointer-events-none"></div>

                    <div className="flex flex-col items-center text-center py-6">
                        {/* Gauge */}
                        <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 180 180">
                                <circle cx="90" cy="90" r="80" stroke="var(--border-subtle)" strokeWidth="12" fill="transparent" className="opacity-30" />
                                <motion.circle
                                    cx="90" cy="90" r="80"
                                    stroke="url(#trustGradient)" strokeWidth="12" fill="transparent"
                                    strokeDasharray="502"
                                    strokeDashoffset="502"
                                    strokeLinecap="round"
                                    initial={{ strokeDashoffset: 502 }}
                                    animate={{ strokeDashoffset: 502 - (502 * 0.98) }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                />
                                <defs>
                                    <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="var(--color-brand-primary)" />
                                        <stop offset="100%" stopColor="var(--color-success-default)" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="flex flex-col items-center z-10">
                                <span className="text-6xl font-bold text-[var(--text-primary)] tracking-tighter">98</span>
                                <span className="text-sm text-[var(--color-success)] font-bold uppercase tracking-widest mt-1">Excellent</span>
                            </div>
                        </div>

                        {/* Trust Breakdown */}
                        <div className="w-full max-w-xs">
                            <div className="text-xs text-[var(--text-muted)] font-medium mb-3 uppercase tracking-wider">Trust Factors</div>
                            <div className="grid grid-cols-3 gap-3">
                                <TrustFactor icon={Fingerprint} label="Identity" value="100%" variant="primary" />
                                <TrustFactor icon={MapPin} label="Location" value="Safe" variant="success" />
                                <TrustFactor icon={Activity} label="Behavior" value="Normal" variant="info" />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Block 2: Security Event Log (Top Right) */}
                <Card className="flex flex-col bg-[var(--bg-card)] h-[450px]">
                    <div className="flex items-center justify-between mb-4 shrink-0">
                        <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 uppercase tracking-wider">
                            <Eye size={14} className="text-[var(--color-primary)]" />
                            Security Event Log
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2 py-1 rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/20 font-medium animate-pulse">
                                Live
                            </span>
                        </div>
                    </div>

                    {/* Scrollable Log Entries - explicitly set max-height */}
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[340px]">
                        {[
                            { time: '10:42:01 AM', event: 'Remote unlock via Mobile App', status: 'Authorized', risk: 'Low', icon: Lock },
                            { time: '09:15:33 AM', event: 'Engine start sequence initiated', status: 'Authorized', risk: 'Low', icon: Zap },
                            { time: 'Yesterday 3:22 PM', event: 'Unusual geolocation from new device', status: 'Flagged', risk: 'Medium', icon: AlertTriangle },
                            { time: 'Yesterday 11:45 AM', event: 'Password reset attempt blocked', status: 'Blocked', risk: 'High', icon: AlertCircle },
                            { time: '2 Days Ago', event: 'Diagnostic port access', status: 'Authorized', risk: 'Low', icon: Cpu },
                            { time: '3 Days Ago', event: 'Firmware OTA update check', status: 'Authorized', risk: 'Low', icon: TrendingUp },
                            { time: '3 Days Ago', event: 'Failed login from mobile app', status: 'Blocked', risk: 'Medium', icon: AlertTriangle },
                            { time: '4 Days Ago', event: 'Geofence exit detected (Work)', status: 'Authorized', risk: 'Low', icon: MapPin },
                            { time: '5 Days Ago', event: 'Battery sensor calibration', status: 'Authorized', risk: 'Low', icon: Zap },
                            { time: '6 Days Ago', event: 'Media system reboot', status: 'Authorized', risk: 'Low', icon: Activity }, // Extra item to force scroll
                            { time: '1 Week Ago', event: 'User profile updated', status: 'Authorized', risk: 'Low', icon: UserCheck },
                        ].map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--color-primary)]/30 transition-colors group mb-2"
                            >
                                <log.icon size={16} className={cn(
                                    "shrink-0",
                                    log.risk === 'High' ? 'text-[var(--color-error)]' :
                                        log.risk === 'Medium' ? 'text-[var(--color-warning)]' :
                                            'text-[var(--text-secondary)]'
                                )} />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm text-[var(--text-primary)] truncate group-hover:text-[var(--color-primary)] transition-colors">
                                        {log.event}
                                    </div>
                                    <div className="text-[10px] text-[var(--color-primary)] font-medium opacity-80">{log.time}</div>
                                </div>
                                <span className={cn(
                                    "px-2 py-1 rounded-lg text-[10px] font-bold uppercase shrink-0",
                                    log.status === 'Blocked' ? 'bg-[var(--color-error)]/10 text-[var(--color-error)]' :
                                        log.status === 'Flagged' ? 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]' :
                                            'bg-[var(--color-success)]/10 text-[var(--color-success)]'
                                )}>
                                    {log.status}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Legend */}
                    <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[var(--color-success)]"></div> OK</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[var(--color-warning)]"></div> Flag</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[var(--color-error)]"></div> Block</span>
                        </div>
                        <button className="text-xs text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors">
                            View All →
                        </button>
                    </div>
                </Card>

                {/* Block 3: System Status (Bottom, Full Width - spans 2 columns) */}
                <Card className="lg:col-span-2 bg-[var(--bg-card)]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 uppercase tracking-wider">
                            <Server size={14} className="text-[var(--color-primary)]" />
                            System Status
                        </h3>
                        <span className="text-xs text-[var(--color-success)] font-medium">All Systems Operational</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[
                            { label: 'OBD-II Port', status: 'Locked', icon: Key },
                            { label: 'Remote API', status: 'Encrypted', icon: Wifi },
                            { label: 'GPS Module', status: 'Verified', icon: MapPin },
                            { label: 'Key Fob RF', status: 'Secure', icon: Radio },
                            { label: 'ECU Firewall', status: 'Active', icon: Cpu },
                        ].map((sys, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--color-success)]/30 transition-all text-center"
                            >
                                <div className="flex justify-center mb-3">
                                    <div className="p-2.5 rounded-xl bg-[var(--color-success)]/10 border border-[var(--color-success)]/20">
                                        <sys.icon size={20} className="text-[var(--color-success)]" />
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-[var(--text-primary)] mb-1">{sys.label}</div>
                                <div className="flex items-center justify-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] shadow-[0_0_6px_rgba(34,197,94,0.5)]"></div>
                                    <span className="text-xs text-[var(--color-success)] font-medium">{sys.status}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}

// Sub-components
const SecurityStat = ({ icon: Icon, value, label, suffix, variant }) => {
    const variants = {
        primary: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20',
        success: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20',
        info: 'bg-[var(--color-info)]/10 text-[var(--color-info)] border-[var(--color-info)]/20',
        warning: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/20',
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className={cn("p-4 rounded-2xl border", variants[variant])}
        >
            <div className="flex items-center gap-3">
                <Icon size={20} />
                <div>
                    <div className="text-2xl font-bold text-[var(--text-primary)]">{value}<span className="text-sm opacity-60 ml-0.5">{suffix}</span></div>
                    <div className="text-xs text-[var(--text-secondary)]">{label}</div>
                </div>
            </div>
        </motion.div>
    );
};

const TrustFactor = ({ icon: Icon, label, value, variant }) => {
    const variants = {
        primary: 'text-[var(--color-primary)]',
        success: 'text-[var(--color-success)]',
        info: 'text-[var(--color-info)]',
    };

    return (
        <div className="flex flex-col items-center p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
            <Icon size={18} className={cn("mb-2", variants[variant])} />
            <span className="text-[10px] text-[var(--text-muted)] uppercase mb-0.5">{label}</span>
            <span className="text-sm font-bold text-[var(--text-primary)]">{value}</span>
        </div>
    );
};
