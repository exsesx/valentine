import { useState, useEffect } from "react";

function getIsTouch(): boolean {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
}

export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(getIsTouch);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");

    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches || "ontouchstart" in window);
    mq.addEventListener("change", handler);

    return () => mq.removeEventListener("change", handler);
  }, []);

  return isTouch;
}
