import React from 'react';
import Card from '../components/common/Card';
import { motion } from 'framer-motion';
import {
    User, Mail, Phone, MapPin, Award, Calendar, CheckCircle,
    Shield, Zap, Car, Gauge, Star, TrendingUp, Clock,
    BadgeCheck, Crown, Sparkles, Battery, Wrench
} from 'lucide-react';

export default function Profile() {
    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            {/* Hero Banner with Glassmorphism */}
            <div className="relative h-56 rounded-3xl overflow-hidden">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-purple)] via-indigo-600 to-purple-900">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzMiAyIDIgNC0yIDQtMiA0LTItMi0yLTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
                </div>

                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 to-transparent"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end gap-6">
                    {/* Avatar with Ring */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative"
                    >
                        <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-[var(--color-purple)] to-pink-500 shadow-2xl shadow-purple-500/30">
                            <div className="w-full h-full rounded-full overflow-hidden bg-[var(--bg-card)] border-4 border-[var(--bg-primary)]">
                                <img src="https://ui-avatars.com/api/?name=Sambhav+Thakkar&background=6366f1&color=fff&size=128&bold=true" alt="User" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        {/* Verified Badge */}
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg border-2 border-[var(--bg-primary)]">
                            <BadgeCheck size={16} className="text-white" />
                        </div>
                    </motion.div>

                    {/* Name & Title */}
                    <div className="flex-1 pb-2">
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-bold text-white">Sambhav Thakkar</h1>
                            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase flex items-center gap-1">
                                <Crown size={12} /> Premium
                            </span>
                        </div>
                        <p className="text-white/70">Lead Systems Architect • Founding Member</p>
                    </div>

                    {/* Quick Actions */}
                    <div className="hidden md:flex gap-2">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur text-white text-sm font-medium border border-white/20 hover:bg-white/20 transition-all">
                            Edit Profile
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatBadge icon={Gauge} value="94%" label="Health Score" color="green" />
                <StatBadge icon={TrendingUp} value="1,200 km" label="Until Service" color="purple" />
                <StatBadge icon={Shield} value="Platinum" label="Warranty" color="blue" />
                <StatBadge icon={Star} value="4.9" label="Driver Score" color="amber" />
            </div>

            {/* Row 1: Contact Info + Upcoming Appointment - Same Height */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Contact Info */}
                <Card className="h-full">
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2 uppercase tracking-wider">
                        <User size={14} className="text-[var(--color-purple)]" />
                        Contact Information
                    </h3>
                    <div className="space-y-3">
                        <InfoRow icon={Mail} label="Email" value="sambhav@pulsedrive.ai" />
                        <InfoRow icon={Phone} label="Phone" value="+91 98765 43210" />
                        <InfoRow icon={MapPin} label="Location" value="Mumbai, India" />
                        <InfoRow icon={Calendar} label="Member Since" value="January 2024" />
                        <InfoRow icon={Award} label="Membership" value="Founding Member" />
                    </div>
                </Card>

                {/* Upcoming Appointment */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="h-full p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2 text-blue-400">
                            <Clock size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider">Next Appointment</span>
                        </div>
                        <div className="p-2 rounded-xl bg-blue-500/10">
                            <Calendar size={20} className="text-blue-400" />
                        </div>
                    </div>
                    <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-1">December 20, 2024</h4>
                    <p className="text-[var(--text-secondary)] mb-4">Annual Inspection & System Check</p>
                    <div className="flex items-center justify-between pt-4 border-t border-blue-500/20">
                        <div>
                            <p className="text-xs text-[var(--text-muted)]">Location</p>
                            <p className="text-sm text-[var(--text-primary)] font-medium">Pulse Hub - Mumbai</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-[var(--text-muted)]">Time</p>
                            <p className="text-sm text-blue-400 font-bold">10:30 AM</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Row 2: Vehicle Info + Maintenance Score - Same Height */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Vehicle Card */}
                <div className="rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-card)] h-full">
                    {/* Vehicle Image */}
                    <div className="relative h-40 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&h=300&fit=crop&auto=format"
                            alt="Jeep Compass"
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent"></div>
                        {/* Connected Badge */}
                        <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[10px] text-green-400 font-medium">Connected</span>
                        </div>
                    </div>

                    {/* Vehicle Info */}
                    <div className="p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-[var(--text-primary)]">Jeep Compass</h3>
                                <p className="text-sm text-[var(--text-secondary)]">2025 Trailhawk 4x4</p>
                            </div>
                            <div className="p-2 rounded-xl bg-[var(--color-purple)]/10">
                                <Car size={20} className="text-[var(--color-purple)]" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <VehicleSpec label="VIN" value="MCA-JP-2025-X7" mono />
                            <VehicleSpec label="PulseOS" value="v2.4.0" highlight />
                            <VehicleSpec label="Engine" value="2.0L Turbo Diesel" />
                            <VehicleSpec label="Transmission" value="9-Speed Auto" />
                        </div>
                    </div>
                </div>

                {/* Maintenance Score + Quick Tiles */}
                <div className="space-y-4 h-full flex flex-col">
                    {/* Maintenance Score */}
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="flex-1 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/5 border border-green-500/20"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2 text-green-400">
                                <TrendingUp size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">Maintenance Score</span>
                            </div>
                            <div className="w-14 h-14 rounded-full border-4 border-green-500 flex items-center justify-center bg-green-500/10">
                                <span className="text-green-400 font-bold text-lg">98</span>
                            </div>
                        </div>
                        <h4 className="text-3xl font-bold text-[var(--text-primary)] mb-1">A+</h4>
                        <p className="text-[var(--text-secondary)]">Excellent condition</p>
                        <p className="text-sm text-green-400 mt-3">🏆 Top 5% of Compass owners</p>
                    </motion.div>

                    {/* Quick Tiles Row */}
                    <div className="grid grid-cols-3 gap-3">
                        <QuickTile icon={Shield} label="Insurance" value="Active" color="purple" />
                        <QuickTile icon={Award} label="Warranty" value="3 Years" color="amber" />
                        <QuickTile icon={Battery} label="Battery" value="45%" color="teal" />
                    </div>
                </div>
            </div>

            {/* Row 3: Service History - Full Width */}
            <Card>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                        <Wrench size={18} className="text-[var(--color-purple)]" />
                        Service History
                    </h3>
                    <span className="text-xs text-[var(--text-secondary)] bg-[var(--bg-glass)] px-3 py-1 rounded-full">
                        3 services this year
                    </span>
                </div>

                {/* Service History Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider border-b border-[var(--border-color)]">
                    <div className="col-span-5">Service</div>
                    <div className="col-span-3">Provider</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2 text-right">Cost</div>
                </div>

                <div className="divide-y divide-[var(--border-light)]">
                    {[
                        { date: 'Dec 01, 2024', service: 'System Diagnostics & AI Optimization', provider: 'Pulse Remote Service', cost: '₹0', type: 'remote' },
                        { date: 'Oct 15, 2024', service: 'Battery Cell Balancing', provider: 'Pulse Hub - Mumbai', cost: '₹4,500', type: 'inperson' },
                        { date: 'Aug 20, 2024', service: 'Tire Calibration & Aero Check', provider: 'Pulse Hub - Mumbai', cost: '₹1,200', type: 'inperson' },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-4 py-4 hover:bg-[var(--bg-glass)] transition-colors group cursor-default"
                        >
                            <div className="col-span-5 flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-green-500/10 text-green-500 shrink-0">
                                    <CheckCircle size={16} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-[var(--text-primary)] group-hover:text-[var(--color-purple)] transition-colors">{item.service}</h4>
                                    <span className={`md:hidden text-[10px] px-2 py-0.5 rounded-full font-medium ${item.type === 'remote' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                        {item.type === 'remote' ? '🌐 Remote' : '🏢 In-Person'}
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-3 flex items-center text-sm text-[var(--text-secondary)]">
                                {item.provider}
                                <span className={`hidden md:inline-block ml-2 text-[10px] px-2 py-0.5 rounded-full font-medium ${item.type === 'remote' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                    {item.type === 'remote' ? 'Remote' : 'In-Person'}
                                </span>
                            </div>
                            <div className="col-span-2 flex items-center text-sm text-[var(--text-muted)]">
                                {item.date}
                            </div>
                            <div className="col-span-2 flex items-center justify-end font-bold text-[var(--text-primary)]">
                                {item.cost}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full mt-4 py-3 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] text-sm font-medium hover:border-[var(--color-purple)]/50 hover:text-[var(--color-purple)] transition-all"
                >
                    View Complete History
                </motion.button>
            </Card>

            {/* Achievements Row */}
            <Card>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2 uppercase tracking-wider">
                    <Sparkles size={14} className="text-amber-400" />
                    Achievements & Badges
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                    <AchievementBadge icon={Zap} label="Early Adopter" color="purple" />
                    <AchievementBadge icon={Shield} label="Safety Pro" color="green" />
                    <AchievementBadge icon={TrendingUp} label="Eco Driver" color="teal" />
                    <AchievementBadge icon={Star} label="5★ Rating" color="amber" />
                    <AchievementBadge icon={Crown} label="Premium" color="purple" />
                    <AchievementBadge icon={Gauge} label="Power User" color="blue" />
                </div>
            </Card>
        </div>
    );
}

