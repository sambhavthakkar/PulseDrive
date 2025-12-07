import React from 'react';
import Card from '../components/common/Card';
import { Calendar, MapPin, Clock, Check } from 'lucide-react';

const SLOTS = [
    { id: 1, time: '09:00 AM', available: true },
    { id: 2, time: '10:30 AM', available: true },
    { id: 3, time: '01:00 PM', available: false },
    { id: 4, time: '02:30 PM', available: true },
    { id: 5, time: '04:00 PM', available: true },
];

export default function Scheduling() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Service Scheduling</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card title="Select Appointment" className="min-h-[300px]">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {SLOTS.map(slot => (
                                <button
                                    key={slot.id}
                                    disabled={!slot.available}
                                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${slot.available ? 'border-[var(--border-color)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 text-[var(--text-primary)]' : 'border-[var(--border-color)] bg-[var(--bg-card-hover)] opacity-50 cursor-not-allowed'}`}
                                >
                                    <Clock size={20} className={slot.available ? "text-[var(--color-primary)]" : "text-gray-500"} />
                                    <span className="font-bold">{slot.time}</span>
                                    <span className="text-xs text-[var(--color-text-muted)]">{slot.available ? 'Available' : 'Booked'}</span>
                                </button>
                            ))}
                        </div>
                    </Card>

                    <Card title="Service Center Location">
                        <div className="flex gap-4 items-start">
                            <div className="bg-white/5 p-4 rounded-xl">
                                <MapPin className="text-[var(--color-accent-red)]" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-[var(--text-primary)] text-lg">Tesla Service Center - Mumbai</h4>
                                <p className="text-[var(--text-secondary)]">42 Linking Road, Bandra West, Mumbai, MH 400050</p>
                                <div className="flex gap-2 mt-4">
                                    <span className="text-sm bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20">Parts Available</span>
                                    <span className="text-sm bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">Technician Ready</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div>
                    <Card title="Summary" className="h-full">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="text-sm text-[var(--color-text-secondary)]">Vehicle</div>
                                <div className="font-bold text-white">Tesla Model 3 Performance</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-sm text-[var(--color-text-secondary)]">Service Type</div>
                                <div className="font-bold text-white">Brake Fluid Replacement</div>
                                <div className="font-bold text-white">Tire Rotation</div>
                            </div>
                            <div className="h-px bg-white/10"></div>
                            <div className="flex justify-between items-center text-lg font-bold text-[var(--text-primary)]">
                                <span>Estimated Cost</span>
                                <span>₹0.00 <span className="text-xs text-[var(--text-muted)] font-medium">(Warranty)</span></span>
                            </div>

                            <button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-bold py-4 rounded-xl mt-8 flex items-center justify-center gap-2">
                                <Check size={20} />
                                Confirm Appointment
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
