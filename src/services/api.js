import { faker } from '@faker-js/faker';

// Delay helper to simulate network latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
    // 1. Dashboard Telemetry
    getTelemetry: async () => {
        await delay(300);
        return {
            battery: { value: 78, status: 'normal', trend: 'down' },
            oil: { value: 92, status: 'good', trend: 'stable' },
            brakeFluid: { value: 88, status: 'good', trend: 'stable' },
            mileage: 45231,
            temperature: { value: 82, unit: 'C', status: 'normal' },
            tirePressure: [32, 32, 31, 32], // PSI
            range: 240, // miles
        };
    },

    // 2. Agent Console Events
    getAgentEvents: async () => {
        // Generate a random new event
        const agents = ['Data', 'Diagnosis', 'Voice', 'Scheduling', 'Feedback', 'Manufacturing', 'Security'];
        const actions = [
            'analyzed telemetry stream',
            'detected minor anomaly in brake sensor',
            'verified digital twin simulation',
            'received user voice command',
            'booked service slot #402',
            'updated defect probability heatmap',
            'flagged suspicious access attempt'
        ];

        return {
            id: faker.string.uuid(),
            timestamp: new Date().toISOString(),
            agent: faker.helpers.arrayElement(agents),
            message: faker.helpers.arrayElement(actions),
            severity: faker.helpers.arrayElement(['info', 'success', 'warning', 'critical'])
        };
    },

    // 3. Diagnosis Data
    getDiagnosis: async () => {
        await delay(500);
        return {
            healthScore: 88,
            predictedFailures: [
                { part: 'Brake Pads', probability: 86, timeLeft: '2 weeks', severity: 'high' },
                { part: 'Oil Filter', probability: 45, timeLeft: '2 months', severity: 'low' },
                { part: 'HVAC Compressor', probability: 12, timeLeft: '6 months', severity: 'low' },
            ]
        };
    },

    // 4. Digital Twin Simulation Results
    runSimulation: async (params) => {
        await delay(2000); // Simulate processing time
        return {
            success: true,
            metrics: {
                heat: 'Optimized',
                vibration: 'Within Limits',
                stress: 'Normal'
            },
            verified: true,
            timestamp: new Date().toISOString()
        };
    },

    // 5. Scheduling
    getSlots: async () => {
        await delay(400);
        return [
            { id: 1, time: '10:00 AM', date: '2025-10-24', available: true },
            { id: 2, time: '12:30 PM', date: '2025-10-24', available: true },
            { id: 3, time: '02:00 PM', date: '2025-10-25', available: true },
            { id: 4, time: '04:15 PM', date: '2025-10-26', available: true },
        ];
    },

    // 6. Voice Agent History
    getVoiceHistory: async () => {
        await delay(200);
        return [
            { id: 1, type: 'user', text: "What's my current range?" },
            { id: 2, type: 'agent', text: "Your current range is 240 miles. Battery is at 78%." },
            { id: 3, type: 'user', text: "Book a service for the brakes." },
            { id: 4, type: 'agent', text: "I found a slot for tomorrow at 10 AM. Shall I confirm?" },
        ]
    }
};
