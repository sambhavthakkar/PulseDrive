import React from 'react';
import { cn } from '../../utils/cn';

export default function Card({ title, children, className, actionItem }) {
    return (
        <div className={cn("bg-[var(--bg-card)] rounded-2xl p-6 flex flex-col h-full shadow-sm transition-colors border border-[var(--border-color)]", className)}>
            {title && (
                <div className="flex items-center justify-between mb-6 shrink-0">
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">{title}</h3>
                    {actionItem && <div>{actionItem}</div>}
                </div>
            )}
            <div className="flex-1 min-h-0 relative">
                {children}
            </div>
        </div>
    );
}
