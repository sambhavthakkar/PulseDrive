import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { time: '10:00', temp: 65 },
    { time: '10:30', temp: 68 },
    { time: '11:00', temp: 72 },
    { time: '11:30', temp: 75 },
    { time: '12:00', temp: 82 },
    { time: '12:30', temp: 78 },
    { time: '01:00', temp: 74 },
];

export default function TempChart() {
    return (
        <div className="h-full bg-[var(--bg-card)] rounded-[2rem] p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Temperature</h3>
                <div className="flex gap-2 text-xs">
                    <span className="px-3 py-1 bg-[var(--color-accent-orange)] text-white rounded-full">Now</span>
                    <span className="px-3 py-1 bg-[var(--color-gray-100)] text-[var(--text-secondary)] rounded-full">Critical</span>
                    <span className="px-3 py-1 bg-[var(--color-gray-100)] text-[var(--text-secondary)] rounded-full">Average</span>
                </div>
            </div>

            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-accent-orange)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-accent-orange)" stopOpacity={0} />
                            </linearGradient>
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
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--color-dark-bg)', border: 'none', borderRadius: '8px', color: 'white' }}
                            itemStyle={{ color: 'white' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="temp"
                            stroke="var(--color-accent-orange)"
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
