import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  leftIcon,
  rightIcon,
  children, 
  disabled,
  ...props 
}, ref) => {
  
  const variants = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-lg shadow-[var(--shadow-glow)]',
    secondary: 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-default)] hover:bg-[var(--bg-card-hover)] hover:border-[var(--border-strong)]',
    ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-glass-hover)]',
    danger: 'bg-[var(--color-error)] text-white hover:brightness-110 shadow-lg shadow-[rgba(255,99,112,0.3)]',
  };

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2 text-base',
    lg: 'h-12 px-6 text-lg',
    icon: 'h-10 w-10 p-2 flex items-center justify-center',
  };

  return (
    <button
      ref={ref}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none focus-visible-ring',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!isLoading && leftIcon && <span className="mr-1">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-1">{rightIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
