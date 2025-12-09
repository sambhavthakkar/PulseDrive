import React from 'react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Input = React.forwardRef(({ className, label, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                {leftIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-muted)]">
                        {leftIcon}
                    </div>
                )}
                <input
                    ref={ref}
                    className={cn(
                        "flex h-10 w-full rounded-[var(--radius-input)] border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--text-muted)] focus-visible:outline-none focus-visible-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200",
                        leftIcon && "pl-10",
                        rightIcon && "pr-10",
                        error && "border-[var(--color-error)] focus-visible:ring-[var(--color-error)]",
                        className
                    )}
                    {...props}
                />
                {rightIcon && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[var(--text-muted)]">
                        {rightIcon}
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1.5 text-xs text-[var(--color-error)]">{error}</p>
            )}
        </div>
    );
});

Input.displayName = "Input";

export default Input;
