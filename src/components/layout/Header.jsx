import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

export default function Header({ onMenuClick }) {
    return (
        <header className="h-20 flex items-center justify-between px-6 md:px-8 shrink-0 bg-[var(--bg-app)]/80 backdrop-blur-md sticky top-0 z-30 border-b border-[var(--border-subtle)] transition-colors">
            {/* Left: Mobile Menu + Search */}
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] rounded-lg"
                    aria-label="Open menu"
                >
                    <Menu size={24} />
                </button>

                <div className="relative w-full max-w-md group hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--color-primary)] transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search for car or agent..."
                        aria-label="Search"
                        className="w-full bg-[var(--bg-elevated)] text-[var(--text-primary)] pl-10 pr-4 py-2.5 rounded-[var(--radius-input)] border border-transparent focus:border-[var(--color-primary)] outline-none transition-all placeholder-[var(--text-muted)] text-sm shadow-sm focus:shadow-[var(--shadow-glow)]"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 md:gap-6">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] rounded-full transition-colors"
                    aria-label="Notifications"
                >
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-[var(--color-error)] rounded-full border border-[var(--bg-app)] animate-pulse"></span>
                </motion.button>

                <div className="flex items-center gap-3 pl-4 md:pl-6 border-l border-[var(--border-default)]">
                    <div className="text-right hidden md:block">
                        <div className="text-sm font-bold text-[var(--text-primary)]">Sambhav Thakkar</div>
                        <div className="text-xs text-[var(--text-secondary)] flex items-center justify-end gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]"></span>
                            Online
                        </div>
                    </div>
                    <motion.a
                        href="/profile"
                        whileHover={{ scale: 1.05 }}
                        className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-purple-400 p-[2px] cursor-pointer"
                    >
                        <div className="w-full h-full rounded-full bg-[var(--bg-card)] flex items-center justify-center overflow-hidden">
                            <img src="https://ui-avatars.com/api/?name=Sambhav+Thakkar&background=random" alt="User" />
                        </div>
                    </motion.a>
                </div>
            </div>
        </header>
    );
}
