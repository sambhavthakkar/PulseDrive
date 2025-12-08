// src/services/mockAgentBackend.js

/**
 * Simulates a FastAPI backend with WebSocket/SSE capabilities.
 * Triggers Omnidimension agent workflows and emits real-time events.
 */

class MockAgentBackend {
    constructor() {
        this.listeners = [];
        this.activeScenario = null;
    }

    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    }

    emit(event) {
        this.listeners.forEach(cb => cb(event));
    }

    async startWorkflow(scenarioId) {
        console.log(`[Backend] Starting workflow: ${scenarioId}`);
        this.activeScenario = scenarioId;

        // Reset/Start event
        this.emit({
            timestamp: new Date().toISOString(),
            agent: 'System',
            status: 'running',
            message: `Workflow '${scenarioId}' initialized.`,
            type: 'system'
        });

        const sequence = this.getSequenceForScenario(scenarioId);

        for (const step of sequence) {
            // 1. Agent Running
            await this.delay(800 + Math.random() * 500);
            this.emit({
                timestamp: new Date().toISOString(),
                agent: step.agent,
                status: 'running',
                message: step.startMessage,
                type: 'agent_start'
            });

            // 2. Processing (Simulated Delay)
            await this.delay(1500 + Math.random() * 1000);

            // 3. Agent Completion (or Error)
            const isError = step.forceError;
            this.emit({
                timestamp: new Date().toISOString(),
                agent: step.agent,
                status: isError ? 'alert' : 'completed',
                message: isError ? step.errorMessage : step.completeMessage,
                type: isError ? 'agent_error' : 'agent_complete'
            });

            if (isError) break; // Stop workflow on error if needed, or continue for monitoring
        }

        // Workflow Complete
        await this.delay(500);
        this.emit({
            timestamp: new Date().toISOString(),
            agent: 'System',
            status: 'completed',
            message: `Workflow '${scenarioId}' execution finished.`,
            type: 'system'
        });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getSequenceForScenario(id) {
        const commonSteps = [
            { agent: 'Data Analysis Agent', startMessage: 'Ingesting raw telemetry...', completeMessage: 'Data normalized. No formatting errors.', forceError: false },
            { agent: 'Diagnosis Agent', startMessage: 'Running predictive models...', completeMessage: 'Analysis complete. Risk score: 42/100.', forceError: false },
            { agent: 'Digital Twin Verification', startMessage: 'Simulating load parameters...', completeMessage: 'Simulation PASSED. Model converging.', forceError: false },
            { agent: 'Voice Engagement Agent', startMessage: 'Formulating driver notification...', completeMessage: 'Notification sent via App.', forceError: false },
            { agent: 'Scheduling Agent', startMessage: 'Querying dealer APIs...', completeMessage: 'Slots retrieved. Appointment logical.', forceError: false },
            { agent: 'Manufacturing Insights', startMessage: 'Aggregating fleet data...', completeMessage: 'Feedback loop closed with OEM.', forceError: false },
            { agent: 'UEBA Security Agent', startMessage: 'Scanning behavior patterns...', completeMessage: 'No anomalies detected.', forceError: false },
        ];

        switch (id) {
            case 'predictive-flow':
                return [
                    { agent: 'Data Analysis Agent', startMessage: 'Streaming sensor buffer...', completeMessage: 'Ingestion successful. 1.2GB processed.', forceError: false },
                    { agent: 'Diagnosis Agent', startMessage: 'Detecting vibration signatures...', completeMessage: 'Brake pad wear deviation detected (12%).', forceError: false },
                    { agent: 'Digital Twin Verification', startMessage: 'Verifying wear patterns...', completeMessage: 'Wear pattern CONFIRMED by physics model.', forceError: false },
                    { agent: 'Voice Engagement Agent', startMessage: 'Drafting alert...', completeMessage: 'Driver notified: "Service recommended".', forceError: false },
                    { agent: 'Scheduling Agent', startMessage: 'Booking service...', completeMessage: 'Tentative slot holding: Tuesday 10AM.', forceError: false },
                    { agent: 'UEBA Security Agent', startMessage: 'Monitoring process...', completeMessage: 'Security check passed.', forceError: false },
                ];
            case 'urgent-failure':
                return [
                    { agent: 'Data Analysis Agent', startMessage: 'Emergency telemetry stream...', completeMessage: 'Critical flag received from ECU.', forceError: false },
                    { agent: 'Diagnosis Agent', startMessage: 'Isolating fault...', completeMessage: 'CRITICAL: Hydraulic pressure loss.', forceError: true, errorMessage: 'CRITICAL FAILURE DETECTED. IMMEDIATE STOP ADVISED.' },
                    { agent: 'Voice Engagement Agent', startMessage: 'Overrides active...', completeMessage: 'Emergency call triggered.', forceError: false },
                    { agent: 'UEBA Security Agent', startMessage: 'Verifying command origin...', completeMessage: 'Command authenticated.', forceError: false },
                ];
            case 'ueba-anomaly':
                return [
                    { agent: 'Data Analysis Agent', startMessage: 'Standard ingestion...', completeMessage: 'Data OK.', forceError: false },
                    { agent: 'UEBA Security Agent', startMessage: 'Analyzing access tokens...', completeMessage: 'UNAUTHORIZED ACCESS ATTEMPT.', forceError: true, errorMessage: 'Session Token Mismatch. Workflow Halted.' }
                ];
            default:
                return commonSteps;
        }
    }
}

export const mockBackend = new MockAgentBackend();
