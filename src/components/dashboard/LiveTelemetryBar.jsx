import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Thermometer, Database } from 'lucide-react';

const TelemetryItem = ({ icon: Icon, label, value, unit, color = "text-[var(--text-primary)]" }) => (
    <div className="flex items-center gap-3 px-4 py-2 bg-[var(--bg-card)]/40 rounded-lg border border-white/5 min-w-[140px]">
        <Icon size={16} className={`text-[var(--text-secondary)]`} />
        <div>
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{label}</div>
            {/* Key for animation trigger on value change */}
            <AnimatePresence mode='wait'>
                <motion.div
                    key={value}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className={`text-sm font-mono font-bold ${color}`}
                >
                    {value} <span className="text-[10px] font-normal opacity-70">{unit}</span>
                </motion.div>
            </AnimatePresence>
        </div>
    </div>
);

export default function LiveTelemetryBar() {
    const [data, setData] = useState({
        rpm: 2300,
        temp: 92,
        voltage: 11.8,
        vibration: "Stable"
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => ({
                rpm: 2000 + Math.floor(Math.random() * 500),
                temp: 90 + Math.floor(Math.random() * 5),
                voltage: (11.5 + Math.random() * 0.5).toFixed(1),
                vibration: Math.random() > 0.9 ? "Minor" : "Stable"
            }));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-wrap items-center gap-4 py-4 border-t border-[var(--border-color)]">
            <div className="mr-2 text-xs font-bold text-[var(--color-purple)] bg-[var(--color-purple)]/10 px-2 py-1 rounded animate-pulse">
                LIVE
            </div>

            <TelemetryItem
                icon={Activity}
                label="RPM"
                value={data.rpm}
                unit=""
            />
            <TelemetryItem
                icon={Thermometer}
                label="Engine Temp"
                value={data.temp}
                unit="°C"
                color={data.temp > 93 ? "text-red-500" : "text-[var(--text-primary)]"}
            />
            <TelemetryItem
                icon={Zap}
                label="Battery"
                value={data.voltage}
                unit="V"
                color={data.voltage < 11.6 ? "text-yellow-500" : "text-[var(--text-primary)]"}
            />
            <TelemetryItem
                icon={Database}
                label="Vibration"
                value={data.vibration}
                unit=""
                color={data.vibration !== "Stable" ? "text-orange-500" : "text-emerald-500"}
            />
        </div>
    );
}
