import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Activity,
    Settings,
    LogOut,
    Zap,
    Users,
    Calendar,
    MessageSquare,
    ShieldCheck,
    X
} from 'lucide-react';
import { cn } from '../../utils/cn';

const NavItem = ({ to, icon: Icon, label, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 rounded-[var(--radius-button)] transition-all duration-200 group text-sm font-medium",
            isActive
                ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--shadow-glow)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]"
        )}
    >
        <Icon size={20} className="stroke-[1.5px]" />
        <span>{label}</span>
    </NavLink>
);

export default function Sidebar({ isOpen, onClose }) {
    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar Container */}
            <aside className={cn(
                "fixed md:sticky top-0 left-0 w-64 h-full bg-[var(--bg-card)] border-r border-[var(--border-default)] flex flex-col p-6 shrink-0 transition-transform duration-300 z-50",
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>
                {/* Logo Area */}
                <div className="flex items-center justify-between mb-10 px-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-[var(--shadow-glow)]">
                            P
                        </div>
                        <h1 className="h3 tracking-tight text-[var(--text-primary)]">Pulse Drive</h1>
                    </div>
                    {/* Mobile Close Button */}
                    <button onClick={onClose} className="md:hidden text-[var(--text-secondary)]" aria-label="Close sidebar">
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1.5 overflow-y-auto">
                    <div className="text-xs uppercase text-[var(--text-muted)] font-bold mb-4 px-4 tracking-wider">Menu</div>

                    <NavItem to="/" icon={LayoutDashboard} label="Dashboard" onClick={onClose} />
                    <NavItem to="/agents" icon={Users} label="Agent Console" onClick={onClose} />
                    <NavItem to="/schedule" icon={Calendar} label="Scheduling" onClick={onClose} />
                    <NavItem to="/analysis" icon={Activity} label="Data Analysis" onClick={onClose} />
                    <NavItem to="/diagnosis" icon={Zap} label="Diagnosis" onClick={onClose} />
                    <NavItem to="/voice" icon={MessageSquare} label="Voice Command" onClick={onClose} />
                    <NavItem to="/ueba" icon={ShieldCheck} label="Security (UEBA)" onClick={onClose} />
                </nav>

                {/* Bottom Actions */}
                <div className="mt-auto pt-6 border-t border-[var(--border-default)] space-y-2">
                    <NavItem to="/settings" icon={Settings} label="Settings" onClick={onClose} />

                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-[var(--radius-button)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)] transition-all text-sm font-medium">
                        <LogOut size={20} className="stroke-[1.5px]" />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
