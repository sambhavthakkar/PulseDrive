import React, { useState, useEffect } from 'react';
import StatCard from '../components/dashboard/StatCard';
import MilesChart from '../components/dashboard/MilesChart';
import TempChart from '../components/dashboard/TempChart';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import CarStatus from '../components/dashboard/CarStatus';
import AIInsights from '../components/dashboard/AIInsights';
import HealthScoreGauge from '../components/dashboard/HealthScoreGauge';
import LiveTelemetryBar from '../components/dashboard/LiveTelemetryBar';
import { getDashboardStats } from '../services/backendApi';

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);
    return (
        <div className="space-y-4 max-w-[1600px] mx-auto p-6 pt-0 pb-20 relative">

            {/* Top Bar Area: Title + Health Gauge */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Mission Control</h1>
                    <p className="text-[var(--text-secondary)]">Real-time vehicle telemetry and agent diagnostics</p>
                </div>
                <HealthScoreGauge score={stats?.health_score ?? 94} />
            </div>

            {/* Live Telemetry (Moved to top) */}
            <div className="mb-6">
                <LiveTelemetryBar />
            </div>

            {/* Row 1: Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Battery Life"
                    value={stats?.battery_level ?? 45}
                    unit="%"
                    icon="energy"
                    color="purple"
                    progress={stats?.battery_level ?? 45}
                    status={stats?.battery_level > 30 ? "Good" : "Low"}
                    trendText={`Discharge rate normal. Estimated ${stats?.range_km ?? 120}km remaining.`}
                />
                <StatCard
                    title="Energy Eco"
                    value="12"
                    unit="Km/L"
                    icon="fluid"
                    color="teal"
                    progress={65}
                    status="Good"
                    trendText="Efficiency +5% vs yesterday. Regenerative braking active."
                />
                <StatCard
                    title="Brake Fluid"
                    value="Low"
                    unit=""
                    icon="fluid"
                    color="red"
                    progress={20}
                    status="Critical"
                    trendText="Fluid levels below threshold. Inspect immediately."
                />
                <StatCard
                    title="Tire Pressure"
                    value="32"
                    unit="PSI"
                    icon="tires"
                    color="yellow"
                    progress={80}
                    status="Low"
                    trendText="Front-right tire pressure -2 PSI. Recommended inflation."
                />
            </div>

            {/* Row 2: AI Insights (New Section) */}
            <AIInsights />

            {/* Row 3: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[360px]">
                <MilesChart />
                <TempChart />
            </div>

            {/* Row 4: Car & Reminder */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Car Image Card (Interactive 3D) */}
                <div className="lg:col-span-7 h-[450px]">
                    <CarStatus />
                </div>

                {/* Reminder Table (Enhanced) */}
                <div className="lg:col-span-5 bg-[var(--bg-card)] rounded-[2rem] p-8 h-[450px] overflow-hidden flex flex-col relative group hover:border-[var(--color-purple)]/20 border border-transparent transition-all">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-[var(--text-primary)]">Reminders</h3>
                        <button className="text-xs px-3 py-1 bg-[var(--bg-primary)] rounded-full hover:bg-[var(--color-purple)] hover:text-white transition-colors">See All</button>
                    </div>

                    <div className="overflow-y-auto pr-2 space-y-3 custom-scrollbar flex-1">
                        <ReminderRow
                            description="Check Tyre Pressure"
                            due="In 2 Days"
                            tag="Urgent"
                            tagColor="bg-red-500/10 text-red-400 border-red-500/20"
                            icon={AlertTriangle}
                        />
                        <ReminderRow
                            description="Software Update v2.4"
                            due="Tonight 2 AM"
                            tag="Scheduled"
                            tagColor="bg-blue-500/10 text-blue-400 border-blue-500/20"
                            icon={Clock}
                        />
                        <ReminderRow
                            description="Air Filter Replacement"
                            due="120 Km"
                            tag="Maintenance"
                            tagColor="bg-orange-500/10 text-orange-400 border-orange-500/20"
                            icon={Clock}
                        />
                        <ReminderRow
                            description="Insurance Renewal"
                            due="15 Days"
                            tag="Admin"
                            tagColor="bg-[var(--bg-primary)] text-[var(--text-secondary)] border-[var(--border-color)]"
                            icon={CheckCircle}
                        />
                    </div>

                    {/* Bottom Action Area */}
                    <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                        <button className="w-full py-3 rounded-xl bg-[var(--color-purple)] text-white font-bold text-sm shadow-lg shadow-[var(--color-purple)]/20 hover:shadow-[var(--color-purple)]/40 hover:scale-[1.02] transition-all active:scale-95">
                            Run Diagnostics Check
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ReminderRow = ({ description, due, tag, tagColor, icon: Icon }) => (
    <div className="flex items-center p-4 bg-[var(--bg-primary)]/50 rounded-xl hover:bg-[var(--bg-primary)] transition-colors border border-transparent hover:border-[var(--border-color)] cursor-pointer group/row">
        <div className={`p-2 rounded-lg mr-4 ${tagColor} bg-opacity-10 border-none`}>
            <Icon size={18} />
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-start">
                <div className="font-medium text-[var(--text-primary)] mb-0.5">{description}</div>
                <div className={`text-[10px] px-2 py-0.5 rounded border ${tagColor} font-medium uppercase tracking-wider`}>{tag}</div>
            </div>
            <div className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                <Clock size={10} />
                {due}
            </div>
        </div>
    </div>
);
