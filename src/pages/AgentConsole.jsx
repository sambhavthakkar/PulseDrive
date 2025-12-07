import React from 'react';
import AgentOrchestrator from '../components/agents/AgentOrchestrator';

export default function AgentConsole() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white">Agent Console</h2>
                <p className="text-[var(--color-text-secondary)] text-sm">Real-time multi-agent orchestration service.</p>
            </div>

            <AgentOrchestrator />
        </div>
    );
}
