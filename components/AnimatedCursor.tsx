"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Basic detection if hovering an interactive element
            const target = e.target as HTMLElement;
            if (target.closest('button, a, input, select, [role="button"]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    // Return null on touch/mobile devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <>
            {/* Primary glowing dot */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-purple-500 rounded-full pointer-events-none z-[100] mix-blend-screen"
                animate={{
                    x: mousePosition.x - 8,
                    y: mousePosition.y - 8,
                    scale: isHovering ? 2 : 1,
                    opacity: isHovering ? 0.8 : 0.5
                }}
                transition={{
                    type: "tween",
                    ease: "backOut",
                    duration: 0.15
                }}
            />
            {/* Soft trailing aura */}
            <motion.div
                className="fixed top-0 left-0 w-32 h-32 bg-fuchsia-500/20 rounded-full pointer-events-none z-[99] mix-blend-screen blur-xl"
                animate={{
                    x: mousePosition.x - 64,
                    y: mousePosition.y - 64,
                    scale: isHovering ? 1.5 : 1
                }}
                transition={{
                    type: "tween",
                    ease: "backOut",
                    duration: 0.5
                }}
            />
        </>
    );
}
