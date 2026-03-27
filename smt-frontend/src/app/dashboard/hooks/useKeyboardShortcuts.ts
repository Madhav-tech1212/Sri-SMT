"use client";
import { useEffect, useRef } from "react";

type ShortcutActions = {
  [key: string]: () => void;
};

export default function useKeyboardShortcuts(actions: ShortcutActions) {
  const actionsRef = useRef(actions);

  useEffect(() => {
    actionsRef.current = actions;
  }, [actions]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tagName = (e.target as HTMLElement).tagName;
      if (tagName === "INPUT" || tagName === "TEXTAREA") return;

      let key = e.key.toUpperCase();
      if (e.key === "Escape") key = "ESC";

      const action = actionsRef.current[key];
      if (action) {
        e.preventDefault();
        action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}