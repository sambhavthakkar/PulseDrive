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
            <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-3 rounded-xl shadow-xl backdrop-blur-md">
                <p className="text-[var(--text-secondary)] text-xs mb-1">{label}</p>
                <p className="text-[var(--color-warning)] font-bold text-lg">
                    {payload[0].value}° <span className="text-xs text-[var(--text-muted)] font-normal">F</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function TempChart() {
    return (
        <div className="h-full w-full p-6 flex flex-col group">
            <div className="flex items-center justify-between mb-6">
                <h3 className="h3 text-[var(--text-primary)]">Temperature</h3>
                <div className="flex gap-2 text-xs">
                    <span className="px-3 py-1 bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/20 rounded-full animate-pulse font-medium">Live</span>
                </div>
            </div>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-warning)" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="var(--color-warning)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            hide={true}
                            domain={['dataMin - 10', 'dataMax + 10']}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <ReferenceLine y={80} stroke="var(--color-error)" strokeDasharray="3 3" label={{ position: 'right', value: 'Crit', fill: 'var(--color-error)', fontSize: 10 }} />
                        <Area
                            type="monotone"
                            dataKey="temp"
                            stroke="var(--color-warning)"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorTemp)"
                            animationDuration={2000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
