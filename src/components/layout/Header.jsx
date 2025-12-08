import React from 'react';
import { Search, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
    return (
        <header className="h-20 flex items-center justify-between px-8 shrink-0 bg-[var(--bg-primary)] transition-colors relative z-20">
            {/* Search Bar */}
            <div className="relative w-96 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--color-purple)] transition-colors" size={20} />
                <input
                    type="text"
                    placeholder="Search for car or agent..."
                    className="w-full bg-[var(--bg-card)] text-[var(--text-primary)] pl-10 pr-4 py-2.5 rounded-xl border border-transparent focus:border-[var(--color-purple)] outline-none transition-all placeholder-[var(--text-muted)] text-sm shadow-sm focus:shadow-[0_0_15px_rgba(161,98,247,0.1)]"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] rounded-full transition-colors"
                >
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-[var(--color-accent-red)] rounded-full border border-[var(--bg-primary)] animate-pulse"></span>
                </motion.button>

                <div className="flex items-center gap-3 pl-6 border-l border-[var(--border-color)]">
                    <div className="text-right hidden md:block">
                        <div className="text-sm font-bold text-[var(--text-primary)]">Sambhav Thakkar</div>
                        <div className="text-xs text-[var(--text-secondary)] flex items-center justify-end gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            Online
                        </div>
                    </div>
                    <motion.a
                        href="/profile"
                        whileHover={{ scale: 1.05 }}
                        className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-purple)] to-purple-400 p-[2px] cursor-pointer"
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
