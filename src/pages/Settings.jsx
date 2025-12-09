import React, { useState } from 'react';
import Card from '../components/common/Card';
import { motion } from 'framer-motion';
import { Moon, Sun, Volume2, Globe, Bell, Shield, Database } from 'lucide-react';

import { useTheme } from '../context/ThemeContext';

export default function Settings() {
    const { theme, setTheme } = useTheme();
    const [notifications, setNotifications] = useState(true);
    const [language, setLanguage] = useState('en');
    const [voiceSpeed, setVoiceSpeed] = useState(1.0);

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">System Settings</h2>

            <Card title="Appearance & Interface">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-lg">
                                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                            </div>
                            <div>
                                <div className="text-[var(--text-primary)] font-medium">Theme Mode</div>
                                <div className="text-sm text-[var(--text-secondary)]">Adjust system appearance</div>
                            </div>
                        </div>
                        <div className="bg-[var(--bg-glass)] backdrop-blur p-1 rounded-full flex gap-1 border border-[var(--border-color)]">
                            <button
                                onClick={() => setTheme('light')}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${theme === 'light' ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-md' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                            >
                                <Sun size={14} />
                                Light
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${theme === 'dark' ? 'bg-[var(--color-purple)] text-[var(--text-inverted)] shadow-md shadow-[var(--color-purple)]/20' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                            >
                                <Moon size={14} />
                                Dark
                            </button>
                        </div>
                    </div>
                </div>
            </Card>

            <Card title="Voice Agent Configuration">
                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                                <Globe size={20} />
                            </div>
                            <div>
                                <div className="text-[var(--text-primary)] font-medium">Language</div>
                                <div className="text-sm text-[var(--text-secondary)]">Primary interaction language</div>
                            </div>
                        </div>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg px-4 py-2 text-[var(--text-primary)] outline-none focus:border-[var(--color-purple)]"
                        >
                            <option value="en">English (US)</option>
                            <option value="es">Spanish</option>
                            <option value="hi">Hindi</option>
                            <option value="fr">French</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
                                <Volume2 size={20} />
                            </div>
                            <div>
                                <div className="text-[var(--text-primary)] font-medium">Voice Speed</div>
                                <div className="text-sm text-[var(--text-secondary)]">Adjust TTS playback rate</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 w-1/3">
                            <span className="text-xs text-[var(--text-secondary)]">0.5x</span>
                            <input
                                type="range"
                                min="0.5"
                                max="2"
                                step="0.1"
                                value={voiceSpeed}
                                onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                                className="w-full accent-[var(--color-primary)] cursor-pointer"
                            />
                            <span className="text-xs text-[var(--color-text-secondary)]">2x</span>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Notifications">
                    <div className="space-y-4">
                        <ToggleItem icon={Bell} label="Service Reminders" defaultChecked={true} color="orange" />
                        <ToggleItem icon={AlertTriangle} label="Critical Alerts" defaultChecked={true} color="red" />
                        <ToggleItem icon={Database} label="Weekly Reports" defaultChecked={false} color="blue" />
                    </div>
                </Card>

                <Card title="Privacy & Security">
                    <div className="space-y-4">
                        <ToggleItem icon={Shield} label="Telemetry Data" defaultChecked={true} color="green" />
                        <ToggleItem icon={UserCheck} label="Biometric Auth" defaultChecked={true} color="purple" />
                    </div>
                </Card>
            </div>
        </div>
    );
}

const ToggleItem = ({ icon: Icon, label, defaultChecked, color }) => {
    const [checked, setChecked] = useState(defaultChecked);

    const colors = {
        orange: 'text-orange-500 bg-orange-500/10',
        red: 'text-red-500 bg-red-500/10',
        blue: 'text-blue-500 bg-blue-500/10',
        green: 'text-green-500 bg-green-500/10',
        purple: 'text-purple-500 bg-purple-500/10',
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${colors[color]}`}>
                    <Icon size={18} />
                </div>
                <span className="text-[var(--text-primary)] font-medium text-sm">{label}</span>
            </div>
            <button
                onClick={() => setChecked(!checked)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 relative ${checked ? 'bg-[var(--color-primary)]' : 'bg-[var(--bg-elevated)] border border-[var(--border-default)]'}`}
            >
                <motion.div
                    className="w-4 h-4 rounded-full bg-white shadow-sm"
                    animate={{ x: checked ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            </button>
        </div>
    );
};

import { AlertTriangle, UserCheck } from 'lucide-react';
