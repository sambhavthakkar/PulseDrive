import React, { useState, useEffect, useRef, useCallback } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Mic, Square, Check, X, Clock, Zap, Star, Send, AlertCircle, Keyboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { processVoiceCommand, submitFeedback } from '../services/backendApi';

// Custom hook for Web Speech API
function useSpeechRecognition() {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState(null);
    const [isSupported, setIsSupported] = useState(true);
    const recognitionRef = useRef(null);

    useEffect(() => {
        // Check for browser support
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setIsSupported(false);
            setError('Speech recognition not supported in this browser. Please use Chrome or Edge.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            setError(null);
        };

        recognition.onresult = (event) => {
            let finalTranscript = '';
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }

            setTranscript(finalTranscript || interimTranscript);
        };

        recognition.onerror = (event) => {
            setIsListening(false);
            if (event.error === 'not-allowed') {
                setError('Microphone access denied. Please allow microphone permissions.');
            } else if (event.error === 'no-speech') {
                setError('No speech detected. Please try again.');
            } else if (event.error === 'network') {
                setError('Network error. Please check your internet connection and try again.');
            } else if (event.error === 'aborted') {
                // User cancelled or recognition was stopped - not a real error
                setError(null);
            } else {
                setError(`Speech recognition error: ${event.error}`);
            }
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, []);

    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            setTranscript('');
            setError(null);
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.error('Speech recognition start error:', e);
            }
        }
    }, [isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
        }
    }, [isListening]);

    return {
        transcript,
        isListening,
        error,
        isSupported,
        startListening,
        stopListening
    };
}

// Local AI response generator (works without backend)
function generateLocalResponse(text) {
    const lowerText = text.toLowerCase();

    // Feedback/Service related responses
    if (lowerText.includes('good') || lowerText.includes('great') || lowerText.includes('excellent') || lowerText.includes('amazing')) {
        return "That's wonderful to hear! Thank you for your positive feedback. We're glad you had a great experience. Would you like to rate the service on a scale of 1-5 stars?";
    }

    if (lowerText.includes('bad') || lowerText.includes('poor') || lowerText.includes('terrible') || lowerText.includes('awful')) {
        return "I'm sorry to hear that. We value your feedback and want to improve. Could you tell me more about what went wrong so we can address it?";
    }

    if (lowerText.includes('okay') || lowerText.includes('fine') || lowerText.includes('average')) {
        return "Thank you for sharing. We'd love to make your next experience even better. Is there anything specific we could improve?";
    }

    // Schedule/Service related
    if (lowerText.includes('schedule') || lowerText.includes('book') || lowerText.includes('appointment')) {
        return "I can help you schedule a service appointment. We have slots available tomorrow at 10 AM and 2 PM. Would you like me to book one for you?";
    }

    if (lowerText.includes('service') || lowerText.includes('maintenance')) {
        return "Based on your vehicle data, I recommend scheduling a routine maintenance check. Your next service is due in about 2 weeks. Would you like me to find available slots?";
    }

    // Vehicle status
    if (lowerText.includes('status') || lowerText.includes('health') || lowerText.includes('diagnostic')) {
        return "Your vehicle health is at 94%. All major systems are operational. Tire pressure is slightly low on the front left - I recommend checking it soon. Would you like a detailed report?";
    }

    if (lowerText.includes('tire') || lowerText.includes('tyre')) {
        return "Your tire pressure readings: Front Left: 30 PSI (slightly low), Front Right: 32 PSI, Rear Left: 32 PSI, Rear Right: 32 PSI. I recommend inflating the front left tire to 32 PSI.";
    }

    if (lowerText.includes('oil') || lowerText.includes('engine')) {
        return "Oil level: 92% - Good condition. Engine temperature: Normal. Oil change recommended in approximately 2,500 miles. Would you like to schedule an oil change?";
    }

    if (lowerText.includes('brake')) {
        return "Brake pad wear: Front 65%, Rear 78%. Brake fluid level: Good. Estimated remaining life: 8,000 miles. No immediate action required.";
    }

    // Greetings
    if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
        return "Hello! I'm your Pulse Drive assistant. How can I help you today? You can ask about your vehicle status, schedule a service, or share feedback about your recent experience.";
    }

    if (lowerText.includes('thank')) {
        return "You're welcome! Is there anything else I can help you with today?";
    }

    // Help
    if (lowerText.includes('help') || lowerText.includes('what can you do')) {
        return "I can help you with: 1) Vehicle diagnostics and health status, 2) Scheduling service appointments, 3) Collecting feedback about your service experience, 4) Providing maintenance recommendations. What would you like to know?";
    }

    // Default response
    return "Thank you for your input! I'm here to help with vehicle diagnostics, scheduling service, or collecting your feedback. Could you tell me more about what you'd like assistance with?";
}

