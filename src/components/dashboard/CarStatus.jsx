import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hotspot = ({ top, left, label, status = 'ok', onClick }) => {
    const colors = {
        ok: 'bg-green-500 shadow-[0_0_15px_#22c55e]',
        warning: 'bg-orange-500 shadow-[0_0_15px_#f97316]',
        critical: 'bg-red-500 shadow-[0_0_15px_#ef4444]',
    };

    return (
        <motion.div
            className={`absolute w-6 h-6 rounded-full cursor-pointer z-20 ${colors[status] || colors.ok}`}
            style={{ top, left }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            onClick={onClick}
        >
            <div className="absolute inset-0 rounded-full animate-ping opacity-75 bg-inherit"></div>
            {status !== 'ok' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                    <span className="text-[8px] font-bold text-black">!</span>
                </div>
            )}
        </motion.div>
    );
};

const Tooltip = ({ top, left, style, content, onClose }) => {
    const statusStyles = {
        ok: {
            border: 'border-green-500/30',
            bg: 'bg-green-950/90',
            shadow: 'shadow-green-500/20',
            text: 'text-green-400'
        },
        warning: {
            border: 'border-orange-500/30',
            bg: 'bg-orange-950/90',
            shadow: 'shadow-orange-500/20',
            text: 'text-orange-400'
        },
        critical: {
            border: 'border-red-500/30',
            bg: 'bg-red-950/90',
            shadow: 'shadow-red-500/20',
            text: 'text-red-400'
        }
    };

    const styleConfig = statusStyles[content.status] || statusStyles.ok;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className={`absolute z-30 backdrop-blur-md border p-4 rounded-xl shadow-2xl w-64 text-left ${styleConfig.bg} ${styleConfig.border} ${styleConfig.shadow}`}
            style={{ top, left, ...style }}
        >
            <div className="flex justify-between items-start mb-2">
                <h4 className={`font-bold text-sm ${styleConfig.text}`}>{content.title}</h4>
                <button onClick={onClose} className="text-gray-400 hover:text-white text-xs">✕</button>
            </div>
            <p className="text-gray-300 text-xs mb-3">{content.desc}</p>
            <div className={`text-xs font-mono font-bold ${styleConfig.text}`}>{content.stats}</div>
        </motion.div>
    );
};

export default function CarStatus() {
    const [activeHotspot, setActiveHotspot] = useState(null);

    const hotspots = [
        { id: 1, top: '38%', left: '46%', status: 'ok', title: 'Engine V8', desc: 'Operating at optimal temperature. No anomalies detected.', stats: 'Temp: 92°C | RPM: 2300' },
        { id: 2, top: '62%', left: '24%', status: 'warning', title: 'Front Brake System', desc: 'Wear level at 86%. Maintenance recommended soon.', stats: 'Life: 14% | Heat: Normal' }, // Moved to front left wheel
        { id: 3, top: '42%', left: '60%', status: 'ok', title: 'Battery Pack', desc: 'Voltage stable. Charging efficiency 98%.', stats: '12.4V | Cycles: 412' },
        { id: 4, top: '68%', left: '74%', status: 'critical', title: 'Front Right Tire', desc: 'Pressure dropping fast. Check for leaks.', stats: '24 PSI (Low)' },
    ];

    return (
        <div className="h-full bg-[var(--bg-card)] rounded-[2rem] p-0 relative overflow-hidden group flex flex-col items-center justify-center perspective-1000">
            {/* Background Grid & Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-purple-dark)_0%,_transparent_70%)] opacity-40"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 transform perspective-3d rotate-x-60"></div>

            <div className="relative w-[500px] h-[300px] transition-transform duration-700 hover:scale-105 hover:rotate-x-12">
                {/* Car Image (Semi-3D Effect) */}
                <img
                    src="https://pngimg.com/d/jeep_PNG48.png"
                    alt="Car"
                    className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10"
                />

                {/* Hotspots Container - overlaying the image */}
                <div className="absolute inset-0 z-20">
                    {hotspots.map((hs) => (
                        <Hotspot
                            key={hs.id}
                            top={hs.top}
                            left={hs.left}
                            status={hs.status}
                            onClick={() => setActiveHotspot(hs.id === activeHotspot ? null : hs.id)}
                        />
                    ))}
                </div>

                {/* Tooltips Layer */}
                <AnimatePresence>
                    {activeHotspot && (
                        (() => {
                            const hs = hotspots.find(h => h.id === activeHotspot);
                            const isRight = parseInt(hs.left) > 50;
                            return hs ? (
                                <Tooltip
                                    key="tooltip"
                                    top={parseInt(hs.top) - 20 + '%'}
                                    left={isRight ? 'auto' : parseInt(hs.left) + 10 + '%'}
                                    style={{ right: isRight ? (100 - parseInt(hs.left)) + 10 + '%' : 'auto' }}
                                    content={hs}
                                    onClose={() => setActiveHotspot(null)}
                                />
                            ) : null;
                        })()
                    )}
                </AnimatePresence>

                {/* Underglow */}
                <div className="absolute -bottom-10 left-10 right-10 h-20 bg-black/40 blur-2xl rounded-full z-0"></div>
            </div>

            <div className="absolute bottom-6 left-8 z-10">
                <h3 className="text-2xl font-bold text-white mb-1">Jeep Wrangler</h3>
                <div className="text-sm text-gray-400">Rubicon 392 • 2024 Edition</div>
            </div>

            <div className="absolute bottom-6 right-8 z-10 flex gap-4">
                <div className="text-right">
                    <div className="text-xs text-gray-500 uppercase">Status</div>
                    <div className="text-green-400 font-bold flex items-center justify-end gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Good
                    </div>
                </div>
            </div>
        </div>
    );
}
