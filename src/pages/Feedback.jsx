import React, { useState } from 'react';
import Card from '../components/common/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Star, User } from 'lucide-react';
import { cn } from '../utils/cn';

const EMOJIS = ['😠', '😕', '😐', '🙂', '😍'];

export default function Feedback() {
    const [rating, setRating] = useState(3);
    const [hoveredRating, setHoveredRating] = useState(null);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setComment('');
            setRating(3);
        }, 3000);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white">Service Feedback</h2>

            {/* Main Feedback Form */}
            <Card className="min-h-[400px] flex items-center justify-center p-8 lg:p-16">
                <AnimatePresence mode="wait">
                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="text-green-400 fill-green-400" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                            <p className="text-[var(--color-text-secondary)]">Your feedback helps improve our autonomic services.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full max-w-lg space-y-8"
                        >
                            <div className="text-center">
                                <div className="text-8xl mb-6 transition-all duration-300 transform scale-100 hover:scale-110 cursor-default">
                                    <motion.div
                                        key={hoveredRating || rating}
                                        initial={{ opacity: 0, y: 10, rotate: -10 }}
                                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        {EMOJIS[(hoveredRating || rating) - 1]}
                                    </motion.div>
                                </div>
                                <div className="flex justify-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(null)}
                                            className="p-2 transition-transform hover:scale-125 focus:outline-none"
                                        >
                                            <Star
                                                size={32}
                                                className={cn(
                                                    "transition-colors duration-200",
                                                    (hoveredRating || rating) >= star
                                                        ? "text-[var(--color-accent-yellow)] fill-[var(--color-accent-yellow)]"
                                                        : "text-[var(--color-text-muted)]"
                                                )}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-2 font-medium text-[var(--color-primary)]">
                                    {['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'][(hoveredRating || rating) - 1]}
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Tell us about your experience..."
                                    className="w-full bg-[var(--color-bg-dark)] border border-white/10 rounded-xl p-4 text-white placeholder-[var(--color-text-muted)] focus:border-[var(--color-primary)] outline-none min-h-[120px] resize-none"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <Send size={18} />
                                    Submit Feedback
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>

            {/* History */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Recent Feedback</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { id: 1, agent: 'Diagnosis Agent', rating: 5, date: '2 days ago', text: 'Spot on prediction about the brakes.' },
                        { id: 2, agent: 'Scheduling Agent', rating: 4, date: '1 week ago', text: 'Good timing, but closest center was busy.' },
                    ].map(item => (
                        <Card key={item.id} className="p-4 flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                <User size={20} className="text-[var(--color-text-secondary)]" />
                            </div>
                            <div>
                                <div className="flex justify-between items-start w-full">
                                    <h4 className="font-bold text-white">{item.agent}</h4>
                                    <div className="flex text-[var(--color-accent-yellow)]">
                                        {[...Array(item.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                                    </div>
                                </div>
                                <div className="text-xs text-[var(--color-text-muted)] mb-2">{item.date}</div>
                                <p className="text-sm text-[var(--color-text-secondary)]">"{item.text}"</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
