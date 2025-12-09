import React from 'react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { motion } from 'framer-motion';
import {
    User, Mail, Phone, MapPin, Award, Calendar, CheckCircle,
    Shield, Zap, Car, Gauge, Star, TrendingUp, Clock,
    BadgeCheck, Crown, Sparkles, Battery, Wrench, Menu
} from 'lucide-react';
import { cn } from '../utils/cn';

export default function Profile() {
    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            {/* Hero Banner with Glassmorphism */}
            <div className="relative h-auto md:h-56 rounded-[var(--radius-card)] overflow-hidden bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/80 via-indigo-600/80 to-purple-900/80">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzMiAyIDIgNC0yIDQtMiA0LTItMi0yLTRzMiAyIDIgNC0yIDQtMiA0LTItMi0yLTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
                </div>

                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-app)] to-transparent"></div>

                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col md:flex-row items-end gap-6 h-full mt-20 md:mt-0">
                    {/* Avatar with Ring */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative shrink-0"
                    >
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full p-1 bg-gradient-to-tr from-[var(--color-primary)] to-pink-500 shadow-2xl">
                            <div className="w-full h-full rounded-full overflow-hidden bg-[var(--bg-card)] border-4 border-[var(--bg-app)]">
                                <img src="https://ui-avatars.com/api/?name=Sambhav+Thakkar&background=6366f1&color=fff&size=128&bold=true" alt="User" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        {/* Verified Badge */}
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg border-2 border-[var(--bg-app)]">
                            <BadgeCheck size={16} className="text-white" />
                        </div>
                    </motion.div>

                    {/* Name & Title */}
                    <div className="flex-1 pb-2 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-3 mb-1">
                            <h1 className="text-3xl font-bold text-white">Sambhav Thakkar</h1>
                            <Badge variant="warning" className="text-xs">
                                <Crown size={12} className="mr-1" /> Premium
                            </Badge>
                        </div>
                        <p className="text-white/70">Lead Systems Architect • Founding Member</p>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button className="flex-1 md:flex-none bg-white/10 backdrop-blur text-white border-white/20 hover:bg-white/20">
                            Edit Profile
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatBadge icon={Gauge} value="94%" label="Health Score" variant="success" />
                <StatBadge icon={TrendingUp} value="1,200 km" label="Until Service" variant="primary" />
                <StatBadge icon={Shield} value="Platinum" label="Warranty" variant="info" />
                <StatBadge icon={Star} value="4.9" label="Driver Score" variant="warning" />
            </div>

            {/* Row 1: Contact Info + Upcoming Appointment - Same Height */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Contact Info */}
                <Card className="h-full">
                    <h3 className="h3 text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <User size={18} className="text-[var(--color-primary)]" />
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
                    className="h-full p-6 rounded-[var(--radius-card)] bg-[var(--color-info)]/5 border border-[var(--color-info)]/20"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2 text-[var(--color-info)]">
                            <Clock size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider">Next Appointment</span>
                        </div>
                        <div className="p-2 rounded-xl bg-[var(--color-info)]/10">
                            <Calendar size={20} className="text-[var(--color-info)]" />
                        </div>
                    </div>
                    <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-1">December 20, 2025</h4>
                    <p className="text-[var(--text-secondary)] mb-4">Annual Inspection & System Check</p>
                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                        <div>
                            <p className="text-xs text-[var(--text-muted)]">Location</p>
                            <p className="text-sm text-[var(--text-primary)] font-medium">Pulse Hub - Mumbai</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-[var(--text-muted)]">Time</p>
                            <p className="text-sm text-[var(--color-info)] font-bold">10:30 AM</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Row 2: Vehicle Info + Maintenance Score - Same Height */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Vehicle Card */}
                <div className="rounded-[var(--radius-card)] overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)] h-full">
                    {/* Vehicle Image */}
                    <div className="relative h-48 bg-[var(--bg-elevated)] overflow-hidden">
                        {/* Background Effect */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-10"></div>
                        <img
                            src="https://pngimg.com/d/jeep_PNG48.png"
                            alt="Jeep Wrangler"
                            className="w-full h-full object-contain p-2 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] relative z-10"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent"></div>
                        {/* Connected Badge */}
                        <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-[var(--color-success)]/20 border border-[var(--color-success)]/30 flex items-center gap-1.5 backdrop-blur-md z-20">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse"></span>
                            <span className="text-[10px] text-[var(--color-success)] font-bold">Connected</span>
                        </div>
                    </div>

                    {/* Vehicle Info */}
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="h3 text-[var(--text-primary)]">Jeep Wrangler</h3>
                                <p className="body-reg text-[var(--text-secondary)]">Rubicon 392 • 2024</p>
                            </div>
                            <div className="p-2 rounded-xl bg-[var(--color-primary)]/10">
                                <Car size={24} className="text-[var(--color-primary)]" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <VehicleSpec label="VIN" value="1C4-JJ-392-X9" mono />
                            <VehicleSpec label="PulseOS" value="v2.4.0" highlight />
                            <VehicleSpec label="Engine" value="6.4L V8 HEMI" />
                            <VehicleSpec label="Transmission" value="8-Speed Auto" />
                        </div>
                    </div>
                </div>

                {/* Maintenance Score + Quick Tiles */}
                <div className="space-y-4 h-full flex flex-col">
                    {/* Maintenance Score */}
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="flex-1 p-6 rounded-[var(--radius-card)] bg-[var(--color-success)]/5 border border-[var(--color-success)]/20"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2 text-[var(--color-success)]">
                                <TrendingUp size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">Maintenance Score</span>
                            </div>
                            <div className="w-14 h-14 rounded-full border-4 border-[var(--color-success)] flex items-center justify-center bg-[var(--color-success)]/10">
                                <span className="text-[var(--color-success)] font-bold text-lg">98</span>
                            </div>
                        </div>
                        <h4 className="text-3xl font-bold text-[var(--text-primary)] mb-1">A+</h4>
                        <p className="text-[var(--text-secondary)]">Excellent condition</p>
                        <p className="text-sm text-[var(--color-success)] mt-3">🏆 Top 5% of Compass owners</p>
                    </motion.div>

                    {/* Quick Tiles Row */}
                    <div className="grid grid-cols-3 gap-3">
                        <QuickTile icon={Shield} label="Insurance" value="Active" variant="primary" />
                        <QuickTile icon={Award} label="Warranty" value="3 Years" variant="warning" />
                        <QuickTile icon={Battery} label="Battery" value="45%" variant="info" />
                    </div>
                </div>
            </div>

            {/* Row 3: Service History - Full Width */}
            <Card>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="h3 text-[var(--text-primary)] flex items-center gap-2">
                        <Wrench size={18} className="text-[var(--color-primary)]" />
                        Service History
                    </h3>
                    <Badge variant="outline">
                        3 services this year
                    </Badge>
                </div>

                {/* Service History Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider border-b border-[var(--border-subtle)]">
                    <div className="col-span-5">Service</div>
                    <div className="col-span-3">Provider</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2 text-right">Cost</div>
                </div>

                <div className="divide-y divide-[var(--border-subtle)]">
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
                            className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-4 py-4 hover:bg-[var(--bg-elevated)] transition-colors group cursor-default rounded-lg"
                        >
                            <div className="col-span-5 flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-[var(--color-success)]/10 text-[var(--color-success)] shrink-0">
                                    <CheckCircle size={16} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors">{item.service}</h4>
                                    <div className="md:hidden mt-1">
                                        <Badge variant={item.type === 'remote' ? 'info' : 'warning'} className="text-[10px] px-2 py-0.5">
                                            {item.type === 'remote' ? '🌐 Remote' : '🏢 In-Person'}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-3 flex items-center text-sm text-[var(--text-secondary)]">
                                {item.provider}
                                <span className="hidden md:inline-block ml-2">
                                    <Badge variant={item.type === 'remote' ? 'info' : 'warning'} className="text-[10px] px-2 py-0.5">
                                        {item.type === 'remote' ? 'Remote' : 'In-Person'}
                                    </Badge>
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

                <Button variant="ghost" className="w-full mt-4 justify-center text-[var(--text-secondary)]">
                    View Complete History
                </Button>
            </Card>

            {/* Achievements Row */}
            <Card>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2 uppercase tracking-wider">
                    <Sparkles size={14} className="text-[var(--color-warning)]" />
                    Achievements & Badges
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                    <AchievementBadge icon={Zap} label="Early Adopter" variant="primary" />
                    <AchievementBadge icon={Shield} label="Safety Pro" variant="success" />
                    <AchievementBadge icon={TrendingUp} label="Eco Driver" variant="info" />
                    <AchievementBadge icon={Star} label="5★ Rating" variant="warning" />
                    <AchievementBadge icon={Crown} label="Premium" variant="primary" />
                    <AchievementBadge icon={Gauge} label="Power User" variant="info" />
                </div>
            </Card>
        </div>
    );
}

