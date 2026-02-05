import { useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";

const MONO_COLORS = ["#f4f1e8", "#e8e0d5", "#d4c5b2", "#8b7355", "#4a4a4a", "#1a1a1a"];

let confettiRunning = false;

function fireConfetti() {
  if (confettiRunning) return;

  confettiRunning = true;
  const duration = 4000;
  const end = Date.now() + duration;

  const heartShape = confetti.shapeFromPath({
    path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  });

  const frame = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 40,
      origin: { x: 0, y: 0.7 },
      colors: MONO_COLORS,
      shapes: [heartShape, "circle"],
      scalar: 1.1,
      drift: 0.2,
      gravity: 0.6,
    });

    confetti({
      particleCount: 2,
      angle: 120,
      spread: 40,
      origin: { x: 1, y: 0.7 },
      colors: MONO_COLORS,
      shapes: [heartShape, "circle"],
      scalar: 1.1,
      drift: -0.2,
      gravity: 0.6,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    } else {
      confettiRunning = false;
    }
  };

  frame();

  setTimeout(() => {
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { x: 0.5, y: 0.5 },
      colors: MONO_COLORS,
      shapes: [heartShape, "circle"],
      scalar: 1.3,
      gravity: 0.5,
    });
  }, 500);
}

export function Celebration() {
  const hasLaunched = useRef(false);

  useEffect(() => {
    if (!hasLaunched.current) {
      hasLaunched.current = true;
      fireConfetti();
    }
  }, []);

  const motes = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        size: 2 + Math.random() * 3,
      })),
    [],
  );

  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        left: 10 + Math.random() * 80,
        delay: Math.random() * 3,
        size: 14 + Math.random() * 20,
      })),
    [],
  );

  const handleFireMore = useCallback(() => {
    fireConfetti();
  }, []);

  return (
    <motion.div
      className="weave-overlay fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Pure black background with subtle shift */}
      <div
        className="animate-gradient-shift absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #0f0f0f 25%, #0a0a0a 50%, #0d0d0d 75%, #0a0a0a 100%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Floating dust motes */}
      {motes.map((m) => (
        <div
          key={m.id}
          className="animate-sparkle absolute rounded-full"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: m.size,
            height: m.size,
            animationDelay: `${m.delay}s`,
            background: "rgba(244, 241, 232, 0.3)",
          }}
        />
      ))}

      {/* Rising ivory hearts */}
      {floatingHearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute"
          style={{ left: `${h.left}%` }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-20vh", opacity: [0, 0.15, 0.15, 0] }}
          transition={{
            duration: 8 + Math.random() * 5,
            delay: h.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <Heart
            size={h.size}
            style={{ color: "rgba(244, 241, 232, 0.12)" }}
            fill="currentColor"
          />
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-8 text-center">
        {/* Heart glyph */}
        <motion.div
          className="animate-celebration-glow rounded-full p-8"
          style={{
            marginBottom: 56,
            background: "radial-gradient(circle, rgba(139, 115, 85, 0.08), transparent)",
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.2 }}
        >
          <Heart
            size={72}
            className="animate-heartbeat"
            fill="currentColor"
            strokeWidth={0}
            style={{ color: "#f4f1e8" }}
          />
        </motion.div>

        {/* Blackletter title */}
        <motion.h1
          className="font-blackletter"
          style={{ marginBottom: 24, fontSize: "clamp(3rem, 10vw, 5.5rem)", color: "#f4f1e8" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Olya said Yes
        </motion.h1>

        {/* Subtitle in Cinzel caps */}
        <motion.p
          className="font-heading tracking-[0.2em] uppercase"
          style={{ marginBottom: 56, fontSize: "clamp(0.75rem, 2vw, 1rem)", color: "#8b7355" }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          a pact sealed in eternity
        </motion.p>

        {/* Heraldic symbols row */}
        <motion.div
          className="flex items-center gap-6"
          style={{ marginBottom: 56 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: "spring" }}
        >
          {["⚔", "♰", "⚜", "♰", "⚔"].map((symbol, i) => (
            <motion.span
              key={i}
              style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", color: "rgba(244, 241, 232, 0.25)" }}
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 2.5,
                delay: i * 0.25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {symbol}
            </motion.span>
          ))}
        </motion.div>

        {/* More confetti button */}
        <motion.button
          onClick={handleFireMore}
          className="cursor-pointer font-heading tracking-[0.2em] uppercase transition-all"
          style={{
            padding: "18px 56px",
            fontSize: "1.15rem",
            color: "#0a0a0a",
            background: "#f4f1e8",
            border: "none",
          }}
          whileHover={{
            scale: 1.06,
            boxShadow: "0 4px 30px rgba(244, 241, 232, 0.15)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          Once More
        </motion.button>
      </div>
    </motion.div>
  );
}
