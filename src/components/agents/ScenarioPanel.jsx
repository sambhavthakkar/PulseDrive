import React from 'react';
import { Play, AlertTriangle, XCircle, ShieldAlert } from 'lucide-react';

export default function ScenarioPanel({ onStartScenario, activeScenario }) {
    const scenarios = [
        { id: 'predictive-flow', label: 'Full Predictive Maintenance', icon: Play, color: 'text-green-400', border: 'hover:border-green-500/50' },
        { id: 'urgent-failure', label: 'Urgent Failure Case', icon: AlertTriangle, color: 'text-orange-400', border: 'hover:border-orange-500/50' },
        { id: 'customer-decline', label: 'Customer Declined Case', icon: XCircle, color: 'text-gray-400', border: 'hover:border-gray-500/50' },
        { id: 'ueba-anomaly', label: 'UEBA Anomaly Case', icon: ShieldAlert, color: 'text-red-400', border: 'hover:border-red-500/50' },
    ];

    return (
        <div className="bg-[var(--bg-card)] rounded-2xl border border-white/5 p-6 flex flex-col h-full">
            <h3 className="text-lg font-bold text-white mb-6 tracking-wide">Scenarios</h3>
            <div className="space-y-3 flex-1">
                {scenarios.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => onStartScenario(s.id)}
                        disabled={activeScenario !== null}
                        className={`
                            w-full flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-black/20 
                            transition-all duration-300 text-left group
                            ${activeScenario === s.id ? 'bg-white/10 border-white/20' : 'hover:bg-white/5 ' + s.border}
                            ${activeScenario !== null && activeScenario !== s.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                    >
                        <div className={`p-2 rounded-lg bg-black/40 ${s.color}`}>
                            <s.icon size={20} />
                        </div>
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                            {s.label}
                        </span>
                    </button>
                ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 text-xs text-[var(--text-muted)] leading-relaxed">
                Connects to <span className="font-mono text-white/50">api/workflows</span> using FastAPI.
            </div>
        </div>
    );
}
