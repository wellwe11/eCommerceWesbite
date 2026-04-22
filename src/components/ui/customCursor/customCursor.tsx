import React, { Activity, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useAtomValue } from "jotai";

import handleCustomCursor from "@/atoms/customCursor/customCursor";

const CustomCursor = React.memo(() => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mouseDirection, setMouseDirection] = useState(0);
  const displayCursor = useAtomValue(handleCustomCursor);

  useEffect(() => {
    const monitorWidth = window.screen.width;

    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (mouseDirection === 0 && e.clientX < monitorWidth / 2) {
        setMouseDirection(180);
      }

      if (mouseDirection === 180 && e.clientX > monitorWidth / 2) {
        setMouseDirection(0);
      }
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, [mouseX, mouseY, mouseDirection]);

  return (
    <Activity mode={displayCursor ? "visible" : "hidden"}>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-999999"
        style={{ x: mouseX, y: mouseY }}
      >
        <div
          style={{
            transform: `rotate(${mouseDirection}deg)`,
            transition: "transform 0.1s ease",
          }}
          className="flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12H20M20 12L15 7M20 12L15 17"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </div>
      </motion.div>
    </Activity>
  );
});

export default CustomCursor;