export default function VoiceAgent() {
    // States: 'idle', 'listening', 'processing', 'suggestion'
    const [viewState, setViewState] = useState('idle');
    const [history, setHistory] = useState([
        { role: 'ai', text: "Hey! How was the service? Please tell me about your experience today.", timestamp: 'Just now' }
    ]);
    const [feedbackActive, setFeedbackActive] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [voiceError, setVoiceError] = useState(null);
    const [textInput, setTextInput] = useState('');
    const [showTextInput, setShowTextInput] = useState(false);

    // Feedback States
    const [rating, setRating] = useState(0);
    const [selectedTags, setSelectedTags] = useState([]);
    const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
    const [feedbackSuccess, setFeedbackSuccess] = useState(false);

    // Speech Recognition Hook
    const {
        transcript,
        isListening,
        error: speechError,
        isSupported,
        startListening,
        stopListening
    } = useSpeechRecognition();

    const toggleTag = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    // Handle voice input and send to backend
    const handleVoiceInput = useCallback(async (text) => {
        if (!text.trim()) return;

        // Add user message to history
        setHistory(prev => [
            ...prev,
            { role: 'user', text: text, timestamp: 'Just now' }
        ]);

        setViewState('processing');
        setIsProcessing(true);
        setVoiceError(null);

        try {
            // Call backend API
            const response = await processVoiceCommand(text);

            // Add AI response to history
            setHistory(prev => [
                ...prev,
                { role: 'ai', text: response.response_text, timestamp: 'Just now' }
            ]);

            // Play audio response if available (ElevenLabs TTS)
            if (response.response_audio) {
                try {
                    const audio = new Audio(`data:audio/mpeg;base64,${response.response_audio}`);
                    audio.play().catch(e => console.log('Audio autoplay blocked:', e));
                } catch (audioError) {
                    console.log('Audio playback error:', audioError);
                }
            }

            setViewState('suggestion');
        } catch (error) {
            console.error('Voice command error:', error);

            // Generate smart local response when backend is unavailable
            const localResponse = generateLocalResponse(text);

            setHistory(prev => [
                ...prev,
                { role: 'ai', text: localResponse, timestamp: 'Just now' }
            ]);
            setViewState('suggestion');
        } finally {
            setIsProcessing(false);
        }
    }, []);

    // Handle speech recognition transcript changes
    useEffect(() => {
        if (isListening) {
            setViewState('listening');
        }
    }, [isListening]);

    // Process final transcript when speech ends
    useEffect(() => {
        if (!isListening && transcript && viewState === 'listening') {
            handleVoiceInput(transcript);
        }
    }, [isListening, transcript, viewState, handleVoiceInput]);

    // Start voice interaction
    const handleStartListening = () => {
        if (!isSupported) {
            setVoiceError('Speech recognition not supported. Please use Chrome or Edge.');
            return;
        }

        if (isListening) {
            stopListening();
        } else {
            setVoiceError(null);
            startListening();
        }
    };

    const handleAction = (type) => {
        setViewState('idle');
        // Activate feedback panel after an interaction
        setFeedbackActive(true);
    };

    // Submit feedback to backend
    const handleSubmitFeedback = async () => {
        if (rating === 0) return;

        setFeedbackSubmitting(true);

        try {
            // Map tags to backend format
            const tagMapping = {
                'Service Quality': 'quality',
                'Wait Time': 'wait_time',
                'Cost Transparency': 'cost',
                'Staff Behavior': 'friendly_staff',
                'App Experience': 'value'
            };

            const mappedTags = selectedTags.map(tag => tagMapping[tag] || tag.toLowerCase().replace(/\s+/g, '_'));

            await submitFeedback({
                vehicle_id: 'VEH-001',
                user_id: 'USER-001',
                rating: rating,
                tags: mappedTags,
                comment: null,
                service_id: null
            });

            setFeedbackSuccess(true);

            // Reset after success
            setTimeout(() => {
                setFeedbackActive(false);
                setRating(0);
                setSelectedTags([]);
                setFeedbackSuccess(false);
            }, 2000);

        } catch (error) {
            console.error('Feedback submission error:', error);
            setVoiceError('Failed to submit feedback. Please try again.');
        } finally {
            setFeedbackSubmitting(false);
        }
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

                    {/* Error Message */}
                    {(voiceError || speechError) && (
                        <div className="relative z-10 mx-6 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
                            <AlertCircle className="text-red-400" size={18} />
                            <span className="text-sm text-red-400">{voiceError || speechError}</span>
                        </div>
                    )}

                    {/* Center: ORB & TRANSCRIPT */}
                    <div className="flex-1 flex flex-col items-center justify-center relative z-10 min-h-[300px]">

                        {/* THE ORB */}
                        <div className="mb-8">
                            <Orb
                                state={viewState}
                                isListening={isListening}
                                onToggle={handleStartListening}
                            />
                        </div>

                        {/* Live Transcript Display */}
                        {isListening && transcript && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 px-6 py-3 bg-[var(--bg-elevated)] border border-[var(--color-primary)]/30 rounded-2xl max-w-md text-center"
                            >
                                <span className="text-sm text-[var(--text-secondary)] italic">"{transcript}"</span>
                            </motion.div>
                        )}

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
                            {/* Text Input Fallback */}
                            {showTextInput ? (
                                <div className="w-full max-w-md flex gap-2">
                                    <input
                                        type="text"
                                        value={textInput}
                                        onChange={(e) => setTextInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && textInput.trim()) {
                                                handleVoiceInput(textInput.trim());
                                                setTextInput('');
                                            }
                                        }}
                                        placeholder="Type your command here..."
                                        className="flex-1 px-4 py-2 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--color-primary)]"
                                        disabled={isProcessing}
                                    />
                                    <Button
                                        variant="primary"
                                        icon={Send}
                                        onClick={() => {
                                            if (textInput.trim()) {
                                                handleVoiceInput(textInput.trim());
                                                setTextInput('');
                                            }
                                        }}
                                        disabled={!textInput.trim() || isProcessing}
                                    >
                                        Send
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex gap-4">
                                    <Button variant="success" icon={Check} onClick={() => handleAction('confirm')}>Confirm</Button>
                                    <Button variant="danger" icon={X} onClick={() => handleAction('decline')}>Decline</Button>
                                    <Button variant="ghost" icon={Clock} onClick={() => handleAction('later')}>Later</Button>
                                </div>
                            )}

                            {/* Toggle Text Input */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowTextInput(!showTextInput)}
                                    className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors"
                                >
                                    <Keyboard size={14} />
                                    {showTextInput ? 'Use Voice Instead' : 'Type Instead'}
                                </button>
                            </div>

                            <p className="text-xs text-center text-[var(--text-muted)] font-medium">
                                {showTextInput
                                    ? "Type your command and press Enter or click Send."
                                    : !isSupported
                                        ? "Voice not supported. Click 'Type Instead' below."
                                        : "Click the microphone to speak. Scheduling Agent will propose time slots if you confirm."
                                }
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

                        {/* Success Message */}
                        {feedbackSuccess && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-center"
                            >
                                <Check className="mx-auto text-green-400 mb-2" size={24} />
                                <span className="text-sm text-green-400 font-medium">Feedback submitted successfully!</span>
                            </motion.div>
                        )}

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
                            onClick={handleSubmitFeedback}
                            disabled={rating === 0 || feedbackSubmitting}
                            icon={feedbackSubmitting ? null : Send}
                        >
                            {feedbackSubmitting ? 'Submitting...' : 'Submit Feedback'}
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

