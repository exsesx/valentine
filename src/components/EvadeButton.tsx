import { useState, useCallback } from "react";
import { useIsTouchDevice } from "../hooks/useIsTouchDevice";
import { EvadeButtonDesktop } from "./EvadeButtonDesktop";

const MOBILE_PHRASES = [
  "No",
  "You dare?",
  "Reconsider",
  "Futile",
  "So be it...",
];

interface EvadeButtonProps {
  onGiveUp?: () => void;
}

export function EvadeButton({ onGiveUp }: EvadeButtonProps) {
  const isTouch = useIsTouchDevice();
  const [tapCount, setTapCount] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  const handleMobileTap = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const nextTap = tapCount + 1;
    setTapCount(nextTap);

    if (nextTap >= MOBILE_PHRASES.length) {
      setIsHidden(true);
      onGiveUp?.();
    }
  }, [tapCount, onGiveUp]);

  const buttonStyle = {
    padding: "18px 56px",
    border: "1px solid rgba(244, 241, 232, 0.15)",
    background: "transparent",
    color: "rgba(244, 241, 232, 0.4)",
    fontSize: "1.15rem",
    letterSpacing: "0.2em",
  };

  if (isTouch) {
    const mobileLabel = MOBILE_PHRASES[Math.min(tapCount, MOBILE_PHRASES.length - 1)];

    return (
      <button
        onTouchEnd={!isHidden ? handleMobileTap : undefined}
        className="font-heading tracking-[0.2em] uppercase"
        style={{
          ...buttonStyle,
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
          opacity: isHidden ? 0 : tapCount >= MOBILE_PHRASES.length - 1 ? 0.3 : 0.7,
          pointerEvents: isHidden ? "none" : "auto",
        }}
      >
        {mobileLabel}
      </button>
    );
  }

  return <EvadeButtonDesktop buttonStyle={buttonStyle} />;
}
