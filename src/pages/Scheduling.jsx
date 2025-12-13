import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, MapPin, Clock, Check, Sparkles, Navigation,
    Zap, Star, Info, ChevronRight, CheckCircle2
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { cn } from '../utils/cn';
import { findAvailableSlots, confirmBooking } from '../services/backendApi';

const STEPS = ['Diagnosis', 'Schedule', 'Confirm'];

export default function Scheduling() {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [step, setStep] = useState(1); // 0: Diagnosis, 1: Schedule, 2: Confirm
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookingStatus, setBookingStatus] = useState(null);

    const [email, setEmail] = useState(''); // New state for email

    useEffect(() => {
        loadSlots();
    }, []);

    const loadSlots = async () => {
        setLoading(true);
        try {
            const data = await findAvailableSlots();
            // Transform backend data to frontend format
            const formattedSlots = data.map(s => {
                const date = new Date(s.slot_time);
                return {
                    id: s.slot_id,
                    time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    fullDate: date,
                    status: 'available',
                    load: 'low', // Mock load
                    centerName: s.center_name
                };
            });
            setSlots(formattedSlots);
            // Select first slot by default if available
            if (formattedSlots.length > 0) {
                setSelectedSlot(formattedSlots[0].id);
            }
        } catch (error) {
            console.error("Failed to load slots", error);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async () => {
        if (!selectedSlot || !email) return; // Validate email

        setBookingStatus('processing');
        try {
            const slot = slots.find(s => s.id === selectedSlot);
            await confirmBooking({
                vehicle_id: "V101", // Mock vehicle ID
                owner: { name: "Sambhav Thakkar", contact: "sambhav@example.com" },
                email: email, // Pass email to backend
                slot_id: slot.id,
                service_type: "brake_service" // Mock service type
            });
            setBookingStatus('confirmed');
            setStep(3); // Move to completion (or next step)
        } catch (error) {
            console.error("Booking failed", error);
            setBookingStatus('error');
        }
    };

    const selectedSlotData = slots.find(s => s.id === selectedSlot);

    return (
        <div className="space-y-8 pb-10 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="h1 text-[var(--text-primary)]">Schedule Service</h1>
                    <p className="body-reg text-[var(--text-secondary)]">AI-optimized booking for your vehicle maintenance</p>
                </div>
            </div>

            {/* 1. Progress Stepper */}
            <div className="flex justify-center mb-8">
                <div className="flex items-center gap-4 bg-[var(--bg-card)] px-8 py-4 rounded-full border border-[var(--border-subtle)] shadow-lg">
                    {STEPS.map((label, index) => {
                        const isCompleted = index < step;
                        const isCurrent = index === step;
                        return (
                            <div key={label} className="flex items-center gap-3">
                                {index > 0 && <div className="w-8 h-0.5 bg-[var(--border-subtle)]" />}
                                <div className={cn("flex items-center gap-2", isCurrent ? 'text-[var(--text-primary)]' : isCompleted ? 'text-[var(--color-success)]' : 'text-[var(--text-muted)]')}>
                                    <div className={cn(
                                        "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors",
                                        isCurrent ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' :
                                            isCompleted ? 'bg-[var(--color-success)]/20 border-[var(--color-success)] text-[var(--color-success)]' :
                                                'border-[var(--border-subtle)] bg-[var(--bg-elevated)]'
                                    )}>
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
                        <Card
                            title="Select Appointment"
                            className="overflow-visible"
                            actionItem={
                                <Badge variant="primary" className="flex items-center gap-1"><Sparkles size={12} /> AI OPTIMIZED</Badge>
                            }
                        >
                            {/* AI Insight Panel */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 p-4 rounded-xl mb-6 flex gap-4 items-start"
                            >
                                <div className="p-2 bg-[var(--color-primary)]/10 rounded-lg shrink-0 text-[var(--color-primary)]">
                                    <Zap size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">AI Recommendation</h4>
                                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                                        Based on your vehicle's telemetry, we've found optimal slots at <span className="text-[var(--text-primary)] font-bold">Jeep Service Center - North</span>. Parts are in stock.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Slots Grid Grouped by Date */}
                            {loading ? (
                                <div className="text-center py-10 text-[var(--text-muted)]">Loading available slots...</div>
                            ) : slots.length === 0 ? (
                                <div className="text-center py-10 text-[var(--text-muted)]">No slots available for the next 3 days.</div>
                            ) : (
                                <div className="space-y-6">
                                    {Object.entries(slots.reduce((acc, slot) => {
                                        const dateLabel = slot.fullDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
                                        if (!acc[dateLabel]) acc[dateLabel] = [];
                                        acc[dateLabel].push(slot);
                                        return acc;
                                    }, {})).map(([date, daySlots]) => (
                                        <div key={date}>
                                            <h5 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-3 pl-1 border-l-2 border-[var(--color-primary)] ml-1">
                                                {date}
                                            </h5>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {daySlots.map(slot => (
                                                    <TimeSlotCard
                                                        key={slot.id}
                                                        slot={slot}
                                                        isSelected={selectedSlot === slot.id}
                                                        onSelect={() => setSelectedSlot(slot.id)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>
                    </div>

                    {/* Service Center Details */}
                    <div className="flex-1">
                        <Card title="Service Center">
                            <div className="flex flex-col md:flex-row gap-6 h-full">
                                {/* Map Placeholder - Stretches */}
                                <div className="w-full md:w-48 bg-[var(--bg-elevated)] rounded-xl overflow-hidden relative group min-h-[128px]">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary-transparent)_0%,transparent_70%)] opacity-30"></div>
                                    <svg className="w-full h-full opacity-10" patternUnits="userSpaceOnUse" width="20" height="20">
                                        <path d="M0 0h20v20H0z" fill="none" />
                                        <circle cx="10" cy="10" r="1" fill="currentColor" className="text-[var(--text-muted)]" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <MapPin size={32} className="text-[var(--color-primary)] drop-shadow-[0_0_10px_rgba(var(--color-brand-primary-rgb),0.5)]" />
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] text-white font-bold flex items-center gap-1">
                                        <Navigation size={10} /> 1.2 mi
                                    </div>
                                </div>

                                {/* Center Info */}
                                <div className="flex-1 space-y-4 flex flex-col justify-center">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-[var(--text-primary)] text-lg">
                                                {selectedSlotData?.centerName || "Jeep Service Center"}
                                            </h4>
                                            <Badge variant="warning" className="flex items-center gap-1 text-xs">
                                                <Star size={10} fill="currentColor" /> 4.9
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-[var(--text-secondary)] mt-1">Authorized Service Partner</p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        <MetricBadge label="Tech Load" value="Moderate" variant="warning" />
                                        <MetricBadge label="Wait Time" value="~45m" variant="success" />
                                        <MetricBadge label="Parts" value="In Stock" variant="info" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* RIGHT COLUMN: Summary */}
                <div className="h-full">
                    <Card title="Appointment Summary" className="border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 sticky top-6">
                        <div className="space-y-6">

                            {/* Items */}
                            <SummaryItem label="Customer" value="Sambhav Thakkar" sub="Premium Member" />
                            <div className="h-px bg-[var(--border-subtle)]" />
                            <SummaryItem label="Vehicle" value="Jeep Wrangler Rubicon 392" sub="VIN: 1C4...8X92" />
                            <div className="h-px bg-[var(--border-subtle)]" />
                            <SummaryItem
                                label="Service Type"
                                value="Brake Fluid Replacement"
                                sub="Linked to Dashboard Alert #CK-902"
                                highlight
                            />
                            <SummaryItem label="Add-ons" value="Tire Pressure Check" sub="Recommended (Low PSI)" />
                            <div className="h-px bg-[var(--border-subtle)]" />

                            {/* Dynamic Time */}
                            <div className="flex justify-between items-center p-4 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
                                <div className="text-sm text-[var(--text-secondary)]">Selected Time</div>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedSlot}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        className="text-right"
                                    >
                                        <div className="text-lg font-bold text-[var(--text-primary)]">
                                            {selectedSlotData?.time || "--:--"}
                                        </div>
                                        <div className="text-xs text-[var(--color-primary)] font-bold">
                                            {selectedSlotData?.fullDate?.toLocaleDateString() || "Select a slot"}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Total */}
                            <div className="pt-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm text-[var(--text-secondary)]">Estimated Cost</span>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-[var(--text-primary)]">₹3,500.00</div>
                                        <div className="text-xs text-[var(--color-success)] font-bold">Covered by Warranty</div>
                                    </div>
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Confirmation Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full px-3 py-2 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                                />
                            </div>

                            {/* CTA */}
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full justify-center py-4 text-base shadow-[0_0_30px_rgba(var(--color-brand-primary-rgb),0.3)] hover:shadow-[0_0_50px_rgba(var(--color-brand-primary-rgb),0.5)]"
                                icon={ChevronRight}
                                iconPosition="right"
                                onClick={handleConfirm}
                                disabled={!selectedSlot || !email || bookingStatus === 'processing' || bookingStatus === 'confirmed'}
                            >
                                {bookingStatus === 'processing' ? 'Confirming...' :
                                    bookingStatus === 'confirmed' ? 'Confirmed! Check Email' : 'Confirm Appointment'}
                            </Button>

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
            className={cn(
                "relative p-4 rounded-xl border flex flex-col items-center gap-3 transition-all duration-300 group",
                isSelected
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-[0_0_20px_rgba(var(--color-brand-primary-rgb),0.3)] scale-[1.02]'
                    : isBooked
                        ? 'border-transparent bg-[var(--bg-elevated)] opacity-50 cursor-not-allowed grayscale'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-hover)] hover:border-[var(--border-strong)] hover:-translate-y-1'
            )}
        >
            {isRecommended && (
                <div className="absolute -top-2.5 bg-[var(--color-primary)] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                    <Sparkles size={8} fill="currentColor" /> AI Pick
                </div>
            )}

            {isSelected && (
                <div className="absolute top-2 right-2">
                    <CheckCircle2 size={16} className="text-[var(--color-primary)]" />
                </div>
            )}

            <Clock size={20} className={isSelected ? "text-[var(--color-primary)]" : isBooked ? "text-[var(--text-muted)]" : "text-[var(--text-secondary)]"} />

            <div className="text-center">
                <div className={cn("font-bold text-lg", isSelected ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]')}>{slot.time}</div>
                <div className={cn("text-[10px] font-medium uppercase tracking-wide mt-1",
                    isSelected ? 'text-[var(--color-primary)]' :
                        isBooked ? 'text-[var(--color-error)]' :
                            'text-[var(--text-muted)]'
                )}>
                    {slot.status.replace('-', ' ')}
                </div>
            </div>
        </button>
    );
}

function MetricBadge({ label, value, variant }) {
    const variants = {
        warning: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/20',
        success: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20',
        info: 'bg-[var(--color-info)]/10 text-[var(--color-info)] border-[var(--color-info)]/20'
    };

    return (
        <div className={cn("flex flex-col items-center p-2 rounded-lg border", variants[variant])}>
            <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold">{label}</span>
            <span className="text-xs font-bold mt-0.5">{value}</span>
        </div>
    );
}

function SummaryItem({ label, value, sub, highlight }) {
    return (
        <div>
            <div className="text-xs text-[var(--text-secondary)] mb-1 uppercase tracking-wider">{label}</div>
            <div className={cn("font-bold text-sm", highlight ? 'text-[var(--color-primary)]' : 'text-[var(--text-primary)]')}>{value}</div>
            {sub && <div className="text-xs text-[var(--text-muted)] mt-0.5">{sub}</div>}
        </div>
    );
}
