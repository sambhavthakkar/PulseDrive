import React from 'react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const variants = {
    default: "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-default)]",
    success: "bg-[rgba(34,197,94,0.1)] text-[var(--color-success)] border-[rgba(34,197,94,0.2)]",
    warning: "bg-[rgba(246,204,13,0.1)] text-[var(--color-warning)] border-[rgba(246,204,13,0.2)]",
    error: "bg-[rgba(255,99,112,0.1)] text-[var(--color-error)] border-[rgba(255,99,112,0.2)]",
    info: "bg-[rgba(40,132,255,0.1)] text-[var(--color-info)] border-[rgba(40,132,255,0.2)]",
    outline: "bg-transparent border-[var(--border-default)] text-[var(--text-secondary)]",
};

export default function Badge({ children, variant = "default", className }) {
    return (
        <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors",
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
}
