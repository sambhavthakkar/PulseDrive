import React from 'react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, TrendingUp, Cpu } from 'lucide-react';
import { cn } from '../utils/cn';

const DEFECT_DATA = [
    { quarter: 'Q1', defects: 12 },
    { quarter: 'Q2', defects: 19 },
    { quarter: 'Q3', defects: 8 },
    { quarter: 'Q4', defects: 5 },
];

export default function Manufacturing() {
    return (
        <div className="space-y-6">
            <h1 className="h1 text-[var(--text-primary)]">Manufacturing Insights</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Heatmap Section */}
                <div className="lg:col-span-2">
                    <Card title="Component Failure Heatmap" className="min-h-[400px]" noPadding={false}>
                        <div className="flex flex-col gap-4">
                            <p className="text-[var(--text-secondary)] text-sm mb-4">
                                Visual representation of component failure density across vehicle subsystems.
                            </p>
                            <HeatmapGrid />
                        </div>
                    </Card>
                </div>

                {/* Trends Chart */}
                <div className="lg:col-span-1">
                    <Card title="Quarterly Defect Trends" className="h-[400px]">
                        <div className="h-[300px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={DEFECT_DATA}>
                                    <XAxis
                                        dataKey="quarter"
                                        stroke="var(--text-secondary)"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{
                                            backgroundColor: 'var(--bg-elevated)',
                                            border: '1px solid var(--border-subtle)',
                                            borderRadius: '12px',
                                            boxShadow: 'var(--shadow-lg)'
                                        }}
                                        itemStyle={{ color: 'var(--text-primary)' }}
                                    />
                                    <Bar dataKey="defects" radius={[4, 4, 0, 0]}>
                                        {DEFECT_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.defects > 10 ? 'var(--color-error)' : 'var(--color-brand-primary)'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Design Improvements */}
            <h3 className="h3 text-[var(--text-primary)] mt-4">Design Improvement Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: 'Brake Caliper Redesign', impact: 'High', type: 'Design', icon: Cpu, variant: 'warning' },
                    { title: 'Battery Thermal Paste', impact: 'Medium', type: 'Process', icon: TrendingUp, variant: 'info' },
                    { title: 'Sensor Calibration Logic', impact: 'Critical', type: 'Software', icon: AlertTriangle, variant: 'error' },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="hover:border-[var(--color-primary)] transition-colors cursor-pointer bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)]">
                            <div className="flex items-start justify-between mb-4">
                                <div className={cn(
                                    "p-3 rounded-xl",
                                    item.variant === 'error' ? 'bg-[var(--color-error)]/10 text-[var(--color-error)]' :
                                        item.variant === 'warning' ? 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]' :
                                            'bg-[var(--color-info)]/10 text-[var(--color-info)]'
                                )}>
                                    <item.icon size={24} />
                                </div>
                                <Badge variant={item.variant} className="opacity-100">
                                    {item.impact} Impact
                                </Badge>
                            </div>
                            <h4 className="font-bold text-[var(--text-primary)] mb-2">{item.title}</h4>
                            <p className="text-[var(--text-secondary)] text-sm">Suggested improvement based on recent RCA analysis.</p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// Simple Grid Heatmap Component
const HeatmapGrid = () => {
    // 5x8 Grid
    const rows = 5;
    const cols = 8;

    return (
        <div className="grid grid-cols-8 gap-2">
            {[...Array(rows * cols)].map((_, i) => {
                // Random intensity
                const intensity = Math.random();
                const colorClass = intensity > 0.8 ? 'bg-[var(--color-error)]' :
                    intensity > 0.5 ? 'bg-[var(--color-warning)]' :
                        intensity > 0.2 ? 'bg-[var(--color-warning)]/60' : 'bg-[var(--color-success)]/40';

                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.01 }}
                        className={cn(
                            "aspect-square rounded-md opacity-80 hover:opacity-100 hover:scale-110 transition-all cursor-pointer relative group",
                            colorClass
                        )}
                    >
                        {/* Tooltip on Hover */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-[var(--bg-overlay)] text-[var(--text-primary)] text-xs rounded border border-[var(--border-subtle)] opacity-0 group-hover:opacity-100 pointer-events-none z-20 shadow-lg">
                            Zone {i + 1}: {(intensity * 100).toFixed(0)}% defects
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
