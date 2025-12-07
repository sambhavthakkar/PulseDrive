import React from 'react';
import Card from '../components/common/Card';
import { Shield, AlertTriangle, UserCheck, Lock } from 'lucide-react';

export default function UEBA() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">User & Entity Behavior Analytics (UEBA)</h2>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-lg border border-green-500/20">
                    <Shield size={18} />
                    <span className="font-bold text-sm">System Secure</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <Card className="items-center text-center py-8 gap-4">
                        <div className="w-20 h-20 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                            <UserCheck size={40} />
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">98</div>
                            <div className="text-sm text-[var(--color-text-secondary)]">Trust Score</div>
                        </div>
                    </Card>

                    <Card title="Active Threats">
                        <div className="flex items-center justify-center h-32 text-[var(--color-text-muted)]">
                            No active threats detected.
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-3">
                    <Card title="Security Log">
                        <div className="space-y-1">
                            {[
                                { time: '10:42:01 AM', event: 'Remote unlock requested via App', status: 'Authorized', risk: 'Low' },
                                { time: '09:15:33 AM', event: 'Engine start sequence initiated', status: 'Authorized', risk: 'Low' },
                                { time: 'Yesterday', event: 'Unusual geolocation access detected (New Device)', status: 'Flagged', risk: 'Medium' },
                                { time: 'Yesterday', event: 'Password reset attempt detected', status: 'Blocked', risk: 'High' },
                            ].map((log, i) => (
                                <div key={i} className="grid grid-cols-12 gap-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded-lg transition-colors">
                                    <div className="col-span-3 text-sm text-[var(--color-text-secondary)]">{log.time}</div>
                                    <div className="col-span-5 text-sm text-white font-medium">{log.event}</div>
                                    <div className="col-span-2 text-sm">
                                        <span className={`px-2 py-1 rounded text-xs ${log.status === 'Blocked' ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                                            {log.status}
                                        </span>
                                    </div>
                                    <div className="col-span-2 text-sm text-right">
                                        <span className={`font-bold ${log.risk === 'High' ? 'text-red-500' : log.risk === 'Medium' ? 'text-yellow-500' : 'text-gray-500'}`}>
                                            {log.risk}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