// Sub-components
const StatBadge = ({ icon: Icon, value, label, variant }) => {
    const variants = {
        primary: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20',
        success: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20',
        info: 'bg-[var(--color-info)]/10 text-[var(--color-info)] border-[var(--color-info)]/20',
        warning: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/20',
    };

    return (
        <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            className={cn("p-4 rounded-[var(--radius-card)] border backdrop-blur-sm", variants[variant])}
        >
            <div className="flex items-center gap-3">
                <Icon size={24} />
                <div>
                    <div className="text-xl font-bold text-[var(--text-primary)]">{value}</div>
                    <div className="text-xs text-[var(--text-secondary)]">{label}</div>
                </div>
            </div>
        </motion.div>
    );
};

const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)] last:border-0">
        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <Icon size={16} />
            <span className="text-sm">{label}</span>
        </div>
        <span className="text-sm font-medium text-[var(--text-primary)]">{value}</span>
    </div>
);

const VehicleSpec = ({ label, value, mono, highlight }) => (
    <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
        <div className="text-xs text-[var(--text-muted)] mb-1">{label}</div>
        <div className={cn(
            "font-medium",
            mono && 'font-mono text-xs',
            !mono && 'text-sm',
            highlight ? 'text-[var(--color-primary)]' : 'text-[var(--text-primary)]'
        )}>
            {value}
        </div>
    </div>
);

