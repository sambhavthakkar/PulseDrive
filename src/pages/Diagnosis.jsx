import React from 'react';
import Card from '../components/common/Card';
import { motion } from 'framer-motion';
import { AlertCircle, Zap, Activity, CheckCircle, Info, Sparkles } from 'lucide-react';

export default function Diagnosis() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">System Diagnostics</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Failure Probability List */}
                <div className="space-y-6">
                    {[
                        {
                            part: 'Brake Pads',
                            prob: 86,
                            risk: 'Critical',
                            color: 'bg-red-500',
                            text: 'text-red-500',
                            alert: true,
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
                            color: 'bg-yellow-500',
                            text: 'text-yellow-500',
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
                            color: 'bg-green-500',
                            text: 'text-green-500',
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
                            color: 'bg-red-500',
                            text: 'text-red-500',
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
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative"
                        >
                            <Card className={`overflow-visible border-l-4 ${item.risk === 'Critical' ? 'border-l-red-500' : item.risk === 'Moderate' ? 'border-l-yellow-500' : 'border-l-green-500'}`}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-lg bg-white/5 ${item.text} mt-1`}>
                                            {item.risk === 'Critical' ? <AlertCircle size={20} /> : item.risk === 'Moderate' ? <Zap size={20} /> : <CheckCircle size={20} />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-white text-lg">{item.part}</h4>
                                                {/* Tooltip Trigger */}
                                                <div className="relative group/tooltip">
                                                    <Info size={14} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
                                                    {/* Tooltip Content */}
                                                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 pointer-events-none transform translate-y-2 group-hover/tooltip:translate-y-0">
                                                        <div className="text-xs font-bold text-white mb-2 uppercase tracking-wider border-b border-white/10 pb-2">Component Details</div>
                                                        <div className="space-y-2 text-xs">
                                                            <div className="flex justify-between"><span className="text-gray-400">Last Service</span> <span className="text-white">{item.lastService}</span></div>
                                                            <div className="flex justify-between"><span className="text-gray-400">Since Fix</span> <span className="text-white">{item.mileage}</span></div>
                                                            <div className="flex justify-between"><span className="text-gray-400">Est. Cost</span> <span className="text-white">{item.cost}</span></div>
                                                            <div className="flex justify-between"><span className="text-gray-400">Remaining Life</span> <span className={`font-bold ${item.text}`}>{item.life}</span></div>
                                                        </div>
                                                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black/90"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 my-1">
                                                <div className="text-xs text-[var(--color-text-secondary)]">Model Confidence: <span className="text-white">99.8%</span></div>
                                            </div>

                                            {/* AI Insight Badge */}
                                            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[var(--color-purple)]/10 border border-[var(--color-purple)]/20 mt-1">
                                                <Sparkles size={10} className="text-[var(--color-purple)]" />
                                                <span className="text-[10px] font-medium text-[var(--color-purple)]">{item.insight}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Alert Icon (Top Right) */}
                                    {item.alert && (
                                        <div className="animate-pulse bg-red-500/10 text-red-500 p-1.5 rounded-full border border-red-500/20">
                                            <AlertCircle size={16} />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2 mt-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--color-text-secondary)]">Failure Probability</span>
                                        <span className={`font-bold ${item.text}`}>{item.prob}%</span>
                                    </div>
                                    {/* Animated Progress Bar */}
                                    <div className="h-2.5 bg-white/5 rounded-full overflow-hidden relative">
                                        <motion.div
                                            className={`h-full absolute top-0 left-0 ${item.color}`}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.prob}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.2, ease: "easeOut" }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
                                        </motion.div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Right Column: Time to Failure & Summary */}
                <div className="space-y-6">
                    <Card title="Diagnostic Summary" className="h-[200px] flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-5xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-2">
                                2 Critical
                            </div>
                            <div className="text-[var(--color-text-secondary)]">Issues require immediate attention</div>
                        </div>
                    </Card>

                    <Card title="Root Cause Analysis">
                        <div className="space-y-4">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                <h5 className="font-bold text-white mb-1">Brake Pad Wear Pattern</h5>
                                <p className="text-sm text-[var(--color-text-secondary)]">Irregular wear detected on rear-left pad indicating potential caliper misalignment.</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                <h5 className="font-bold text-white mb-1">Sensor Drift</h5>
                                <p className="text-sm text-[var(--color-text-secondary)]">Tire pressure sensor reporting noisy data consistent with signal interference.</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