// Sub-components
const StatBadge = ({ icon: Icon, value, label, color }) => {
    const colors = {
        green: 'from-green-500/10 to-emerald-500/10 border-green-500/20 text-green-500',
        purple: 'from-purple-500/10 to-indigo-500/10 border-purple-500/20 text-purple-400',
        blue: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-400',
        amber: 'from-amber-500/10 to-yellow-500/10 border-amber-500/20 text-amber-400',
    };

    return (
        <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            className={`p-4 rounded-2xl bg-gradient-to-br ${colors[color]} border backdrop-blur-sm`}
        >
            <div className="flex items-center gap-3">
                <Icon size={20} />
                <div>
                    <div className="text-xl font-bold text-[var(--text-primary)]">{value}</div>
                    <div className="text-xs text-[var(--text-secondary)]">{label}</div>
                </div>
            </div>
        </motion.div>
    );
};

const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center justify-between py-2 border-b border-[var(--border-light)] last:border-0">
        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <Icon size={14} />
            <span className="text-sm">{label}</span>
        </div>
        <span className="text-sm font-medium text-[var(--text-primary)]">{value}</span>
    </div>
);

const VehicleSpec = ({ label, value, mono, highlight }) => (
    <div className="p-3 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-light)]">
        <div className="text-xs text-[var(--text-muted)] mb-1">{label}</div>
        <div className={`font-medium ${mono ? 'font-mono text-xs' : 'text-sm'} ${highlight ? 'text-[var(--color-purple)]' : 'text-[var(--text-primary)]'}`}>
            {value}
        </div>
    </div>
);

