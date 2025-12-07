import React, { useState } from 'react';
import Card from '../components/common/Card';
import { Activity, Thermometer, Wind, CheckCircle, RefreshCw } from 'lucide-react';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';
import DigitalTwinCar from '../components/dashboard/DigitalTwinCar';

export default function DigitalTwin() {
    const [isVerifying, setIsVerifying] = useState(false);
    const [verified, setVerified] = useState(false);

    const runSimulation = () => {
        setIsVerifying(true);
        setVerified(false);
        setTimeout(() => {
            setIsVerifying(false);
            setVerified(true);
        }, 2500);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Digital Twin Simulation</h2>
                <button
                    onClick={runSimulation}
                    disabled={isVerifying}
                    className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                    <RefreshCw size={18} className={cn(isVerifying && "animate-spin")} />
                    {isVerifying ? "Simulating..." : "Run Prediction Verification"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Visual */}
                <div className="lg:col-span-2">
                    <Card className="items-center justify-center relative min-h-[500px] overflow-hidden bg-gradient-to-br from-[#1b1d24] to-[#16181d] border border-white/5">
                        {/* Grid Background */}
                        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                            {/* Simulator Car Model */}
                            <DigitalTwinCar isVerifying={isVerifying} />

                            {/* Verification Badge */}
                            {verified && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute bottom-10 bg-green-500/10 border border-green-500 text-green-500 px-6 py-3 rounded-full flex items-center gap-3 backdrop-blur-md"
                                >
                                    <CheckCircle size={24} />
                                    <span className="font-bold">Prediction Verified</span>
                                </motion.div>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Metrics Panel */}
                <div className="space-y-6">
                    <Card title="Real-time Telemetry">
                        <div className="space-y-6">
                            <MetricRow label="Engine Heat" value="195°F" icon={Thermometer} color="text-red-400" />
                            <MetricRow label="Vibration Analysis" value="0.04g" icon={Activity} color="text-yellow-400" />
                            <MetricRow label="Aerodynamics" value="0.23 Cd" icon={Wind} color="text-blue-400" />

                            <div className="h-px bg-white/5 my-4"></div>

                            <div className="space-y-2">
                                <div className="text-sm font-medium text-[var(--color-text-tertiary)]">Battery Load Distribution</div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-[var(--color-primary)]"
                                        initial={{ width: "60%" }}
                                        animate={{ width: isVerifying ? ["60%", "85%", "70%"] : "60%" }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card title="Simulation Parameters">
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-[var(--color-text-secondary)]">Road Condition</span>
                                <span className="text-white">Wet / Slippery</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-[var(--color-text-secondary)]">Ambient Temp</span>
                                <span className="text-white">45°F</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-[var(--color-text-secondary)]">Load Weight</span>
                                <span className="text-white">340 lbs</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

const MetricRow = ({ label, value, icon: Icon, color }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-lg bg-white/5", color)}>
                <Icon size={18} />
            </div>
            <span className="text-[var(--color-text-secondary)] text-sm">{label}</span>
        </div>
        <span className="font-mono font-bold text-white">{value}</span>
    </div>
);
