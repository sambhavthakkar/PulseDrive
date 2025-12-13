/**
 * Backend API Service
 * ====================
 * Connects React frontend to the FastAPI backend.
 * Replaces mock data with real API calls.
 */

// Use environment variable for API URL or fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_BASE = `${API_BASE_URL}/api`;

// Helper for API calls
async function fetchAPI(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;

    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers: { ...defaultHeaders, ...options.headers },
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`[API] ${endpoint} failed:`, error);
        throw error;
    }
}

// ============== Dashboard ==============
export async function getDashboardStats() {
    return fetchAPI('/dashboard/stats');
}

export async function getLiveTelemetry() {
    return fetchAPI('/dashboard/live-telemetry');
}

export async function getVehicleInfo() {
    return fetchAPI('/dashboard/vehicle-info');
}

// ============== Telematics ==============
export async function ingestTelemetry(data) {
    return fetchAPI('/telematics/ingest', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function getLatestTelemetry(vehicleId) {
    return fetchAPI(`/telematics/latest/${vehicleId}`);
}

// ============== Diagnostics ==============
export async function runDiagnostics(vehicleId, options = {}) {
    return fetchAPI('/diagnostics/run', {
        method: 'POST',
        body: JSON.stringify({
            vehicle_id: vehicleId,
            include_predictions: options.includePredictions ?? true,
            include_root_cause: options.includeRootCause ?? true,
        }),
    });
}

export async function quickHealthCheck(vehicleId) {
    return fetchAPI(`/diagnostics/quick-check/${vehicleId}`);
}

// ============== Scheduling ==============
export async function findAvailableSlots(centerId = null, date = null) {
    let endpoint = '/scheduling/find-slots';
    const params = new URLSearchParams();
    if (centerId) params.append('center_id', centerId);
    if (date) params.append('date', date);
    if (params.toString()) endpoint += `?${params.toString()}`;

    return fetchAPI(endpoint);
}

export async function confirmBooking(bookingData) {
    return fetchAPI('/scheduling/confirm', {
        method: 'POST',
        body: JSON.stringify(bookingData),
    });
}

export async function getVehicleBookings(vehicleId) {
    return fetchAPI(`/scheduling/bookings/${vehicleId}`);
}

export async function cancelBooking(bookingId) {
    return fetchAPI(`/scheduling/cancel/${bookingId}`, {
        method: 'DELETE',
        body: JSON.stringify({ reason: 'User requested cancellation' }),
    });
}

// ============== Feedback ==============
export async function submitFeedback(feedbackData) {
    return fetchAPI('/feedback/submit', {
        method: 'POST',
        body: JSON.stringify(feedbackData),
    });
}

export async function getFeedbackHistory(vehicleId) {
    return fetchAPI(`/feedback/history/${vehicleId}`);
}

export async function getFeedbackAnalytics() {
    return fetchAPI('/feedback/analytics');
}

// ============== Voice ==============
export async function transcribeVoice(textFallback) {
    return fetchAPI('/voice/transcribe', {
        method: 'POST',
        body: JSON.stringify({ text_fallback: textFallback }),
    });
}

export async function processVoiceCommand(text) {
    return fetchAPI('/voice/command', {
        method: 'POST',
        body: JSON.stringify({ text_fallback: text }),
    });
}

// ============== UEBA ==============
export async function getSecurityLogs(limit = 20, status = null, riskLevel = null) {
    let endpoint = `/ueba/logs?limit=${limit}`;
    if (status) endpoint += `&status=${status}`;
    if (riskLevel) endpoint += `&risk_level=${riskLevel}`;

    return fetchAPI(endpoint);
}

export async function getTrustScore(vehicleId) {
    return fetchAPI(`/ueba/trust-score/${vehicleId}`);
}

export async function getActiveAnomalies() {
    return fetchAPI('/ueba/anomalies');
}

// ============== Agents ==============
export async function getAllAgentStatus() {
    return fetchAPI('/agents/status');
}

export async function triggerWorkflow(workflowId, vehicleId = null) {
    return fetchAPI('/agents/trigger', {
        method: 'POST',
        body: JSON.stringify({
            workflow_id: workflowId,
            vehicle_id: vehicleId,
        }),
    });
}

// ============== WebSocket ==============
export function connectToAgentEvents(onMessage, onError = console.error) {
    // Convert http/https to ws/wss
    const wsBase = API_BASE_URL.replace(/^http/, 'ws');
    const wsUrl = `${wsBase}/api/agents/events`;
    
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
        console.log('[WS] Connected to Agent Events');
    };

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            onMessage(data);
        } catch (e) {
            console.error('[WS] Parse error:', e);
        }
    };

    ws.onerror = (error) => {
        console.error('[WS] Error:', error);
        onError(error);
    };

    ws.onclose = () => {
        console.log('[WS] Disconnected');
    };

    // Return cleanup function
    return () => {
        ws.close();
    };
}

// ============== Health Check ==============
export async function checkBackendHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        return response.ok;
    } catch {
        return false;
    }
}
