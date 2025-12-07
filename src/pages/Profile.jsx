import React from 'react';
import Card from '../components/common/Card';
import { User, Mail, Phone, MapPin, Award, Calendar, CheckCircle } from 'lucide-react';

export default function Profile() {
    return (
        <div className="space-y-6">
            <div className="relative h-48 rounded-2xl overflow-hidden bg-gradient-to-r from-[var(--color-primary)] to-purple-800">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute -bottom-16 left-8 flex items-end">
                    <div className="w-32 h-32 rounded-full border-4 border-[var(--color-bg-dark)] overflow-hidden bg-[var(--color-bg-dark)]">
                        <img src="https://ui-avatars.com/api/?name=Alex+Morgan&background=random" alt="User" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-12">
                {/* Left Column: User Details */}
                <div className="space-y-6">
                    <Card>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Alex Morgan</h2>
                            <div className="text-[var(--text-secondary)]">Master Technician</div>
                        </div>

                        <div className="space-y-4">
                            <InfoRow icon={Mail} value="alex.morgan@example.com" />
                            <InfoRow icon={Phone} value="+91 98765 43210" />
                            <InfoRow icon={MapPin} value="Mumbai, India" />
                            <InfoRow icon={Award} value="Gold Member (5 Years)" />
                        </div>
                    </Card>

                    <Card title="Vehicle Details">
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-[var(--border-color)] pb-2">
                                <span className="text-[var(--text-secondary)] text-sm">Model</span>
                                <span className="text-[var(--text-primary)] font-medium">Tesla Model 3 Performance</span>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border-color)] pb-2">
                                <span className="text-[var(--text-secondary)] text-sm">VIN</span>
                                <span className="text-[var(--text-primary)] font-medium font-mono">5YJ3E1EA1JF1...</span>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border-color)] pb-2">
                                <span className="text-[var(--text-secondary)] text-sm">Year</span>
                                <span className="text-[var(--text-primary)] font-medium">2023</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[var(--text-secondary)] text-sm">Software</span>
                                <span className="text-[var(--text-primary)] font-medium">v11.1 (2024.32.10)</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Service History */}
                <div className="lg:col-span-2 space-y-6">
                    <Card title="Vehicle Health Status">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <StatusMetric label="Overall Health" value="98%" color="text-green-400" />
                            <StatusMetric label="Next Service" value="3,400 mi" color="text-orange-400" />
                            <StatusMetric label="Warranty" value="Active" color="text-blue-400" />
                        </div>
                    </Card>

                    <Card title="Service History">
                        <div className="space-y-6 mt-2">
                            {[
                                { date: 'Oct 12, 2024', service: 'Tire Rotation & Alignment', provider: 'Tesla Mumbai', cost: '₹2,500', status: 'Completed' },
                                { date: 'Aug 05, 2024', service: 'AC Filter Replacement', provider: 'Tesla Mumbai', cost: '₹1,200', status: 'Completed' },
                                { date: 'Feb 10, 2024', service: 'Annual Inspection', provider: 'Tesla Mumbai', cost: 'Free', status: 'Completed' },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-[var(--border-color)] hover:bg-[var(--bg-card-hover)] transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-full bg-green-500/10 text-green-500 mt-1">
                                            <CheckCircle size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[var(--text-primary)] text-lg">{item.service}</h4>
                                            <div className="text-sm text-[var(--text-secondary)]">{item.provider}</div>
                                            <div className="flex items-center gap-2 mt-1 text-xs text-[var(--text-muted)] md:hidden">
                                                <Calendar size={12} />
                                                <span>{item.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-row md:flex-col justify-between items-center md:items-end">
                                        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] hidden md:flex">
                                            <Calendar size={14} />
                                            <span>{item.date}</span>
                                        </div>
                                        <div className="font-bold text-[var(--text-primary)] text-lg">{item.cost}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

const InfoRow = ({ icon: Icon, value }) => (
    <div className="flex items-center gap-3 text-sm">
        <Icon size={18} className="text-[var(--color-primary)]" />
        <span className="text-[var(--text-primary)]">{value}</span>
    </div>
);

const StatusMetric = ({ label, value, color }) => (
    <div className="p-4 rounded-xl bg-[var(--bg-card-hover)] border border-[var(--border-color)]">
        <div className={`text-2xl font-bold mb-1 ${color}`}>{value}</div>
        <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">{label}</div>
    </div>
);
