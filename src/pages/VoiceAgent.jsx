import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import { Mic, Square, Check, X, Clock, Zap, MessageSquare, Star, Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VoiceAgent() {
    // States: 'idle', 'listening', 'processing', 'suggestion'
    const [viewState, setViewState] = useState('idle');
    const [transcript, setTranscript] = useState('');
    const [history, setHistory] = useState([
        { role: 'user', text: "Run system diagnostics.", timestamp: '2 mins ago' },
        { role: 'ai', text: "All systems green. Tire pressure is slightly low. Would you like me to schedule a quick service?", timestamp: 'Just now' }
    ]);
    const [feedbackActive, setFeedbackActive] = useState(true);

    // Feedback States
    const [rating, setRating] = useState(0);
    const [selectedTags, setSelectedTags] = useState([]);

    const toggleTag = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    // Mock interaction loop
    const startListening = () => {
        setViewState('listening');
        setTranscript('');

        // Simulate speaking duration
        setTimeout(() => {
            setViewState('processing');
            // Simulate processing
            setTimeout(() => {
                setViewState('suggestion');
                setTranscript("I've found a slot tomorrow at 10 AM. Shall I book it?");
                setHistory(prev => [
                    ...prev,
                    { role: 'ai', text: "I've found a slot tomorrow at 10 AM. Shall I book it?", timestamp: 'Just now' }
                ]);
            }, 2500);
        }, 3000);
    };

    const handleAction = (type) => {
        setViewState('idle');
        // Activate feedback panel after an interaction
        setFeedbackActive(true);
    };

    const stateMessages = {
        idle: "Ready",
        listening: "Listening...",
        processing: "Processing...",
        suggestion: "Responding..."
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto p-4">

            {/* LEFT: VOICE ASSISTANT AGENT */}
            <div className="flex-[1.5] flex flex-col gap-6">
                <Card className="h-full flex flex-col relative overflow-hidden border-[var(--color-primary)]/20 shadow-2xl">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

                    {/* Header */}
                    <div className="relative z-10 flex items-center justify-between p-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold text-white tracking-tight">Voice Assistant</h2>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                <span className={`w-2 h-2 rounded-full ${viewState === 'idle' ? 'bg-gray-400' : viewState === 'listening' ? 'bg-[var(--color-purple)]' : 'bg-teal-400'} animate-pulse`}></span>
                                <span className="text-xs font-medium text-gray-300 uppercase tracking-widest">{stateMessages[viewState]}</span>
                            </div>
                        </div>
                    </div>

                    {/* Center: ORB & TRANSCRIPT */}
                    <div className="flex-1 flex flex-col items-center justify-center relative z-10 min-h-[300px]">

                        {/* THE ORB */}
                        <div className="mb-8">
                            <Orb state={viewState} onToggle={startListening} />
                        </div>

                        {/* Transcript / Chat Area */}
                        <div className="w-full max-w-xl px-6">
                            <AnimatePresence mode="wait">
                                {viewState === 'processing' ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                        className="flex justify-center gap-1.5"
                                    >
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col gap-4">
                                        {history.slice(-2).map((msg, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                            >
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-[var(--color-purple)]' : 'bg-gray-700'}`}>
                                                    {msg.role === 'ai' ? <Zap size={14} className="text-white fill-white" /> : <span className="text-xs font-bold text-white">YOU</span>}
                                                </div>
                                                <div className={`px-5 py-3 rounded-2xl text-sm leading-relaxed max-w-[85%] shadow-lg ${msg.role === 'user'
                                                    ? 'bg-[var(--color-primary)] text-white rounded-tr-none'
                                                    : 'bg-white/5 text-gray-100 border border-white/5 rounded-tl-none'
                                                    }`}>
                                                    {msg.text}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Footer: ACTIONS */}
                    <div className="relative z-10 p-6 bg-gradient-to-t from-[var(--bg-card)] to-transparent">
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex gap-4">
                                <InteractiveButton icon={Check} label="Confirm" color="green" onClick={() => handleAction('confirm')} />
                                <InteractiveButton icon={X} label="Decline" color="red" onClick={() => handleAction('decline')} />
                                <InteractiveButton icon={Clock} label="Later" color="gray" onClick={() => handleAction('later')} />
                            </div>
                            <p className="text-xs text-center text-gray-500 font-medium">
                                Next: Scheduling Agent will propose time slots if you confirm.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* RIGHT: FEEDBACK AGENT */}
            <div className={`flex-1 transition-all duration-700 ${feedbackActive ? 'opacity-100 translate-x-0 grayscale-0' : 'opacity-60 translate-x-0 grayscale filter'}`}>
                <Card className={`h-full flex flex-col border-[var(--color-primary)]/20 shadow-xl relative overflow-hidden ${feedbackActive ? 'ring-1 ring-[var(--color-purple)]/50' : ''}`}>

                    {/* Header */}
                    <div className="p-6 border-b border-white/5">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Star className={`fill-[var(--color-purple)] text-[var(--color-purple)]`} size={20} />
                            Feedback Agent
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">Capture service experience to improve future recommendations.</p>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col gap-8">

                        {/* 1. Rating */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-300">Overall Experience</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className="group p-1 transition-transform hover:scale-110 focus:outline-none"
                                    >
                                        <Star
                                            size={32}
                                            className={`${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} transition-colors duration-300`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Tags */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-300">Quick Tags</label>
                            <div className="flex flex-wrap gap-2">
                                {['Service Quality', 'Wait Time', 'Cost Transparency', 'Staff Behavior', 'App Experience'].map(tag => {
                                    const isSelected = selectedTags.includes(tag);
                                    return (
                                        <button
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${isSelected
                                                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                                                : 'border-white/10 hover:bg-white/5 text-gray-400'
                                                }`}
                                        >
                                            {tag}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 3. AI Sentiment Analysis */}
                        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-gray-400 uppercase">AI Interpretation</span>
                                {rating > 0 ? (
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${rating >= 4 ? 'bg-green-500/20 text-green-400' : rating >= 3 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {rating >= 4 ? 'Positive' : rating >= 3 ? 'Neutral' : 'Critical'}
                                    </span>
                                ) : (
                                    <span className="text-[10px] text-gray-600 italic">Waiting for input...</span>
                                )}
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                {rating === 0
                                    ? "Awaiting user feedback..."
                                    : rating >= 4
                                        ? "User indicates high satisfaction with the scheduling process."
                                        : "User highlights areas for improvement in the service experience."
                                }
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/5 bg-black/20">
                        <button
                            className="w-full py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-primary)]/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => {
                                setFeedbackActive(false);
                                setRating(0);
                                setSelectedTags([]);
                            }}
                            disabled={rating === 0}
                        >
                            <Send size={16} />
                            Submit Feedback
                        </button>
                        <div className="mt-4 flex items-center justify-between text-[10px] text-gray-500">
                            <span>Last Service: 14 days ago</span>
                            <span>Stored in history</span>
                        </div>
                    </div>

                </Card>
            </div>
        </div>
    );
}

// --- SUB COMPONENTS ---

const Orb = ({ state, onToggle }) => {
    const isActive = state !== 'idle';
    const isListening = state === 'listening';
    const isProcessing = state === 'processing';
    const isSpeaking = state === 'suggestion';

    return (
        <div className="relative w-48 h-48 flex items-center justify-center cursor-pointer group" onClick={onToggle}>
            {/* Listening Ripples */}
            {isListening && (
                <>
                    <motion.div animate={{ scale: [1, 1.8], opacity: [0.5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 rounded-full border border-[var(--color-purple)]" />
                    <motion.div animate={{ scale: [1, 2.2], opacity: [0.3, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.3 }} className="absolute inset-0 rounded-full border border-[var(--color-purple)]" />
                </>
            )}
            {/* Speaking Ripples (Teal) */}
            {isSpeaking && (
                <>
                    <motion.div animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 rounded-full border border-teal-500" />
                </>
            )}

            {/* Core Orb */}
            <motion.div
                className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-700 z-10
                    ${isListening ? 'bg-gradient-to-br from-[var(--color-purple)] to-indigo-600 shadow-[0_0_60px_rgba(168,85,247,0.6)] scale-110' :
                        isProcessing ? 'bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_0_50px_rgba(37,99,235,0.5)] rotate-180' :
                            isSpeaking ? 'bg-gradient-to-br from-teal-500 to-emerald-500 shadow-[0_0_50px_rgba(20,184,166,0.5)]' :
                                'bg-gradient-to-br from-gray-800 to-black border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] group-hover:border-[var(--color-purple)]/50'
                    }
                `}
                animate={isListening ? { scale: [1, 1.05, 1] } : isProcessing ? { rotate: 360 } : isSpeaking ? { scale: [1, 1.02, 1] } : {}}
                transition={isListening ? { repeat: Infinity, duration: 1.5 } : { repeat: Infinity, duration: 1, ease: "linear" }}
            >
                {/* Inner Detail */}
                <div className="absolute inset-1 rounded-full border border-white/20 opacity-40"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent opacity-30"></div>

                {isActive ? <Square className="fill-white text-white relative z-20" size={28} /> : <Mic size={36} className="text-white translate-y-[1px] relative z-20" />}
            </motion.div>
        </div>
    );
};

const InteractiveButton = ({ icon: Icon, label, color, onClick }) => {
    const styles = {
        green: 'bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]',
        red: 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]',
        gray: 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl border font-bold transition-all duration-300 ${styles[color]}`}
        >
            <Icon size={18} />
            {label}
        </motion.button>
    );
};