const Orb = ({ state, isListening, onToggle }) => {
    const isActive = state !== 'idle';
    const isListeningState = state === 'listening' || isListening;
    const isProcessing = state === 'processing';
    const isSpeaking = state === 'suggestion';

    return (
        <div className="relative w-48 h-48 flex items-center justify-center cursor-pointer group" onClick={onToggle}>
            {/* Listening Ripples */}
            {isListeningState && (
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
                    isListeningState ? 'bg-gradient-to-br from-[var(--color-primary)] to-indigo-600 shadow-[0_0_60px_rgba(var(--color-brand-primary-rgb),0.6)] scale-110' :
                        isProcessing ? 'bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_0_50px_rgba(37,99,235,0.5)] rotate-180' :
                            isSpeaking ? 'bg-gradient-to-br from-teal-500 to-emerald-500 shadow-[0_0_50px_rgba(20,184,166,0.5)]' :
                                'bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-card)] border border-[var(--border-medium)] shadow-[var(--shadow-lg)] group-hover:shadow-[0_0_40px_rgba(var(--color-brand-primary-rgb),0.25)] group-hover:border-[var(--color-primary)]/50'
                )}
                animate={isListeningState ? { scale: [1, 1.05, 1] } : isProcessing ? { rotate: 360 } : isSpeaking ? { scale: [1, 1.02, 1] } : {}}
                transition={isListeningState ? { repeat: Infinity, duration: 1.5 } : { repeat: Infinity, duration: 1, ease: "linear" }}
            >
                {/* Inner Detail */}
                <div className="absolute inset-1 rounded-full border border-white/20 opacity-40"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent opacity-30"></div>

                {isActive ? <Square className="fill-[var(--text-primary)] text-[var(--text-primary)] relative z-20" size={28} /> : <Mic size={36} className="text-[var(--text-primary)] translate-y-[1px] relative z-20" />}
            </motion.div>
        </div>
    );
};
