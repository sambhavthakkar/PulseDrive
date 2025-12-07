import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';

const mockFailures = [
    { id: 1, part: 'Brake Pads', probability: 86, time: '2 Weeks', severity: 'high' },
    { id: 2, part: 'Oil Filter', probability: 45, time: '2 Months', severity: 'low' },
    { id: 3, part: 'Battery Cell', probability: 12, time: '6 Months', severity: 'medium' },
    { id: 4, part: 'Tire Rotation', probability: 90, time: '3 Days', severity: 'high' },
    { id: 5, part: 'Coolant Flush', probability: 30, time: '3 Months', severity: 'low' },
];

const severityColors = {
    high: 'bg-red-500/10 border-red-500/50 text-red-500',
    medium: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500',
    low: 'bg-green-500/10 border-green-500/50 text-green-500',
};

export default function FailureTimeline() {
    return (
        <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-4">
                {mockFailures.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`min-w-[200px] p-4 rounded-xl border backdrop-blur-sm ${severityColors[item.severity] || severityColors.low}`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-[var(--text-primary)]">{item.part}</span>
                            <AlertTriangle size={16} />
                        </div>
                        <div className="text-sm font-medium mb-1">
                            Prob: {item.probability}%
                        </div>
                        <div className="flex items-center gap-1 text-xs opacity-80">
                            <Clock size={12} />
                            <span>In {item.time}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
