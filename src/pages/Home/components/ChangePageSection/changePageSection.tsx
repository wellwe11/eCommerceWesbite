import { useEffect, useRef, useState } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";

import useNavigator from "@/hooks/useNavigator/useNavigator";
import fetchGallery from "@/services/api";

const LineDiv = () => {
  const lineRef = useRef(null);
  const [maxScrollProgress, setMaxScrollProgress] = useState(20);
  const queryClient = useQueryClient();
  const handleNavigate = useNavigator("/gallery");

  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["end end", "end center"],
  });

  const height = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["0%", `${maxScrollProgress}%`],
  );

  useEffect(() => {
    const handleWheel = (e) => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight;

      if (isAtBottom && e.deltaY > 0 && maxScrollProgress < 100) {
        setMaxScrollProgress((prev) => prev + 5);
      } else setMaxScrollProgress(20);
    };

    window.addEventListener("wheel", handleWheel);

    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    if (maxScrollProgress < 100) return;

    handleNavigate();
  }, [maxScrollProgress]);

  return (
    <div
      ref={lineRef}
      className="h-[10vh] w-px flex flex-col items-center justify-start"
    >
      <div className="w-px h-full bg-gray-300 overflow-hidden">
        <motion.div
          style={{
            originY: 0,
            height,
          }}
          className="w-full h-full bg-black"
        />
      </div>
    </div>
  );
};

const ChangePageSection = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center py-10 gap-1">
      <h1 className="medium-title">EXPLORE GALLERY</h1>
      <p className="bio-text">SCROLL DOWN</p>

      <LineDiv />
    </section>
  );
};

export default ChangePageSection;
