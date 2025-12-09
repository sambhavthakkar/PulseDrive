import React, { useState, useEffect } from 'react';
import StatCard from '../components/dashboard/StatCard';
import MilesChart from '../components/dashboard/MilesChart';
import TempChart from '../components/dashboard/TempChart';
import { Clock, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import CarStatus from '../components/dashboard/CarStatus';
import AIInsights from '../components/dashboard/AIInsights';
import HealthScoreGauge from '../components/dashboard/HealthScoreGauge';
import LiveTelemetryBar from '../components/dashboard/LiveTelemetryBar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
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
        <div className="space-y-6 pb-20">
            {/* Top Bar: Title + Health */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="h1 text-[var(--text-primary)] mb-1">Mission Control</h1>
                    <p className="body-reg text-[var(--text-secondary)]">Real-time vehicle telemetry and agent diagnostics</p>
                </div>
                <HealthScoreGauge score={stats?.health_score ?? 94} />
            </div>

            {/* Live Telemetry */}
            <LiveTelemetryBar />

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
                    color="teal" // mapped to info/teal
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

            {/* Row 2: AI Insights */}
            <AIInsights />

            {/* Row 3: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
                <Card noPadding className="overflow-hidden">
                    <MilesChart />
                </Card>
                <Card noPadding className="overflow-hidden">
                    <TempChart />
                </Card>
            </div>

            {/* Row 4: Car & Reminders */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Car Image Card */}
                <div className="lg:col-span-7 h-[500px]">
                    <CarStatus />
                </div>

                {/* Reminder Table */}
                <div className="lg:col-span-5 h-[500px]">
                    <Card
                        title="Reminders"
                        actionItem={<Button size="sm" variant="ghost">See All</Button>}
                        className="h-full flex flex-col"
                        noPadding
                    >
                        <div className="flex-1 flex flex-col gap-3 overflow-y-auto px-6 pb-4 pt-2 custom-scrollbar">
                            <ReminderRow
                                description="Check Tyre Pressure"
                                due="In 2 Days"
                                badge={<Badge variant="error" className="bg-[var(--color-error)]/10 text-[var(--color-error)]">Urgent</Badge>}
                                icon={AlertTriangle}
                                iconColor="text-[var(--color-error)]"
                            />
                            <ReminderRow
                                description="Software Update v2.4"
                                due="Tonight 2 AM"
                                badge={<Badge variant="info" className="bg-[var(--color-info)]/10 text-[var(--color-info)]">Scheduled</Badge>}
                                icon={Clock}
                                iconColor="text-[var(--color-info)]"
                            />
                            <ReminderRow
                                description="Air Filter Replacement"
                                due="120 Km"
                                badge={<Badge variant="warning" className="bg-[var(--color-warning)]/10 text-[var(--color-warning)]">Maintenence</Badge>}
                                icon={Activity}
                                iconColor="text-[var(--color-warning)]"
                            />
                            <ReminderRow
                                description="Insurance Renewal"
                                due="15 Days"
                                badge={<Badge variant="default">Admin</Badge>}
                                icon={CheckCircle}
                                iconColor="text-[var(--color-success)]"
                            />
                        </div>

                        {/* Bottom Action */}
                        <div className="p-6 border-t border-[var(--border-subtle)] mt-auto">
                            <Button className="w-full" variant="primary" leftIcon={<Activity size={18} />}>
                                Run Diagnostics Check
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

const ReminderRow = ({ description, due, badge, icon: Icon, iconColor }) => (
    <div className="flex items-center p-3 rounded-[var(--radius-button)] hover:bg-[var(--bg-elevated)] transition-colors border border-transparent hover:border-[var(--border-subtle)] cursor-pointer group">
        <div className={`p-2 rounded-lg mr-3 bg-[var(--bg-elevated)] ${iconColor}`}>
            <Icon size={18} />
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-start">
                <div className="font-medium text-[var(--text-primary)] mb-0.5">{description}</div>
                {badge}
            </div>
            <div className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                <Clock size={12} />
                {due}
            </div>
        </div>
    </div>
);