const AchievementBadge = ({ icon: Icon, label, variant }) => {
    const variants = {
        primary: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
        success: 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
        info: 'bg-[var(--color-info)]/10 text-[var(--color-info)]',
        warning: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
    };

    return (
        <div className={cn("p-4 rounded-xl flex flex-col items-center gap-2 shrink-0 min-w-[100px] border border-transparent hover:border-[var(--border-subtle)] transition-colors", variants[variant])}>
            <Icon size={24} />
            <span className="text-[10px] font-bold uppercase tracking-wide text-center whitespace-nowrap">{label}</span>
        </div>
    );
};

const QuickTile = ({ icon: Icon, label, value, variant }) => {
    const variants = {
        primary: 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]/20 text-[var(--color-primary)]',
        warning: 'bg-[var(--color-warning)]/10 border-[var(--color-warning)]/20 text-[var(--color-warning)]',
        info: 'bg-[var(--color-info)]/10 border-[var(--color-info)]/20 text-[var(--color-info)]',
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn("p-3 rounded-xl border flex flex-col items-center justify-center text-center", variants[variant])}
        >
            <Icon size={18} className="mb-1" />
            <div className="text-xs font-bold text-[var(--text-primary)]">{value}</div>
            <div className="text-[10px] text-[var(--text-secondary)] opacity-80">{label}</div>
        </motion.div>
    );
};
