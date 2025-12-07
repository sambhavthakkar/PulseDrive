import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import { motion } from 'framer-motion';
import { Activity, AlertOctagon, Database, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DataAnalysis() {
    const [telemetry, setTelemetry] = useState({ rpm: 2400, temp: 195, vibration: 0.02 });
    const [dataPoints, setDataPoints] = useState([]);

    // Simulate Live Data Feed
    useEffect(() => {
        const interval = setInterval(() => {
            setTelemetry(prev => ({
                rpm: Math.floor(2200 + Math.random() * 400),
                temp: Math.floor(190 + Math.random() * 10),
                vibration: parseFloat((0.01 + Math.random() * 0.03).toFixed(3))
            }));

            setDataPoints(prev => {
                const newPoint = { time: new Date().toLocaleTimeString(), val: Math.random() * 100 };
                return [...prev.slice(-20), newPoint];
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Data Analysis Agent</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Live Telemetry Feed */}
                <Card title="Live Telemetry Stream" className="md:col-span-3 lg:col-span-1">
                    <div className="space-y-6">
                        <TelemetryRow label="Motor RPM" value={telemetry.rpm} unit="" icon={Activity} color="text-purple-400" />
                        <TelemetryRow label="Core Temp" value={telemetry.temp} unit="°F" icon={TrendingUp} color="text-red-400" />
                        <TelemetryRow label="Vibration" value={telemetry.vibration} unit="g" icon={Activity} color="text-yellow-400" />

                        <div className="h-px bg-white/5 my-4"></div>

                        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-center gap-4 animate-pulse">
                            <AlertOctagon className="text-red-500" size={24} />
                            <div>
                                <div className="font-bold text-red-500">Anomaly Detected</div>
                                <div className="text-xs text-red-400 opacity-80">Variance in Cylinder 3 Pressure</div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Main Charts */}
                <Card title="Real-time Processing" className="md:col-span-3 lg:col-span-2 min-h-[400px]">
                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dataPoints}>
                                <XAxis dataKey="time" hide />
                                <YAxis hide domain={[0, 100]} />
                                <Tooltip contentStyle={{ backgroundColor: '#1F2128', border: 'none' }} />
                                <Line
                                    type="monotone"
                                    dataKey="val"
                                    stroke="#A162F7"
                                    strokeWidth={3}
                                    dot={false}
                                    isAnimationActive={false} // Disable for smooth real-time effect
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between items-center mt-4 text-xs text-[var(--color-text-secondary)]">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Live Stream Active
                        </div>
                        <div>1.2 GB processed / hr</div>
                    </div>
                </Card>
            </div>

            {/* Early Warning Table */}
            <Card title="Early Warning Patterns">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-[var(--color-text-secondary)]">
                        <thead className="text-xs uppercase text-[var(--color-text-muted)] border-b border-white/5">
                            <tr>
                                <th className="pb-3 pl-2">Pattern ID</th>
                                <th className="pb-3">Affected System</th>
                                <th className="pb-3">Confidence</th>
                                <th className="pb-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="space-y-2">
                            {[
                                { id: 'P-9923', sys: 'Hydraulics', conf: '94%', status: 'Active' },
                                { id: 'P-8812', sys: 'LiDAR Sensor', conf: '45%', status: 'Monitoring' },
                                { id: 'P-1244', sys: 'Battery Cell', conf: '12%', status: 'Resolved' },
                            ].map((row, i) => (
                                <tr key={i} className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                                    <td className="py-3 pl-2 font-mono text-[var(--color-primary)]">{row.id}</td>
                                    <td className="py-3 text-white">{row.sys}</td>
                                    <td className="py-3">
                                        <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-[var(--color-primary)]" style={{ width: row.conf }}></div>
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        <span className={`px-2 py-1 rounded text-xs ${row.status === 'Active' ? 'bg-red-500/10 text-red-500' :
                                                row.status === 'Monitoring' ? 'bg-yellow-500/10 text-yellow-500' :
                                                    'bg-green-500/10 text-green-500'
                                            }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}

const TelemetryRow = ({ label, value, unit, icon: Icon, color }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
                <Icon size={18} />
            </div>
            <span className="text-[var(--color-text-secondary)]">{label}</span>
        </div>
        <div className="font-mono text-xl font-bold text-white">
            <motion.span
                key={value}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {value}
            </motion.span>
            <span className="text-sm text-[var(--color-text-muted)] ml-1">{unit}</span>
        </div>
    </div>
);
