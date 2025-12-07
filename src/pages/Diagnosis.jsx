import React from 'react';
import Card from '../components/common/Card';
import { motion } from 'framer-motion';
import { AlertCircle, Zap, Activity } from 'lucide-react';

export default function Diagnosis() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">System Diagnostics</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Failure Probability List */}
                <div className="space-y-6">
                    {[
                        { part: 'Brake Pads', prob: 86, risk: 'Critical', color: 'bg-red-500', text: 'text-red-500', alert: true },
                        { part: 'Oil Filter', prob: 45, risk: 'Moderate', color: 'bg-yellow-500', text: 'text-yellow-500' },
                        { part: 'HVAC Unit', prob: 12, risk: 'Low', color: 'bg-green-500', text: 'text-green-500' },
                        { part: 'Tire Pressure Sensor', prob: 89, risk: 'Critical', color: 'bg-red-500', text: 'text-red-500', alert: true },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className={`border-l-4 ${item.risk === 'Critical' ? 'border-l-red-500' : 'border-l-[var(--color-primary)]'}`}>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg bg-white/5 ${item.text}`}>
                                            <Zap size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg">{item.part}</h4>
                                            <div className="text-xs text-[var(--color-text-secondary)]">AI Confidence: 99.8%</div>
                                        </div>
                                    </div>
                                    {item.alert && (
                                        <div className="animate-pulse bg-red-500/20 text-red-500 p-2 rounded-full">
                                            <AlertCircle size={20} />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--color-text-secondary)]">Failure Probability</span>
                                        <span className={`font-bold ${item.text}`}>{item.prob}%</span>
                                    </div>
                                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className={`h-full ${item.color}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.prob}%` }}
                                            transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                        />
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
