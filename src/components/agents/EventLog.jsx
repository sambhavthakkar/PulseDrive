import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventLog({ logs }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    return (
        <div className="bg-black/40 rounded-xl border border-white/5 font-mono text-sm h-full flex flex-col overflow-hidden backdrop-blur-sm">
            <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between shrink-0">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-xs text-[var(--color-text-muted)]">system_events.log</div>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {logs.length === 0 && (
                    <div className="text-[var(--color-text-muted)] italic opacity-50 text-center mt-10">
                        Waiting for agent activity...
                    </div>
                )}
                <AnimatePresence initial={false}>
                    {logs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex gap-3"
                        >
                            <span className="text-[var(--color-text-muted)] shrink-0">[{log.timestamp}]</span>
                            <span className={log.color || 'text-white'}>
                                <span className="font-bold mr-2 text-[var(--color-primary)]">{log.agent}:</span>
                                {log.message}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={bottomRef} />
            </div>
        </div>
    );
}
