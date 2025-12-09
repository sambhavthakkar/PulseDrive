import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { motion } from 'framer-motion';
import {
    Activity, AlertOctagon, Database, TrendingUp,
    Play, Pause, Download, Search, Film, Info,
    Zap, Server, Wifi, Clock, Brain, AlertTriangle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { cn } from '../utils/cn';

export default function DataAnalysis() {
    const [isStreamActive, setIsStreamActive] = useState(true);
    const [telemetry, setTelemetry] = useState({ rpm: 2400, temp: 195, vibration: 0.02, latency: 45 });
    const [dataPoints, setDataPoints] = useState([]);

    // Simulate Live Data Feed
    useEffect(() => {
        if (!isStreamActive) return;

        const interval = setInterval(() => {
            setTelemetry(prev => ({
                rpm: Math.floor(2200 + Math.random() * 400),
                temp: Math.floor(190 + Math.random() * 10),
                vibration: parseFloat((0.01 + Math.random() * 0.03).toFixed(3)),
                latency: Math.floor(35 + Math.random() * 20),
            }));

            setDataPoints(prev => {
                const newPoint = {
                    time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    val1: 40 + Math.random() * 40,
                    val2: 30 + Math.random() * 30
                };
                return [...prev.slice(-30), newPoint]; // Keep last 30 points
            });
        }, 800);
        return () => clearInterval(interval);
    }, [isStreamActive]);

    return (
        <div className="space-y-6 pb-20">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="h1 text-[var(--text-primary)] tracking-tight">Data Analysis Agent</h1>
                    <p className="body-reg text-[var(--text-secondary)]">Real-time inference & predictive modeling</p>
                </div>

                {/* Minimal Stream Control Bar */}
                <div className="flex items-center gap-2 bg-[var(--bg-elevated)] p-1.5 rounded-xl border border-[var(--border-subtle)]">
                    <ControlButton
                        icon={isStreamActive ? Pause : Play}
                        label={isStreamActive ? "Pause Stream" : "Resume Stream"}
                        active={isStreamActive}
                        onClick={() => setIsStreamActive(!isStreamActive)}
                    />
                    <div className="w-px h-6 bg-[var(--border-subtle)] mx-1"></div>
                    <ControlButton icon={Film} label="5-min Playback" />
                    <ControlButton icon={Search} label="Manual Analysis" />
                    <ControlButton icon={Download} label="Export Data" />
                </div>
            </div>

            {/* Top Row: Telemetry & Main Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Live Telemetry Stream */}
                <Card title="Live Telemetry Stream" className="lg:col-span-1 h-full">
                    <div className="space-y-6">
                        <TelemetryRow
                            label="Motor RPM"
                            value={telemetry.rpm}
                            icon={Activity}
                            color="text-[var(--color-primary)]"
                            tooltip="Rotations Per Minute - Core Engine Speed"
                        />
                        <TelemetryRow
                            label="Core Temperature"
                            value={telemetry.temp}
                            unit="°F"
                            icon={TrendingUp}
                            color="text-[var(--color-error)]"
                            tooltip="Internal Battery/Engine Temperature"
                        />
                        <TelemetryRow
                            label="Vibration Level"
                            value={telemetry.vibration}
                            unit="g"
                            icon={Zap}
                            color="text-[var(--color-warning)]"
                            tooltip="Chassis Vibration Force"
                        />
                        <TelemetryRow
                            label="Network Latency"
                            value={telemetry.latency}
                            unit="ms"
                            icon={Wifi}
                            color="text-[var(--color-info)]"
                            tooltip="Cloud Sync Delay"
                        />

                        <div className="pt-4 border-t border-[var(--border-subtle)]">
                            <div className="bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 rounded-xl p-4 flex items-start gap-4 animate-pulse">
                                <AlertOctagon className="text-[var(--color-error)] shrink-0 mt-0.5" size={20} />
                                <div>
                                    <div className="font-bold text-[var(--color-error)] text-sm">Anomaly Detected</div>
                                    <div className="text-xs text-[var(--text-secondary)] mt-0.5">Variance in Cylinder 3 Pressure. Immediate attention advised.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Real-time Processing Chart */}
                <Card
                    title="Real-time Processing"
                    className="lg:col-span-2 min-h-[400px]"
                    actionItem={
                        <div className="flex items-center gap-2 text-xs">
                            <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></span> Inference
                            </span>
                            <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-info)]"></span> Baseline
                            </span>
                        </div>
                    }
                >
                    <div className="h-[300px] w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={dataPoints}>
                                <defs>
                                    <linearGradient id="colorVal1" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorVal2" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-info)" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="var(--color-info)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="time"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                                    interval={5}
                                />
                                <YAxis hide domain={[0, 100]} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--bg-elevated)',
                                        border: '1px solid var(--border-default)',
                                        borderRadius: '8px',
                                        boxShadow: 'var(--shadow-dropdown)'
                                    }}
                                    itemStyle={{ color: 'var(--text-primary)', fontSize: '12px' }}
                                    labelStyle={{ color: 'var(--text-muted)', marginBottom: '4px', fontSize: '10px' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="val1"
                                    stroke="var(--color-primary)"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorVal1)"
                                    isAnimationActive={false}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="val2"
                                    stroke="var(--color-info)"
                                    strokeWidth={2}
                                    strokeDasharray="4 4"
                                    fillOpacity={1}
                                    fill="url(#colorVal2)"
                                    isAnimationActive={false}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Middle Row: 4 Compact Analytic Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* 1. Data Health */}
                <MetricCard title="Data Health">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-end">
                            <span className="text-3xl font-bold text-[var(--color-success)]">99.8%</span>
                            <span className="text-xs font-medium text-[var(--text-secondary)] mb-1">Integrity Score</span>
                        </div>
                        <div className="space-y-2">
                            <MetricRow label="Packet Loss" value="0.02%" status="good" />
                            <MetricRow label="Time Sync" value="<1ms" status="good" />
                            <MetricRow label="Sensor Cov." value="12/12" status="good" />
                        </div>
                    </div>
                </MetricCard>

                {/* 2. Sensor Status Map */}
                <MetricCard title="Sensor Status">
                    <div className="grid grid-cols-4 gap-2 h-full content-start">
                        {[
                            { label: 'O2', status: 'good' }, { label: 'ABS', status: 'good' }, { label: 'IMU', status: 'good' },
                            { label: 'LIDAR', status: 'warning' }, { label: 'CAM', status: 'good' }, { label: 'RADAR', status: 'good' },
                            { label: 'GPS', status: 'good' }, { label: 'BATT', status: 'good' }
                        ].map((s, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)]" title={s.label}>
                                <div className={cn(
                                    "w-2 h-2 rounded-full mb-1",
                                    s.status === 'good' ? 'bg-[var(--color-success)]' : 'bg-[var(--color-warning)] animate-pulse'
                                )}></div>
                                <span className="text-[10px] font-bold text-[var(--text-secondary)]">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </MetricCard>

                {/* 3. Prediction Forecast */}
                <MetricCard title="Prediction Forecast">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Next Anomaly</div>
                                <div className="text-xl font-bold text-[var(--text-primary)]">~4.2 Hours</div>
                            </div>
                            <Badge variant="warning">High Prob</Badge>
                        </div>
                        <div className="w-full h-12 flex items-center gap-1">
                            {[40, 35, 50, 45, 60, 55, 75, 80, 60, 40].map((h, i) => (
                                <div key={i} className="flex-1 bg-[var(--color-primary)]/20 rounded-sm relative h-full">
                                    <div className="absolute bottom-0 w-full bg-[var(--color-primary)] rounded-sm" style={{ height: `${h}%` }}></div>
                                </div>
                            ))}
                        </div>
                        <div className="text-xs text-[var(--color-warning)] font-medium flex items-center gap-1">
                            <TrendingUp size={12} /> Failure probability rising
                        </div>
                    </div>
                </MetricCard>

                {/* 4. Model Drift */}
                <MetricCard title="Model Drift">
                    <div className="flex flex-col h-full justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-[var(--text-primary)]">2.4%</span>
                            <div className="flex items-center text-xs text-[var(--color-success)] bg-[var(--color-success)]/10 px-2 py-1 rounded-md">
                                Stable
                            </div>
                        </div>

                        {/* Visual Drift Indicator */}
                        <div className="relative h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden my-3">
                            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[var(--text-muted)]/50 z-10"></div>
                            <div className="absolute top-0 bottom-0 bg-[var(--color-primary)] rounded-full transition-all duration-1000" style={{ left: '48%', width: '6%' }}></div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span className="text-[var(--text-muted)]">Training v2.1</span>
                                <span className="text-[var(--text-muted)]">Current v2.1</span>
                            </div>
                            <div className="text-[10px] text-[var(--text-secondary)] mt-1">
                                Last Re-train: 12 days ago
                            </div>
                        </div>
                    </div>
                </MetricCard>
            </div>

            {/* Bottom: Early Warning Patterns */}
            <Card title="Early Warning Patterns">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-[var(--text-secondary)]">
                        <thead className="text-xs uppercase text-[var(--text-muted)] border-b border-[var(--border-subtle)]">
                            <tr>
                                <th className="pb-4 pl-4 font-medium">Pattern ID</th>
                                <th className="pb-4 font-medium">Affected System</th>
                                <th className="pb-4 font-medium">Confidence Score</th>
                                <th className="pb-4 font-medium">Status</th>
                                <th className="pb-4 font-medium text-right pr-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="space-y-2">
                            {[
                                { id: 'P-9923', sys: 'Hydraulics System', conf: 94, status: 'Active' },
                                { id: 'P-8812', sys: 'LiDAR Sensor Array', conf: 45, status: 'Monitoring' },
                                { id: 'P-1244', sys: 'Battery Cell Block B', conf: 12, status: 'Resolved' },
                            ].map((row, i) => (
                                <tr key={i} className="group hover:bg-[var(--bg-elevated)]/50 transition-colors border-b border-[var(--border-subtle)] last:border-0 border-dashed">
                                    <td className="py-4 pl-4 font-mono text-[var(--color-primary)] font-medium group-hover:text-[var(--color-primary-hover)]">{row.id}</td>
                                    <td className="py-4 text-[var(--text-primary)]">{row.sys}</td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-24 h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                                                <div
                                                    className={cn("h-full rounded-full", row.conf > 80 ? 'bg-[var(--color-primary)]' : row.conf > 40 ? 'bg-[var(--color-warning)]' : 'bg-[var(--color-success)]')}
                                                    style={{ width: `${row.conf}%` }}
                                                ></div>
                                            </div>
                                            <span className="font-mono text-xs">{row.conf}%</span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <Badge variant={row.status === 'Active' ? 'error' : row.status === 'Monitoring' ? 'warning' : 'success'}>
                                            {row.status}
                                        </Badge>
                                    </td>
                                    <td className="py-4 pr-4 text-right">
                                        <button className="text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:underline">
                                            Investigate
                                        </button>
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

// --- SUB COMPONENTS ---

const ControlButton = ({ icon: Icon, label, active, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={cn(
            "p-2 rounded-lg flex items-center justify-center transition-colors relative group",
            active ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20" : "hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        )}
        title={label}
    >
        <Icon size={18} fill={active ? "currentColor" : "none"} />
    </motion.button>
);

const TelemetryRow = ({ label, value, unit, icon: Icon, color, tooltip }) => (
    <div className="group relative flex items-center justify-between p-2 rounded-xl hover:bg-[var(--bg-elevated)] transition-colors cursor-default">
        <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] group-hover:border-[var(--border-default)] transition-colors", color)}>
                <Icon size={18} />
            </div>
            <span className="text-[var(--text-secondary)] text-sm group-hover:text-[var(--text-primary)] transition-colors">{label}</span>
        </div>
        <div className="font-mono text-lg font-bold text-[var(--text-primary)]">
            <motion.span
                key={value}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className="tabular-nums"
            >
                {value}
            </motion.span>
            {unit && <span className="text-xs text-[var(--text-muted)] ml-1 font-sans">{unit}</span>}
        </div>

        {/* Hover Tooltip */}
        <div className="absolute left-1/2 -top-10 -translate-x-1/2 px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-default)] shadow-xl rounded-lg text-[10px] text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
            {tooltip}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--bg-card)] border-b border-r border-[var(--border-default)] rotate-45"></div>
        </div>
    </div>
);

const MetricCard = ({ title, children }) => (
    <div className="card-base p-5 flex flex-col h-full bg-[var(--bg-card)]">
        <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Database size={12} /> {title}
        </h3>
        <div className="flex-1">
            {children}
        </div>
    </div>
);

const MetricRow = ({ label, value, status }) => (
    <div className="flex justify-between items-center text-xs">
        <span className="text-[var(--text-secondary)]">{label}</span>
        <span className={cn(
            "font-mono font-bold",
            status === 'good' ? "text-[var(--color-success)]" : "text-[var(--color-warning)]"
        )}>{value}</span>
    </div>
);
