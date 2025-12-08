import React from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, AlertCircle, Circle, ArrowRight } from 'lucide-react';
import {
    Database, Zap, Cpu, MessageSquare, Calendar, Users, Factory, ShieldCheck
} from 'lucide-react';

const ICONS = {
    'Data Analysis Agent': Database,
    'Diagnosis Agent': Zap,
    'Digital Twin Verification': Cpu,
    'Voice Engagement Agent': MessageSquare,
    'Scheduling Agent': Calendar,
    'Feedback Agent': Users,
    'Manufacturing Insights': Factory,
    'UEBA Security Agent': ShieldCheck
};

export default function AgentPipeline({ steps, onStepClick }) {
    return (
        <div className="bg-[var(--bg-card)] rounded-2xl border border-white/5 p-8 flex flex-col h-full relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

            <h3 className="text-lg font-bold text-white mb-6 tracking-wide relative z-10">Agent Execution Pipeline</h3>

            <div className="flex-1 overflow-y-auto space-y-0 relative z-10 pr-2 custom-scrollbar">
                {steps.map((step, index) => {
                    const Icon = ICONS[step.name] || Circle;
                    const isActive = step.status === 'running';
                    const isCompleted = step.status === 'completed';
                    const isAlert = step.status === 'alert';
                    const isWaiting = step.status === 'idle';

                    return (
                        <div
                            key={step.name}
                            className="relative pl-10 pb-8 last:pb-0 group cursor-pointer"
                            onClick={() => onStepClick(step)}
                        >
                            {/* Vertical Line */}
                            {index !== steps.length - 1 && (
                                <div className={`
                                    absolute left-[19px] top-10 bottom-0 w-0.5 
                                    ${isCompleted ? 'bg-green-500/30' : 'bg-white/5'}
                                    transition-colors duration-500
                                `}></div>
                            )}

                            {/* Node Icon */}
                            <div className={`
                                absolute left-0 top-1 w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-300
                                ${isActive ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-110' : ''}
                                ${isCompleted ? 'bg-green-500/20 border-green-500 text-green-400' : ''}
                                ${isAlert ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse' : ''}
                                ${isWaiting ? 'bg-[var(--bg-card)] border-white/10 text-gray-500' : ''}
                            `}>
                                {isActive ? <Loader2 size={18} className="animate-spin" /> :
                                    isCompleted ? <Check size={18} /> :
                                        isAlert ? <AlertCircle size={18} /> :
                                            <Icon size={18} />}
                            </div>

                            {/* Content Card */}
                            <div className={`
                                p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group-hover:border-white/20
                                ${isActive ? 'bg-blue-500/5 border-blue-500/30' : 'bg-white/[0.02] border-white/5'}
                                ${isAlert ? 'bg-red-500/5 border-red-500/30' : ''}
                            `}>
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className={`text-sm font-bold ${isActive ? 'text-blue-400' : isAlert ? 'text-red-400' : isCompleted ? 'text-green-400' : 'text-gray-400'}`}>
                                        {step.name}
                                    </h4>
                                    <span className={`
                                        text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded
                                        ${isActive ? 'bg-blue-500/10 text-blue-400' : isAlert ? 'bg-red-500/10 text-red-400' : isCompleted ? 'bg-green-500/10 text-green-400' : 'text-gray-600'}
                                    `}>
                                        {step.status}
                                    </span>
                                </div>
                                <p className={`text-xs ${isActive ? 'text-gray-200' : 'text-gray-500'} font-mono`}>
                                    {step.lastLog || "Waiting..."}
                                </p>

                                <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight size={14} className="text-gray-400" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
