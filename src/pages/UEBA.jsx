import React from 'react';
import Card from '../components/common/Card';
import {
    Shield, AlertTriangle, UserCheck, Lock, Activity, Scan, CheckCircle,
    Wifi, MapPin, Key, Eye, Clock, TrendingUp, AlertCircle, ShieldCheck,
    Fingerprint, Radio, Server, Cpu, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function UEBA() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)]">Security Analytics</h2>
                    <p className="text-sm text-[var(--text-secondary)]">User & Entity Behavior Analytics • Real-time Monitoring</p>
                </div>
                <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-xl border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                >
                    <ShieldCheck size={18} />
                    <span className="font-bold text-sm">All Systems Secure</span>
                </motion.div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SecurityStat icon={Shield} value="98" label="Trust Score" suffix="%" color="purple" />
                <SecurityStat icon={Eye} value="0" label="Active Threats" suffix="" color="green" />
                <SecurityStat icon={Activity} value="247" label="Events Today" suffix="" color="blue" />
                <SecurityStat icon={Clock} value="0.3" label="Avg Response" suffix="s" color="amber" />
            </div>

            {/* 2x2 Grid with 3 Blocks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Block 1: Trust Score Gauge (Top Left) */}
                <Card className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-purple)]/5 via-transparent to-transparent pointer-events-none"></div>

                    <div className="flex flex-col items-center text-center py-6">
                        {/* Gauge */}
                        <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 180 180">
                                <circle cx="90" cy="90" r="80" stroke="var(--border-light)" strokeWidth="12" fill="transparent" className="opacity-30" />
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
                                        <stop offset="0%" stopColor="#A162F7" />
                                        <stop offset="100%" stopColor="#22C55E" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="flex flex-col items-center z-10">
                                <span className="text-6xl font-bold text-[var(--text-primary)] tracking-tighter">98</span>
                                <span className="text-sm text-green-400 font-bold uppercase tracking-widest mt-1">Excellent</span>
                            </div>
                        </div>

                        {/* Trust Breakdown */}
                        <div className="w-full max-w-xs">
                            <div className="text-xs text-[var(--text-muted)] font-medium mb-3 uppercase tracking-wider">Trust Factors</div>
                            <div className="grid grid-cols-3 gap-3">
                                <TrustFactor icon={Fingerprint} label="Identity" value="100%" color="purple" />
                                <TrustFactor icon={MapPin} label="Location" value="Safe" color="green" />
                                <TrustFactor icon={Activity} label="Behavior" value="Normal" color="blue" />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Block 2: Security Event Log (Top Right) */}
                <Card className="flex flex-col">
                    <div className="flex items-center justify-between mb-4 shrink-0">
                        <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 uppercase tracking-wider">
                            <Eye size={14} className="text-[var(--color-purple)]" />
                            Security Event Log
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-medium animate-pulse">
                                Live
                            </span>
                        </div>
                    </div>

                    {/* Scrollable Log Entries - explicitly set max-height */}
                    <div className="max-h-[300px] overflow-y-scroll space-y-2 pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--color-purple) transparent' }}>
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
                        ].map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-light)] hover:border-[var(--color-purple)]/30 transition-colors group"
                            >
                                <log.icon size={16} className={`shrink-0 ${log.risk === 'High' ? 'text-red-400' :
                                    log.risk === 'Medium' ? 'text-amber-400' :
                                        'text-[var(--text-secondary)]'
                                    }`} />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm text-[var(--text-primary)] truncate group-hover:text-[var(--color-purple)] transition-colors">
                                        {log.event}
                                    </div>
                                    <div className="text-[10px] text-[var(--color-purple)] font-medium">{log.time}</div>
                                </div>
                                <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase shrink-0 ${log.status === 'Blocked' ? 'bg-red-500/10 text-red-400' :
                                    log.status === 'Flagged' ? 'bg-amber-500/10 text-amber-400' :
                                        'bg-green-500/10 text-green-400'
                                    }`}>
                                    {log.status}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Legend */}
                    <div className="pt-4 mt-4 border-t border-[var(--border-color)] flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> OK</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Flag</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> Block</span>
                        </div>
                        <button className="text-xs text-[var(--text-secondary)] hover:text-[var(--color-purple)] transition-colors">
                            View All →
                        </button>
                    </div>
                </Card>

                {/* Block 3: System Status (Bottom, Full Width - spans 2 columns) */}
                <Card className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 uppercase tracking-wider">
                            <Server size={14} className="text-[var(--color-purple)]" />
                            System Status
                        </h3>
                        <span className="text-xs text-green-400 font-medium">All Systems Operational</span>
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
                                className="p-4 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-light)] hover:border-green-500/30 transition-all text-center"
                            >
                                <div className="flex justify-center mb-3">
                                    <div className="p-2.5 rounded-xl bg-green-500/10 border border-green-500/20">
                                        <sys.icon size={20} className="text-green-400" />
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-[var(--text-primary)] mb-1">{sys.label}</div>
                                <div className="flex items-center justify-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]"></div>
                                    <span className="text-xs text-green-400 font-medium">{sys.status}</span>
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
const SecurityStat = ({ icon: Icon, value, label, suffix, color }) => {
    const colors = {
        green: 'from-green-500/10 to-emerald-500/10 border-green-500/20 text-green-400',
        purple: 'from-purple-500/10 to-indigo-500/10 border-purple-500/20 text-purple-400',
        blue: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-400',
        amber: 'from-amber-500/10 to-yellow-500/10 border-amber-500/20 text-amber-400',
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className={`p-4 rounded-2xl bg-gradient-to-br ${colors[color]} border`}
        >
            <div className="flex items-center gap-3">
                <Icon size={20} />
                <div>
                    <div className="text-2xl font-bold text-[var(--text-primary)]">{value}<span className="text-sm opacity-60">{suffix}</span></div>
                    <div className="text-xs text-[var(--text-secondary)]">{label}</div>
                </div>
            </div>
        </motion.div>
    );
};

const TrustFactor = ({ icon: Icon, label, value, color }) => {
    const colors = {
        purple: 'text-purple-400',
        green: 'text-green-400',
        blue: 'text-blue-400',
    };

    return (
        <div className="flex flex-col items-center p-3 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-light)]">
            <Icon size={18} className={`${colors[color]} mb-2`} />
            <span className="text-[10px] text-[var(--text-muted)] uppercase mb-0.5">{label}</span>
            <span className="text-sm font-bold text-[var(--text-primary)]">{value}</span>
        </div>
    );
};
