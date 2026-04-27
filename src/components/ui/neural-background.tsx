'use client';

import { motion } from 'framer-motion';

export function NeuralBackground() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-white">
            {/* Primary ambient node – sky blue */}
            <motion.div
                className="absolute -top-[15%] -left-[5%] w-[55%] h-[55%] rounded-full bg-neural-gradient"
                style={{ background: 'radial-gradient(circle, rgba(0,86,210,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }}
                animate={{ x: [0, 40, -20, 0], y: [0, 30, 50, 0], scale: [1, 1.08, 0.94, 1] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Secondary node – lighter cyan tint */}
            <motion.div
                className="absolute top-[10%] -right-[8%] w-[45%] h-[45%] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 70%)', filter: 'blur(90px)' }}
                animate={{ x: [0, -30, 18, 0], y: [0, 40, -15, 0], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Bottom ambient – very subtle */}
            <motion.div
                className="absolute -bottom-[15%] left-[20%] w-[60%] h-[40%] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(0,86,210,0.03) 0%, transparent 70%)', filter: 'blur(100px)' }}
                animate={{ rotate: [0, 180, 360], scale: [1, 1.15, 1] }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}
