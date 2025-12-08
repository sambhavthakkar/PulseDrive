import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

const data = [
    { name: '1 PM', miles: 157 },
    { name: '2 PM', miles: 125 },
    { name: '3 PM', miles: 145 },
    { name: '4 PM', miles: 105 },
    { name: '5 PM', miles: 115 },
    { name: '6 PM', miles: 135 },
    { name: '7 PM', miles: 140 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-3 rounded-xl shadow-xl backdrop-blur-md">
                <p className="text-[var(--text-secondary)] text-xs mb-1">{label}</p>
                <p className="text-[var(--color-accent-blue)] font-bold text-lg">
                    {payload[0].value} <span className="text-xs text-[var(--text-muted)] font-normal">Km</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function MilesChart() {
    return (
        <div className="h-full bg-[var(--bg-card)] rounded-[2rem] p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
            {/* Background Grid Pattern for Tech Vibe */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>

            <div className="flex flex-col mb-8 relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">Range <span className="font-normal text-[var(--text-secondary)]">Statistics</span></h3>
                </div>

                <div className="flex gap-2">
                    <button className="bg-[var(--color-accent-blue)] text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-sm transition-all hover:opacity-90">Day</button>
                    <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-4 py-1.5 text-sm font-medium transition-colors">Week</button>
                    <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-4 py-1.5 text-sm font-medium transition-colors">Month</button>
                    <div className="ml-auto text-sm font-bold text-[var(--text-primary)] self-center">256 Km</div>
                </div>
            </div>

            <div className="h-[200px] w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barCategoryGap={20}>
                        <CartesianGrid vertical={false} stroke="var(--border-color)" strokeDasharray="3 3" opacity={0.3} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--text-tertiary)', fontSize: 12, fontFamily: 'var(--font-dm)' }}
                            dy={10}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-gray-100)', opacity: 0.1, radius: 8 }} />
                        <Bar
                            dataKey="miles"
                            radius={[6, 6, 6, 6]}
                            animationDuration={1500}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={index === 2 ? 'var(--color-accent-blue)' : 'var(--text-tertiary)'}
                                    opacity={index === 2 ? 1 : 0.3}
                                    className="hover:opacity-80 transition-opacity cursor-pointer"
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
