import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, MapPin, Clock, Check, Sparkles, Navigation,
    Zap, Settings, Star, Info, ChevronRight, CheckCircle2
} from 'lucide-react';
import Card from '../components/common/Card';

const STEPS = ['Diagnosis', 'Schedule', 'Confirm'];

const SLOTS = [
    { id: 1, time: '09:00 AM', status: 'available', load: 'low' },
    { id: 2, time: '10:30 AM', status: 'recommended', load: 'low', badge: 'AI Integrated' },
    { id: 3, time: '01:00 PM', status: 'booked', load: 'high' },
    { id: 4, time: '02:30 PM', status: 'available', load: 'med' },
    { id: 5, time: '04:00 PM', status: 'available', load: 'low' },
    { id: 6, time: '05:30 PM', status: 'high-demand', load: 'high', badge: 'High Demand' },
];

export default function Scheduling() {
    const [selectedSlot, setSelectedSlot] = useState(2); // Default to AI recommended
    const [step, setStep] = useState(1); // 0: Diagnosis, 1: Schedule, 2: Confirm

    return (
        <div className="space-y-8 pb-10">
            {/* 1. Progress Stepper */}
            <div className="flex justify-center mb-8">
                <div className="flex items-center gap-4 bg-[var(--bg-card)] px-8 py-3 rounded-full border border-white/5 shadow-2xl">
                    {STEPS.map((label, index) => {
                        const isCompleted = index < step;
                        const isCurrent = index === step;
                        return (
                            <div key={label} className="flex items-center gap-3">
                                {index > 0 && <div className="w-8 h-0.5 bg-white/10" />}
                                <div className={`flex items-center gap-2 ${isCurrent ? 'text-white' : isCompleted ? 'text-green-400' : 'text-gray-600'}`}>
                                    <div className={`
                                        w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border
                                        ${isCurrent ? 'bg-[var(--color-purple)] border-[var(--color-purple)]' : isCompleted ? 'bg-green-500/20 border-green-500' : 'border-white/10'}
                                    `}>
                                        {isCompleted ? <Check size={12} /> : index + 1}
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: Slots & Center */}
                <div className="lg:col-span-2 flex flex-col gap-8 h-full">

                    {/* Time Slot Selection */}
                    <div className="shrink-0">
                        <Card title="Select Appointment"
                            icon={Clock}
                            className="overflow-visible"
                            headerAction={<div className="text-xs text-[var(--color-purple)] font-bold flex items-center gap-1"><Sparkles size={12} /> AI OPTIMIZED</div>}
                        >
                            {/* AI Insight Panel */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-[var(--color-purple)]/10 border border-[var(--color-purple)]/30 p-4 rounded-xl mb-6 flex gap-4 items-start"
                            >
                                <div className="p-2 bg-[var(--color-purple)]/20 rounded-lg shrink-0">
                                    <Zap size={18} className="text-[var(--color-purple)]" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-1">AI Recommendation</h4>
                                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                                        The <span className="text-white font-bold">10:30 AM</span> slot is optimal. Technician <span className="text-white">Amit S.</span> (4x4 Powertrain Specialist) is available, and parts for "Brake Fluid Replacement" are currently in stock. Estimated wait time: &lt;45 mins.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Slots Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {SLOTS.map(slot => (
                                    <TimeSlotCard
                                        key={slot.id}
                                        slot={slot}
                                        isSelected={selectedSlot === slot.id}
                                        onSelect={() => setSelectedSlot(slot.id)}
                                    />
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Service Center Details */}
                    <div className="flex-1">
                        <Card title="Service Center" icon={MapPin} className="h-full">
                            <div className="flex flex-col md:flex-row gap-6 h-full">
                                {/* Map Placeholder - Stretches */}
                                <div className="w-full md:w-48 bg-gray-800 rounded-xl overflow-hidden relative group min-h-[128px]">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3b82f640_0%,_transparent_70%)] opacity-50"></div>
                                    <svg className="w-full h-full opacity-20" patternUnits="userSpaceOnUse" width="20" height="20">
                                        <path d="M0 0h20v20H0z" fill="none" />
                                        <circle cx="10" cy="10" r="1" fill="white" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <MapPin size={32} className="text-[var(--color-primary)] drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] text-white font-bold flex items-center gap-1">
                                        <Navigation size={10} /> 1.2 mi
                                    </div>
                                </div>

                                {/* Center Info */}
                                <div className="flex-1 space-y-4 flex flex-col justify-center">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-white text-lg">Jeep Service Center - New Delhi</h4>
                                            <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20 text-yellow-400 text-xs font-bold">
                                                <Star size={10} fill="currentColor" /> 4.9
                                            </div>
                                        </div>
                                        <p className="text-sm text-[var(--text-secondary)] mt-1">A-16, Mathura Rd, Mohan Cooperative Industrial Estate, New Delhi, 110044</p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        <MetricBadge label="Tech Load" value="Moderate" color="text-amber-400" bg="bg-amber-500/10" border="border-amber-500/20" />
                                        <MetricBadge label="Wait Time" value="~45m" color="text-green-400" bg="bg-green-500/10" border="border-green-500/20" />
                                        <MetricBadge label="Parts" value="In Stock" color="text-blue-400" bg="bg-blue-500/10" border="border-blue-500/20" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* RIGHT COLUMN: Summary */}
                <div className="h-full">
                    <Card title="Appointment Summary" icon={Info} className="h-full border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 sticky top-6">
                        <div className="space-y-6">

                            {/* Items */}
                            <SummaryItem label="Customer" value="Sambhav Thakkar" sub="Premium Member" />
                            <div className="h-px bg-white/5" />
                            <SummaryItem label="Vehicle" value="Jeep Wrangler Rubicon 392" sub="VIN: 1C4...8X92" />
                            <div className="h-px bg-white/5" />
                            <SummaryItem
                                label="Service Type"
                                value="Brake Fluid Replacement"
                                sub="Linked to Dashboard Alert #CK-902"
                                highlight
                            />
                            <SummaryItem label="Add-ons" value="Tire Pressure Check" sub="Recommended (Low PSI)" />
                            <div className="h-px bg-white/5" />

                            {/* Dynamic Time */}
                            <div className="flex justify-between items-center p-4 bg-black/20 rounded-xl border border-white/5">
                                <div className="text-sm text-gray-400">Selected Time</div>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedSlot}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        className="text-right"
                                    >
                                        <div className="text-lg font-bold text-white">{SLOTS.find(s => s.id === selectedSlot)?.time}</div>
                                        <div className="text-xs text-[var(--color-purple)] font-bold">Oct 12, 2025</div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Total */}
                            <div className="pt-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm text-gray-400">Estimated Cost</span>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-white">₹0.00</div>
                                        <div className="text-xs text-green-400 font-bold">Covered by Warranty</div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <button className="w-full group relative overflow-hidden bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)]">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                <span className="relative flex items-center justify-center gap-2">
                                    Confirm Appointment <ChevronRight size={18} />
                                </span>
                            </button>

                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// --- Sub-Components ---

function TimeSlotCard({ slot, isSelected, onSelect }) {
    const isBooked = slot.status === 'booked';
    const isRecommended = slot.status === 'recommended';

    return (
        <button
            onClick={onSelect}
            disabled={isBooked}
            className={`
                relative p-4 rounded-xl border flex flex-col items-center gap-3 transition-all duration-300 group
                ${isSelected
                    ? 'border-[var(--color-purple)] bg-[var(--color-purple)]/10 shadow-[0_0_20px_rgba(168,85,247,0.3)] scale-[1.02]'
                    : isBooked
                        ? 'border-white/5 bg-black/20 opacity-50 cursor-not-allowed grayscale'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1'
                }
            `}
        >
            {isRecommended && (
                <div className="absolute -top-2.5 bg-[var(--color-purple)] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                    <Sparkles size={8} fill="currentColor" /> AI Pick
                </div>
            )}

            {isSelected && (
                <div className="absolute top-2 right-2">
                    <CheckCircle2 size={16} className="text-[var(--color-purple)]" />
                </div>
            )}

            <Clock size={20} className={isSelected ? "text-[var(--color-purple)]" : isBooked ? "text-gray-600" : "text-gray-400"} />

            <div className="text-center">
                <div className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-gray-300'}`}>{slot.time}</div>
                <div className={`text-[10px] font-medium uppercase tracking-wide mt-1 ${isSelected ? 'text-[var(--color-purple)]' : isBooked ? 'text-red-900' : 'text-gray-500'
                    }`}>
                    {slot.status.replace('-', ' ')}
                </div>
            </div>
        </button>
    );
}

function MetricBadge({ label, value, color, bg, border }) {
    return (
        <div className={`flex flex-col items-center p-2 rounded-lg border ${bg} ${border}`}>
            <span className="text-[10px] text-gray-400 uppercase font-bold">{label}</span>
            <span className={`text-xs font-bold mt-0.5 ${color}`}>{value}</span>
        </div>
    );
}

function SummaryItem({ label, value, sub, highlight }) {
    return (
        <div>
            <div className="text-xs text-[var(--color-text-secondary)] mb-1 uppercase tracking-wider">{label}</div>
            <div className={`font-bold ${highlight ? 'text-[var(--color-purple)]' : 'text-white'}`}>{value}</div>
            {sub && <div className="text-xs text-gray-500 mt-0.5">{sub}</div>}
        </div>
    );
}
