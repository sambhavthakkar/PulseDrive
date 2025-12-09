import React from 'react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { motion } from 'framer-motion';
import { AlertCircle, Zap, Activity, CheckCircle, Info, Sparkles, Wrench, ArrowRight } from 'lucide-react';

export default function Diagnosis() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="h1 text-[var(--text-primary)]">System Diagnostics</h1>
                    <p className="body-reg text-[var(--text-secondary)]">Real-time vehicle health monitoring & predictive analysis</p>
                </div>
                <div className="flex gap-3">
                    <Badge variant="success" className="px-3 py-1 text-sm"><CheckCircle size={14} className="mr-1" /> System Active</Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Failure Probability List */}
                <div className="lg:col-span-8 space-y-4">
                    {[
                        {
                            part: 'Brake Pads',
                            prob: 86,
                            risk: 'Critical',
                            variant: 'error',
                            insight: 'Likely due to heavy city traffic & frequent braking',
                            lastService: 'Aug 10, 2024',
                            mileage: '3,100 km',
                            cost: '₹8,500',
                            life: '12%'
                        },
                        {
                            part: 'Oil Filter',
                            prob: 45,
                            risk: 'Moderate',
                            variant: 'warning',
                            insight: 'Performance degrading slightly faster than expected',
                            lastService: 'Sep 22, 2024',
                            mileage: '1,200 km',
                            cost: '₹1,200',
                            life: '45%'
                        },
                        {
                            part: 'HVAC Unit',
                            prob: 12,
                            risk: 'Normal',
                            variant: 'success',
                            insight: 'Operating within optimal efficiency parameters',
                            lastService: 'Jan 15, 2024',
                            mileage: '8,500 km',
                            cost: '₹25,000',
                            life: '88%'
                        },
                        {
                            part: 'Tire Pressure Sensor',
                            prob: 89,
                            risk: 'Critical',
                            variant: 'error',
                            alert: true,
                            insight: 'Signal intermittent (Right Front)',
                            lastService: '--',
                            mileage: '12,400 km',
                            cost: '₹4,800',
                            life: '0%'
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card noPadding className={`overflow-visible border-l-4 ${item.variant === 'error' ? 'border-l-[var(--color-error)]' :
                                item.variant === 'warning' ? 'border-l-[var(--color-warning)]' :
                                    'border-l-[var(--color-success)]'
                                } bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition-colors`}>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-start gap-4">
                                            <div className={`p-3 rounded-xl ${item.variant === 'error' ? 'bg-[var(--color-error)]/10 text-[var(--color-error)]' :
                                                item.variant === 'warning' ? 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]' :
                                                    'bg-[var(--color-success)]/10 text-[var(--color-success)]'
                                                }`}>
                                                {item.variant === 'error' ? <AlertCircle size={24} /> : item.variant === 'warning' ? <Zap size={24} /> : <CheckCircle size={24} />}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="h3 text-[var(--text-primary)]">{item.part}</h3>
                                                    {/* Tooltip Wrapper */}
                                                    <div className="relative group/tooltip">
                                                        <Info size={16} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer transition-colors" />
                                                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 bg-[var(--bg-overlay)] backdrop-blur-xl border border-[var(--border-subtle)] rounded-xl p-4 shadow-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 pointer-events-none transform translate-y-2 group-hover/tooltip:translate-y-0">
                                                            <div className="text-xs font-bold text-[var(--text-primary)] mb-2 uppercase tracking-wider border-b border-[var(--border-subtle)] pb-2">Component Details</div>
                                                            <div className="space-y-2 text-xs">
                                                                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Last Service</span> <span className="text-[var(--text-primary)]">{item.lastService}</span></div>
                                                                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Since Fix</span> <span className="text-[var(--text-primary)]">{item.mileage}</span></div>
                                                                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Est. Cost</span> <span className="text-[var(--text-primary)]">{item.cost}</span></div>
                                                                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Remaining Life</span> <span className={`font-bold ${item.variant === 'error' ? 'text-[var(--color-error)]' :
                                                                    item.variant === 'warning' ? 'text-[var(--color-warning)]' :
                                                                        'text-[var(--color-success)]'
                                                                    }`}>{item.life}</span></div>
                                                            </div>
                                                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[var(--bg-overlay)]"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 my-1.5">
                                                    <div className="text-xs text-[var(--text-secondary)]">Model Confidence: <span className="text-[var(--text-primary)] font-bold">99.8%</span></div>
                                                </div>

                                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 mt-1">
                                                    <Sparkles size={12} className="text-[var(--color-primary)]" />
                                                    <span className="text-xs font-medium text-[var(--color-primary)]">{item.insight}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {item.alert && (
                                            <div className="animate-pulse bg-[var(--color-error)]/10 text-[var(--color-error)] p-2 rounded-full border border-[var(--color-error)]/20">
                                                <AlertCircle size={20} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2 mt-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[var(--text-secondary)] font-medium">Failure Probability</span>
                                            <span className={`font-bold ${item.variant === 'error' ? 'text-[var(--color-error)]' :
                                                item.variant === 'warning' ? 'text-[var(--color-warning)]' :
                                                    'text-[var(--color-success)]'
                                                }`}>{item.prob}%</span>
                                        </div>
                                        {/* Animated Progress Bar */}
                                        <div className="h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden relative">
                                            <motion.div
                                                className={`h-full absolute top-0 left-0 ${item.variant === 'error' ? 'bg-[var(--color-error)]' :
                                                    item.variant === 'warning' ? 'bg-[var(--color-warning)]' :
                                                        'bg-[var(--color-success)]'
                                                    }`}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${item.prob}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.2, ease: "easeOut" }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Right Column: Summary & Actions */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="h-fit flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[var(--bg-card)] to-[var(--bg-elevated)]">
                        <div className="text-5xl font-bold bg-gradient-to-r from-[var(--color-error)] to-[var(--color-warning)] bg-clip-text text-transparent mb-2">
                            2
                        </div>
                        <h3 className="h3 text-[var(--text-primary)] mb-2">Critical Issues</h3>
                        <p className="body-reg text-[var(--text-muted)] mb-6">Immediate attention required for reliable operation.</p>
                        <Button variant="primary" className="w-full justify-center">
                            Schedule Service <ArrowRight size={16} />
                        </Button>
                    </Card>

                    <Card title="Root Cause Analysis" className="h-fit">
                        <div className="space-y-4">
                            <div className="p-4 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] hover:border-[var(--color-primary)]/30 transition-colors cursor-pointer group">
                                <h5 className="font-bold text-[var(--text-primary)] mb-1 group-hover:text-[var(--color-primary)] transition-colors">Brake Pad Wear Pattern</h5>
                                <p className="text-sm text-[var(--text-secondary)]">Irregular wear detected on rear-left pad indicating potential caliper misalignment.</p>
                            </div>
                            <div className="p-4 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] hover:border-[var(--color-primary)]/30 transition-colors cursor-pointer group">
                                <h5 className="font-bold text-[var(--text-primary)] mb-1 group-hover:text-[var(--color-primary)] transition-colors">Sensor Drift</h5>
                                <p className="text-sm text-[var(--text-secondary)]">Tire pressure sensor reporting noisy data consistent with signal interference.</p>
                            </div>
                        </div>
                    </Card>

                    <Card title="Maintenance Forecast" className="h-fit bg-[var(--color-info)]/5 border-[var(--color-info)]/20">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-[var(--color-info)]/20 rounded-lg text-[var(--color-info)]">
                                <Wrench size={18} />
                            </div>
                            <div>
                                <p className="text-sm text-[var(--text-secondary)] mb-1">Recommended Action</p>
                                <p className="text-sm font-bold text-[var(--text-primary)]">Full Brake System Inspection</p>
                                <p className="text-xs text-[var(--text-muted)] mt-2">Est. Time: 4 Hours</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
