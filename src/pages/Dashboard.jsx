import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import MilesChart from '../components/dashboard/MilesChart';
import TempChart from '../components/dashboard/TempChart';
import { Clock } from 'lucide-react';
import Card from '../components/common/Card';
import FailureTimeline from '../components/dashboard/FailureTimeline';
import CarStatus from '../components/dashboard/CarStatus';

export default function Dashboard() {
    return (
        <div className="space-y-8 max-w-[1600px] mx-auto p-6">
            {/* Row 1: Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard
                    title="Battery"
                    value="45"
                    unit="%"
                    icon="energy"
                    variant="primary"
                    progress={45}
                />
                <StatCard
                    title="Economy"
                    value="12"
                    unit="Km/L"
                    icon="fluid"
                    color="red"
                    progress={12 * 8} // Approx scales
                />
                <StatCard
                    title="Break fluid"
                    value="9"
                    unit="%"
                    icon="fluid"
                    color="purple"
                    progress={9}
                />
                <StatCard
                    title="Tire Pressure"
                    value="25"
                    unit="%"
                    icon="tires"
                    color="yellow"
                    progress={25}
                />
            </div>

            {/* Row 2: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[360px]">
                <MilesChart />
                <TempChart />
            </div>

            {/* Row 3: Car & Reminder */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Car Image Card */}
                <div className="lg:col-span-5 bg-[var(--bg-card)] rounded-[2rem] p-8 flex items-center justify-center relative overflow-hidden h-[400px]">
                    {/* Background Radial Gradient Effect */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-100/50 via-transparent to-transparent"></div>
                    <img
                        src="https://pngimg.com/d/jeep_PNG48.png"
                        alt="Car"
                        className="w-full max-w-[400px] object-contain drop-shadow-2xl z-10 transition-transform hover:scale-105 duration-500"
                    />
                    <div className="absolute bottom-10 inset-x-0 w-32 h-8 bg-black/20 blur-xl mx-auto rounded-full"></div>
                </div>

                {/* Reminder Table */}
                <div className="lg:col-span-7 bg-[var(--bg-card)] rounded-[2rem] p-8 h-[400px] overflow-hidden flex flex-col">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Reminder</h3>

                    <div className="w-full text-left border-collapse">
                        <div className="grid grid-cols-5 text-xs text-[var(--text-secondary)] uppercase tracking-wider font-medium mb-4 px-4">
                            <div className="col-span-2">Description</div>
                            <div>Due</div>
                            <div>Overdue</div>
                            <div>Notify</div>
                        </div>

                        <div className="overflow-y-auto pr-2 space-y-2 h-[260px] custom-scrollbar">
                            <ReminderRow
                                description="Urgent Tyre Pressure"
                                due="01/11/2025"
                                overdue="01/11/2025"
                                notify="Urgent"
                                notifyColor="text-red-500"
                                status="active"
                            />
                            <ReminderRow
                                description="Regular Check-Up"
                                due="06/11/2025"
                                overdue="13/11/2025"
                                notify="Regular"
                                notifyColor="text-[var(--text-primary)]"
                                status="pending"
                            />
                            <ReminderRow
                                description="Oil Change"
                                due="15/11/2025"
                                overdue="-"
                                notify="Regular"
                                notifyColor="text-[var(--text-primary)]"
                                status="pending"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ReminderRow = ({ description, due, overdue, notify, notifyColor, status }) => (
    <div className="grid grid-cols-5 items-center p-4 hover:bg-[var(--bg-primary)] rounded-xl transition-colors text-sm border border-transparent hover:border-[var(--border-color)] group cursor-pointer">
        <div className="col-span-2 font-medium text-[var(--text-primary)]">{description}</div>
        <div className="text-[var(--text-secondary)]">{due}</div>
        <div className="text-[var(--text-secondary)]">{overdue}</div>
        <div className={`font-medium ${notifyColor}`}>{notify}</div>
    </div>
);
