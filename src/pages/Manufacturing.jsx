import React from 'react';
import Card from '../components/common/Card';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, TrendingUp, Cpu } from 'lucide-react';

const DEFECT_DATA = [
    { quarter: 'Q1', defects: 12 },
    { quarter: 'Q2', defects: 19 },
    { quarter: 'Q3', defects: 8 },
    { quarter: 'Q4', defects: 5 },
];

export default function Manufacturing() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Manufacturing Insights</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Heatmap Section */}
                <div className="lg:col-span-2">
                    <Card title="Component Failure Heatmap" className="min-h-[400px]">
                        <div className="flex flex-col gap-4">
                            <p className="text-[var(--color-text-secondary)] text-sm mb-4">
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
                                    <XAxis dataKey="quarter" stroke="#72767C" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ backgroundColor: '#1F2128', border: 'none', borderRadius: '8px' }}
                                    />
                                    <Bar dataKey="defects" radius={[4, 4, 0, 0]}>
                                        {DEFECT_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.defects > 10 ? '#FF6370' : '#A162F7'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Design Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: 'Brake Caliper Redesign', impact: 'High', type: 'Design', icon: Cpu },
                    { title: 'Battery Thermal Paste', impact: 'Medium', type: 'Process', icon: TrendingUp },
                    { title: 'Sensor Calibration Logic', impact: 'Critical', type: 'Software', icon: AlertTriangle },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="hover:border-[var(--color-primary)] transition-colors cursor-pointer">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]`}>
                                    <item.icon size={24} />
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.impact === 'Critical' ? 'bg-red-500/10 text-red-500' :
                                        item.impact === 'High' ? 'bg-orange-500/10 text-orange-500' :
                                            'bg-blue-500/10 text-blue-500'
                                    }`}>
                                    {item.impact} Impact
                                </span>
                            </div>
                            <h4 className="font-bold text-white mb-2">{item.title}</h4>
                            <p className="text-[var(--color-text-secondary)] text-sm">Suggested improvement based on recent RCA analysis.</p>
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
                const color = intensity > 0.8 ? 'bg-red-500' :
                    intensity > 0.5 ? 'bg-orange-500' :
                        intensity > 0.2 ? 'bg-yellow-500' : 'bg-green-800'; // Darker green for low activity

                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.01 }}
                        className={`aspect-square rounded-md ${color} opacity-80 hover:opacity-100 hover:scale-110 transition-all cursor-pointer relative group`}
                    >
                        {/* Tooltip on Hover */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none z-20">
                            Zone {i + 1}: {(intensity * 100).toFixed(0)}% defects
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
