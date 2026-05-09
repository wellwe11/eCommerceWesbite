import { useEffect } from "react";

function useKeyboard(keymap, isActive) {
  useEffect(() => {
    if (!isActive) return;

    const handler = (e) => keymap[e.key]?.();
    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [isActive, keymap]);
}

export default useKeyboard;
