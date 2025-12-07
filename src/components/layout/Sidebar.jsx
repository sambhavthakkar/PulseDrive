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
    ShieldCheck
} from 'lucide-react';
import { cn } from '../../utils/cn';

const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
            isActive
                ? "bg-[var(--color-purple)] text-white shadow-lg shadow-[var(--color-purple)]/20"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]"
        )}
    >
        <Icon size={20} className="stroke-[1.5px]" />
        <span>{label}</span>
    </NavLink>
);

export default function Sidebar() {
    return (
        <aside className="w-64 h-full bg-[var(--bg-primary)] border-r border-[var(--border-color)] flex flex-col p-6 shrink-0 transition-colors">
            {/* Logo Area */}
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-8 h-8 bg-[var(--color-purple)] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    P
                </div>
                <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">Pulse Drive</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                <div className="text-xs uppercase text-[var(--color-text-muted)] font-bold mb-4 px-4 tracking-wider">Menu</div>

                <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
                <NavItem to="/agents" icon={Users} label="Agent Console" />
                <NavItem to="/schedule" icon={Calendar} label="Scheduling" />
                <NavItem to="/analysis" icon={Activity} label="Data Analysis" />
                <NavItem to="/diagnosis" icon={Zap} label="Diagnosis" />
                <NavItem to="/voice" icon={MessageSquare} label="Voice Command" />
                <NavItem to="/ueba" icon={ShieldCheck} label="Security (UEBA)" />
            </nav>

            {/* Bottom Actions */}
            <div className="mt-auto pt-6 border-t border-[var(--border-color)] space-y-2">
                <NavItem to="/settings" icon={Settings} label="Settings" />

                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)] transition-all text-sm font-medium">
                    <LogOut size={20} className="stroke-[1.5px]" />
                    <span>Log Out</span>
                </button>

            </div>
        </aside>
    );
}
