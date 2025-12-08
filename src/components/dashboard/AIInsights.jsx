import React from 'react';
import { motion } from 'framer-motion';
import { Brain, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const InsightCard = ({ title, value, status, icon: Icon, delay }) => {
    const statusColors = {
        critical: 'text-red-400 border-red-500/20 bg-red-500/10',
        warning: 'text-orange-400 border-orange-500/20 bg-orange-500/10',
        success: 'text-green-400 border-green-500/20 bg-green-500/10',
        info: 'text-blue-400 border-blue-500/20 bg-blue-500/10',
    };

    const colorClass = statusColors[status] || statusColors.info;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className={`flex items-center p-3 rounded-xl border ${colorClass} backdrop-blur-sm`}
        >
            <div className={`p-2 rounded-full mr-3 bg-white/5`}>
                <Icon size={18} />
            </div>
            <div>
                <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wide opacity-80">{title}</div>
                <div className="font-semibold text-sm text-[var(--text-primary)]">{value}</div>
            </div>
        </motion.div>
    );
};

export default function AIInsights() {
    return (
        <div className="bg-[var(--bg-card)] rounded-[2rem] p-6 relative overflow-hidden group border border-transparent hover:border-[var(--color-purple)]/20 transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-[var(--color-purple)]/20 rounded-lg text-[var(--color-purple)]">
                        <Brain size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">AI Insights Today</h3>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    Live
                </span>
            </div>

            {/* Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <InsightCard
                    title="Predicted Failure"
                    value="Brake Pad (86%)"
                    status="critical"
                    icon={AlertTriangle}
                    delay={0.1}
                />
                <InsightCard
                    title="Urgent Maintenance"
                    value="Needed in 2 days"
                    status="warning"
                    icon={Clock}
                    delay={0.2}
                />
                <InsightCard
                    title="Digital Twin"
                    value="Verification: Passed"
                    status="success"
                    icon={CheckCircle}
                    delay={0.3}
                />
                <InsightCard
                    title="Next Scheduled"
                    value="Service: Tomorrow 11 AM"
                    status="info"
                    icon={Clock}
                    delay={0.4}
                />
            </div>
        </div>
    );
}
