/**
 * OmnidimensionWidget.jsx
 * =======================
 * Reusable component for embedding Omnidimension AI agent widgets.
 * 
 * Usage:
 *   <OmnidimensionWidget secretKey="b046f41bae..." widgetId="voice-agent" />
 */

import React, { useEffect, useRef } from 'react';

export default function OmnidimensionWidget({
    secretKey,
    widgetId = 'omnidimension-widget',
    className = '',
    onLoad = () => { }
}) {
    const containerRef = useRef(null);
    const scriptLoadedRef = useRef(false);

    useEffect(() => {
        // Prevent double-loading
        if (scriptLoadedRef.current) return;
        if (!secretKey) return;

        // Check if script already exists
        const existingScript = document.getElementById(`omnidimension-${widgetId}`);
        if (existingScript) {
            scriptLoadedRef.current = true;
            onLoad();
            return;
        }

        // Create and append script
        const script = document.createElement('script');
        script.id = `omnidimension-${widgetId}`;
        script.src = `https://omnidim.io/web_widget.js?secret_key=${secretKey}`;
        script.async = true;

        script.onload = () => {
            scriptLoadedRef.current = true;
            onLoad();
        };

        script.onerror = () => {
            console.error(`[OmnidimensionWidget] Failed to load widget: ${widgetId}`);
        };

        document.body.appendChild(script);

        // Cleanup on unmount
        return () => {
            const scriptToRemove = document.getElementById(`omnidimension-${widgetId}`);
            if (scriptToRemove) {
                document.body.removeChild(scriptToRemove);
            }
            scriptLoadedRef.current = false;
        };
    }, [secretKey, widgetId, onLoad]);

    return (
        <div
            ref={containerRef}
            id={`omnidimension-container-${widgetId}`}
            className={`omnidimension-widget-container ${className}`}
        >
            {/* Widget renders here via external script */}
        </div>
    );
}

// Pre-configured widget components for convenience
export function VoiceAgentWidget({ className, onLoad }) {
    return (
        <OmnidimensionWidget
            secretKey="b046f41bae8c8b327786217827b52446"
            widgetId="voice-agent"
            className={className}
            onLoad={onLoad}
        />
    );
}

export function FeedbackAgentWidget({ className, onLoad }) {
    return (
        <OmnidimensionWidget
            secretKey="e2279dd59e2b3744e9a4b178df4b8862"
            widgetId="feedback-agent"
            className={className}
            onLoad={onLoad}
        />
    );
}

// Placeholder widgets (to be replaced with actual secret keys)
export function DataAnalysisWidget({ className }) {
    return (
        <div className={`text-gray-500 text-xs p-4 border border-dashed border-gray-600 rounded-lg ${className}`}>
            {/* <!-- DATA_ANALYSIS_WIDGET --> */}
            <span>Data Analysis Widget Placeholder</span>
        </div>
    );
}

export function ManufacturingWidget({ className }) {
    return (
        <div className={`text-gray-500 text-xs p-4 border border-dashed border-gray-600 rounded-lg ${className}`}>
            {/* <!-- MANUFACTURING_WIDGET --> */}
            <span>Manufacturing Insights Widget Placeholder</span>
        </div>
    );
}

export function UEBAWidget({ className }) {
    return (
        <div className={`text-gray-500 text-xs p-4 border border-dashed border-gray-600 rounded-lg ${className}`}>
            {/* <!-- UEBA_WIDGET --> */}
            <span>UEBA Security Widget Placeholder</span>
        </div>
    );
}