const AchievementBadge = ({ icon: Icon, label, color }) => {
    const colors = {
        purple: 'from-purple-500/20 to-purple-600/10 text-purple-400',
        green: 'from-green-500/20 to-green-600/10 text-green-400',
        teal: 'from-teal-500/20 to-teal-600/10 text-teal-400',
        amber: 'from-amber-500/20 to-amber-600/10 text-amber-400',
        blue: 'from-blue-500/20 to-blue-600/10 text-blue-400',
    };

    return (
        <div className={`p-4 rounded-xl bg-gradient-to-br ${colors[color]} flex flex-col items-center gap-2 shrink-0 min-w-[80px]`}>
            <Icon size={24} />
            <span className="text-[10px] font-bold uppercase tracking-wide text-center whitespace-nowrap">{label}</span>
        </div>
    );
};

const QuickTile = ({ icon: Icon, label, value, color }) => {
    const colors = {
        purple: 'from-purple-500/10 to-purple-600/5 border-purple-500/20 text-purple-400',
        amber: 'from-amber-500/10 to-amber-600/5 border-amber-500/20 text-amber-400',
        teal: 'from-teal-500/10 to-teal-600/5 border-teal-500/20 text-teal-400',
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-3 rounded-xl bg-gradient-to-br ${colors[color]} border flex flex-col items-center justify-center text-center`}
        >
            <Icon size={18} className="mb-1" />
            <div className="text-xs font-bold text-[var(--text-primary)]">{value}</div>
            <div className="text-[10px] text-[var(--text-secondary)]">{label}</div>
        </motion.div>
    );
};
