import React from 'react';
import AgentOrchestrator from '../components/agents/AgentOrchestrator';

export default function AgentConsole() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white">Agent Console – Multi-Agent Coordination Panel</h2>
                <p className="text-[var(--color-text-secondary)] text-sm">Shows how AI agents coordinate predictive maintenance, customer engagement, scheduling, and manufacturing insights.</p>
            </div>

            <AgentOrchestrator />
        </div>
    );
}
