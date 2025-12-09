import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Mic, Square, Check, X, Clock, Zap, Star, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mx-auto">

            {/* LEFT: VOICE ASSISTANT AGENT */}
            <div className="lg:col-span-8 flex flex-col gap-6">
                <Card noPadding className="min-h-[600px] flex flex-col relative overflow-hidden border-[var(--color-primary)]/20 shadow-2xl bg-[var(--bg-card)]">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

                    {/* Header */}
                    <div className="relative z-10 flex items-center justify-between p-6">
                        <div className="flex items-center gap-4">
                            <h2 className="h2 text-[var(--text-primary)] tracking-tight">Voice Assistant</h2>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                                <span className={cn(
                                    "w-2 h-2 rounded-full animate-pulse",
                                    viewState === 'idle' ? 'bg-[var(--text-muted)]' :
                                        viewState === 'listening' ? 'bg-[var(--color-primary)]' : 'bg-teal-400'
                                )}></span>
                                <span className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-widest">{stateMessages[viewState]}</span>
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
                                        <span className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce"></span>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col gap-4">
                                        {history.slice(-2).map((msg, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                            >
                                                <div className={cn(
                                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                                    msg.role === 'ai' ? 'bg-[var(--color-primary)]' : 'bg-[var(--bg-elevated)]'
                                                )}>
                                                    {msg.role === 'ai' ? <Zap size={14} className="text-white fill-white" /> : <span className="text-xs font-bold text-[var(--text-primary)]">YOU</span>}
                                                </div>
                                                <div className={cn(
                                                    "px-5 py-3 rounded-2xl text-sm leading-relaxed max-w-[85%] shadow-lg",
                                                    msg.role === 'user'
                                                        ? 'bg-[var(--color-primary)] text-white rounded-tr-none'
                                                        : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-tl-none'
                                                )}>
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
                                <Button variant="success" icon={Check} onClick={() => handleAction('confirm')}>Confirm</Button>
                                <Button variant="danger" icon={X} onClick={() => handleAction('decline')}>Decline</Button>
                                <Button variant="ghost" icon={Clock} onClick={() => handleAction('later')}>Later</Button>
                            </div>
                            <p className="text-xs text-center text-[var(--text-muted)] font-medium">
                                Next: Scheduling Agent will propose time slots if you confirm.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* RIGHT: FEEDBACK AGENT */}
            <div className={cn(
                "lg:col-span-4 transition-all duration-700",
                feedbackActive ? 'opacity-100 translate-x-0 grayscale-0' : 'opacity-60 translate-x-0 grayscale filter'
            )}>
                <Card noPadding className={cn(
                    "h-fit flex flex-col border-[var(--color-primary)]/20 shadow-xl relative overflow-hidden bg-[var(--bg-card)]",
                    feedbackActive && 'ring-1 ring-[var(--color-primary)]/50'
                )}>

                    {/* Header */}
                    <div className="p-6 border-b border-[var(--border-subtle)]">
                        <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                            <Star className="fill-[var(--color-primary)] text-[var(--color-primary)]" size={20} />
                            Feedback Agent
                        </h2>
                        <p className="text-xs text-[var(--text-secondary)] mt-1">Capture service experience to improve future recommendations.</p>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col gap-8">

                        {/* 1. Rating */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-[var(--text-primary)]">Overall Experience</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className="group p-1 transition-transform hover:scale-110 focus:outline-none"
                                    >
                                        <Star
                                            size={32}
                                            className={cn(
                                                "transition-colors duration-300",
                                                star <= rating ? 'fill-[var(--color-warning)] text-[var(--color-warning)]' : 'text-[var(--text-muted)]'
                                            )}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Tags */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-[var(--text-primary)]">Quick Tags</label>
                            <div className="flex flex-wrap gap-2">
                                {['Service Quality', 'Wait Time', 'Cost Transparency', 'Staff Behavior', 'App Experience'].map(tag => {
                                    const isSelected = selectedTags.includes(tag);
                                    return (
                                        <button
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            className={cn(
                                                "px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300",
                                                isSelected
                                                    ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                                                    : 'border-[var(--border-subtle)] hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)]'
                                            )}
                                        >
                                            {tag}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 3. AI Sentiment Analysis */}
                        <div className="bg-[var(--bg-elevated)] rounded-xl p-4 border border-[var(--border-subtle)]">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-[var(--text-muted)] uppercase">AI Interpretation</span>
                                {rating > 0 ? (
                                    <Badge variant={rating >= 4 ? 'success' : rating >= 3 ? 'warning' : 'error'} className="text-[10px]">
                                        {rating >= 4 ? 'Positive' : rating >= 3 ? 'Neutral' : 'Critical'}
                                    </Badge>
                                ) : (
                                    <span className="text-[10px] text-[var(--text-muted)] italic">Waiting for input...</span>
                                )}
                            </div>
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
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
                    <div className="p-6 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30">
                        <Button
                            variant="primary"
                            className="w-full justify-center"
                            onClick={() => {
                                setFeedbackActive(false);
                                setRating(0);
                                setSelectedTags([]);
                            }}
                            disabled={rating === 0}
                            icon={Send}
                        >
                            Submit Feedback
                        </Button>
                        <div className="mt-4 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
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
                    <motion.div animate={{ scale: [1, 1.8], opacity: [0.5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 rounded-full border border-[var(--color-primary)]" />
                    <motion.div animate={{ scale: [1, 2.2], opacity: [0.3, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.3 }} className="absolute inset-0 rounded-full border border-[var(--color-primary)]" />
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
                className={cn(
                    "relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-700 z-10",
                    isListening ? 'bg-gradient-to-br from-[var(--color-primary)] to-indigo-600 shadow-[0_0_60px_rgba(var(--color-brand-primary-rgb),0.6)] scale-110' :
                        isProcessing ? 'bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_0_50px_rgba(37,99,235,0.5)] rotate-180' :
                            isSpeaking ? 'bg-gradient-to-br from-teal-500 to-emerald-500 shadow-[0_0_50px_rgba(20,184,166,0.5)]' :
                                'bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-card)] border border-[var(--border-medium)] shadow-[var(--shadow-lg)] group-hover:shadow-[0_0_40px_rgba(var(--color-brand-primary-rgb),0.25)] group-hover:border-[var(--color-primary)]/50'
                )}
                animate={isListening ? { scale: [1, 1.05, 1] } : isProcessing ? { rotate: 360 } : isSpeaking ? { scale: [1, 1.02, 1] } : {}}
                transition={isListening ? { repeat: Infinity, duration: 1.5 } : { repeat: Infinity, duration: 1, ease: "linear" }}
            >
                {/* Inner Detail */}
                <div className="absolute inset-1 rounded-full border border-white/20 opacity-40"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent opacity-30"></div>

                {isActive ? <Square className="fill-[var(--text-primary)] text-[var(--text-primary)] relative z-20" size={28} /> : <Mic size={36} className="text-[var(--text-primary)] translate-y-[1px] relative z-20" />}
            </motion.div>
        </div>
    );
};
