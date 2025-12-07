import React, { useState } from 'react';
import Card from '../components/common/Card';
import { Mic, Play, Square, ThumbsUp, ThumbsDown, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VoiceAgent() {
    const [isListening, setIsListening] = useState(false);

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col items-center justify-center max-w-4xl mx-auto space-y-8">

            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-white">Voice Command Interface</h2>
                <p className="text-[var(--color-text-secondary)]">Interact with your vehicle naturally</p>
            </div>

            {/* Main Voice Card */}
            <Card className="w-full relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center border border-[var(--color-primary)]/20 shadow-[0_0_50px_rgba(161,98,247,0.1)]">

                {/* Waveform Animation */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-64 h-64 rounded-full border border-[var(--color-primary)]"
                            animate={{
                                scale: isListening ? [1, 2.5] : 1,
                                opacity: isListening ? [0.5, 0] : 0.1,
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.4,
                                ease: "easeOut"
                            }}
                        />
                    ))}
                </div>

                <div className="z-10 flex flex-col items-center gap-8 w-full max-w-lg">
                    <button
                        onClick={() => setIsListening(!isListening)}
                        className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${isListening ? 'bg-[var(--color-accent-red)] shadow-[0_0_30px_rgba(255,99,112,0.5)]' : 'bg-[var(--color-primary)] hover:scale-105 shadow-[0_0_30px_rgba(161,98,247,0.5)]'}`}
                    >
                        {isListening ? <Square className="fill-white" size={32} /> : <Mic className="text-white" size={32} />}
                    </button>

                    <div className="w-full space-y-4">
                        <div className="bg-[var(--color-bg-dark)]/50 p-4 rounded-xl text-center min-h-[60px] flex items-center justify-center">
                            {isListening ? (
                                <span className="text-[var(--color-text-white)] text-lg animate-pulse">Listening...</span>
                            ) : (
                                <span className="text-[var(--color-text-muted)] italic">"Check my tire pressure and schedule a service if needed."</span>
                            )}
                        </div>

                        {/* Quick Actions */}
                        {!isListening && (
                            <div className="flex justify-center gap-4">
                                <ActionButton icon={ThumbsUp} label="Confirm" color="green" />
                                <ActionButton icon={ThumbsDown} label="Reject" color="red" />
                                <ActionButton icon={Clock} label="Later" color="gray" />
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
}

const ActionButton = ({ icon: Icon, label, color }) => {
    const colors = {
        green: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
        red: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
        gray: 'bg-gray-500/10 text-gray-400 hover:bg-gray-500/20',
    };

    return (
        <button className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${colors[color]}`}>
            <Icon size={18} />
            {label}
        </button>
    );
};
