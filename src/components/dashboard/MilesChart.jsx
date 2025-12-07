import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: '1 PM', miles: 157 },
    { name: '2 PM', miles: 125 },
    { name: '3 PM', miles: 145 },
    { name: '4 PM', miles: 105 },
    { name: '5 PM', miles: 115 },
    { name: '6 PM', miles: 135 },
    { name: '7 PM', miles: 140 },
];

export default function MilesChart() {
    return (
        <div className="h-full bg-[var(--bg-card)] rounded-[2rem] p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col mb-8">
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

            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barCategoryGap={20}>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--text-tertiary)', fontSize: 12, fontFamily: 'var(--font-dm)' }}
                            dy={10}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ backgroundColor: 'var(--color-dark-bg)', border: 'none', borderRadius: '8px', color: 'white' }}
                            itemStyle={{ color: 'white' }}
                        />
                        <Bar
                            dataKey="miles"
                            radius={[4, 4, 0, 0]}
                            className="transition-all duration-300 cursor-pointer"
                        >
                            {data.map((entry, index) => (
                                <cell key={`cell-${index}`} fill={index === 2 ? 'var(--color-accent-blue)' : 'var(--color-gray-100)'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
