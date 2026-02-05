import { memo, useMemo } from "react";

interface Glyph {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  swayDuration: number;
  opacity: number;
  symbol: string;
}

export const FloatingPetals = memo(function FloatingPetals({ count = 12 }: { count?: number }) {
  const glyphs = useMemo<Glyph[]>(() => {
    const symbols = ["✟", "☽", "⚔", "♰", "⛧", "☠", "⚜", "◆", "✧", "†"];

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 14,
      delay: Math.random() * 18,
      duration: 14 + Math.random() * 14,
      swayDuration: 5 + Math.random() * 5,
      opacity: 0.06 + Math.random() * 0.12,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
    }));
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {glyphs.map((g) => (
        <div
          key={g.id}
          className="animate-petal-sway absolute"
          style={{
            left: `${g.left}%`,
            animationDuration: `${g.swayDuration}s`,
            animationDelay: `${g.delay}s`,
          }}
        >
          <div
            className="animate-petal-fall font-heading"
            style={{
              fontSize: `${g.size}px`,
              opacity: g.opacity,
              animationDuration: `${g.duration}s`,
              animationDelay: `${g.delay}s`,
              color: "#f4f1e8",
            }}
          >
            {g.symbol}
          </div>
        </div>
      ))}
    </div>
  );
});
