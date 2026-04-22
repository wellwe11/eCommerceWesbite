import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroImages from "./heroImages";

const SideText = ({ opacity, y }) => {
  return (
    <motion.div
      style={{ y }}
      className="p-5 [writing-mode:vertical-rl] flex items-center gap-5"
      style={{ fontVariationSettings: "'wght' 100" }}
    >
      <motion.p
        style={{ opacity }}
        className="text-xs mix-blend-difference text-white"
      >
        Small uninformative text, minor details
      </motion.p>

      <motion.h4
        style={{ opacity }}
        className="text-5xl mix-blend-difference text-white"
      >
        Big title text
      </motion.h4>
    </motion.div>
  );
};

const HeroText = ({ y }) => {
  return (
    <motion.div className="p-10 justify-self-start w-80">
      <motion.p
        style={{ y }}
        className="text-[12px] leading-5 mix-blend-difference text-white"
        style={{ fontVariationSettings: "'wght' 150" }}
      >
        Code is a silent medium. Data is a living ink. I create high-fidelity
        experiences that breathe, react, and transforming the static web into a
        moving canvas.
        <br />
        <br />
        <span className="italic">
          For editorial and commercial inquries please contact
          <button className="cursor-pointer ml-1 pointer-events-auto hover:underline decoration-gray-400">
            robin1ryan@hotmail.com
          </button>
        </span>
      </motion.p>
    </motion.div>
  );
};

const TextsWrapper = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // SideText & HeroText
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.75, 1],
    [0, 1, 1, 0],
  );

  // SideText
  const containerYOne = useTransform(
    scrollYProgress,
    [0, 0.3, 0.4, 1],
    [180, 0, 0, 180],
  );

  // HeroText
  const containerYTwo = useTransform(
    scrollYProgress,
    [0, 1, 0.5, 1],
    [40, 0, 0, 40],
  );

  return (
    <div className="w-full h-screen absolute top-0 grid place-items-center overflow-hidden grid-cols-1 grid-rows-1 pointer-events-none">
      <div
        ref={containerRef}
        className="absolute w-full h-full grid grid-cols-1 "
      >
        <div className="relative self-center justify-self-end col-start-1 row-start-1">
          <SideText y={containerYOne} opacity={opacity} />
        </div>
        <div className=" relative self-end col-start-1 row-start-1">
          <HeroText y={containerYTwo} />
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen z-10">
      <HeroImages />
      <TextsWrapper />
    </div>
  );
};

export default HeroSection;
