import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = [
    { time: '10:00', temp: 65 },
    { time: '10:30', temp: 68 },
    { time: '11:00', temp: 72 },
    { time: '11:30', temp: 75 },
    { time: '12:00', temp: 82 },
    { time: '12:30', temp: 78 },
    { time: '01:00', temp: 74 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-3 rounded-xl shadow-xl backdrop-blur-md">
                <p className="text-[var(--text-secondary)] text-xs mb-1">{label}</p>
                <p className="text-[var(--color-accent-orange)] font-bold text-lg">
                    {payload[0].value}° <span className="text-xs text-[var(--text-muted)] font-normal">F</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function TempChart() {
    return (
        <div className="h-full bg-[var(--bg-card)] rounded-[2rem] p-6 hover:shadow-lg transition-all duration-300 group hover:border-[var(--color-accent-orange)]/20 border border-transparent">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Temperature</h3>
                <div className="flex gap-2 text-xs">
                    <span className="px-3 py-1 bg-[var(--color-accent-orange)]/10 text-[var(--color-accent-orange)] border border-[var(--color-accent-orange)]/20 rounded-full animate-pulse">Live</span>
                </div>
            </div>

            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-accent-orange)" stopOpacity={0.6} />
                                <stop offset="95%" stopColor="var(--color-accent-orange)" stopOpacity={0} />
                            </linearGradient>
                            {/* Glowing line filter could be added here if supported well across browsers, skipping for perf */}
                        </defs>
                        <XAxis
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--text-tertiary)', fontSize: 12, fontFamily: 'var(--font-dm)' }}
                            dy={10}
                        />
                        <YAxis
                            hide={true}
                            domain={['dataMin - 10', 'dataMax + 10']}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <ReferenceLine y={80} stroke="var(--color-accent-red)" strokeDasharray="3 3" label={{ position: 'right', value: 'Crit', fill: 'var(--color-accent-red)', fontSize: 10 }} />
                        <Area
                            type="monotone"
                            dataKey="temp"
                            stroke="var(--color-accent-orange)"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorTemp)"
                            animationDuration={2000}
                            className="drop-shadow-[0_0_10px_rgba(255,118,76,0.5)]"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
