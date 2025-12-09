import React from 'react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Card({ title, subtitle, children, className, actionItem, noPadding = false }) {
    return (
        <div className={cn("card-base flex flex-col", !noPadding && "p-6", className)}>
            {(title || actionItem) && (
                <div className={cn("flex items-center justify-between shrink-0 mb-6", noPadding && "p-6 pb-0")}>
                    <div className="flex flex-col gap-1">
                        {title && <h3 className="h3 text-[var(--text-primary)]">{title}</h3>}
                        {subtitle && <p className="body-reg text-[var(--text-muted)]">{subtitle}</p>}
                    </div>
                    {actionItem && <div>{actionItem}</div>}
                </div>
            )}
            <div className={cn("flex-1 min-h-0 relative", noPadding && "p-0")}>
                {children}
            </div>
        </div>
    );
}
