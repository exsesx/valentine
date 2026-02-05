import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { EvadeButton } from "./EvadeButton";
import { Celebration } from "./Celebration";
import { FloatingPetals } from "./FloatingPetals";

type GameState = "question" | "celebration";

export function ValentineCard() {
  const [state, setState] = useState<GameState>("question");

  const handleYes = useCallback(() => {
    setState("celebration");
  }, []);

  const handleYesTouch = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setState("celebration");
  }, []);

  if (state === "celebration") {
    return <Celebration />;
  }

  return (
    <div
      className="weave-overlay relative flex h-screen w-screen items-center justify-center overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <FloatingPetals count={18} />

      {/* Subtle warm glow */}
      <div
        className="animate-gentle-pulse absolute h-96 w-96 rounded-full"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(139, 115, 85, 0.06), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Card container */}
      <motion.div
        className="relative z-10 flex w-full max-w-xl flex-col items-center px-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top ornamental line */}
        <motion.div
          className="flex w-full items-center gap-4"
          style={{ marginBottom: 32 }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(139, 115, 85, 0.3))" }} />
          <span style={{ color: "#8b7355", fontSize: 14, letterSpacing: "0.2em" }}>⚜</span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(139, 115, 85, 0.3))" }} />
        </motion.div>

        {/* Heart — rendered like a woodcut stamp */}
        <motion.div
          className="animate-float"
          style={{ marginBottom: 48 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 180, damping: 16 }}
        >
          <div className="relative">
            <Heart
              size={64}
              className="animate-heartbeat"
              fill="currentColor"
              strokeWidth={0}
              style={{ color: "#f4f1e8" }}
            />
            <div
              className="absolute inset-0 animate-heartbeat"
              style={{
                background: "radial-gradient(circle, rgba(244, 241, 232, 0.08), transparent 70%)",
                filter: "blur(20px)",
                transform: "scale(3)",
              }}
            />
          </div>
        </motion.div>

        {/* Main question in blackletter */}
        <motion.div
          style={{ marginBottom: 20 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1
            className="font-blackletter leading-tight"
            style={{ fontSize: "clamp(2.8rem, 8vw, 4.5rem)", color: "#f4f1e8" }}
          >
            Olya
          </h1>
        </motion.div>

        <motion.div
          style={{ marginBottom: 40 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
        >
          <p
            className="font-heading tracking-[0.15em] uppercase"
            style={{ fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)", color: "#8b7355" }}
          >
            will you be my Valentine
          </p>
        </motion.div>

        {/* Philosophical subtitle */}
        <motion.p
          className="font-body italic"
          style={{ marginBottom: 56, color: "rgba(244, 241, 232, 0.25)", fontSize: "1.15rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.8 }}
        >
          doubt is not an option here
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col items-center gap-5 sm:flex-row sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.button
            onClick={handleYes}
            onTouchEnd={handleYesTouch}
            className="relative cursor-pointer font-heading tracking-[0.2em] uppercase"
            style={{
              padding: "18px 56px",
              fontSize: "1.15rem",
              color: "#0a0a0a",
              background: "#f4f1e8",
              border: "none",
              letterSpacing: "0.2em",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
            whileHover={{
              scale: 1.06,
              boxShadow: "0 4px 30px rgba(244, 241, 232, 0.15)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Yes
          </motion.button>

          <EvadeButton />
        </motion.div>

        {/* Bottom ornamental line */}
        <motion.div
          className="flex w-full items-center gap-4"
          style={{ marginTop: 56 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(139, 115, 85, 0.2))" }} />
          <span
            className="font-heading tracking-[0.3em] uppercase"
            style={{ fontSize: 9, color: "rgba(139, 115, 85, 0.3)" }}
          >
            eternally bound
          </span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(139, 115, 85, 0.2))" }} />
        </motion.div>
      </motion.div>
    </div>
  );
}
