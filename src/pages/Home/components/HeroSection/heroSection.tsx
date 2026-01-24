import { useNavigate } from "react-router-dom";
import heroImage from "../../resources/imageThree.avif";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SideText = () => {
  return (
    <div className="p-10 z-10 [writing-mode:vertical-rl] flex items-center gap-5">
      <p className="text-xs">Small uninformative text, minor details</p>
      <h4 className="text-5xl">Big title text</h4>
    </div>
  );
};

const HeroText = () => {
  return (
    <div className="p-10 z-10 justify-self-start">
      <h1 className="text-[175px] font-light leading-50">
        Art,
        <br /> for you
      </h1>
    </div>
  );
};

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/gallery");
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.6, 0.7],
    [0, 1, 1, 0],
  );

  // SideText
  const containerYOne = useTransform(
    scrollYProgress,
    [0, 0.2, 0.3, 0.7],
    [50, 0, 0, 50],
  );

  // HeroText
  const containerYTwo = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.7],
    [50, 0, 0, 50],
  );

  return (
    <div className="w-full h-screen z-30 sticky grid place-items-center overflow-hidden grid-cols-1 grid-rows-1 will-change-transform">
      <motion.div
        ref={containerRef}
        className="fixed w-full h-full grid grid-cols-1"
        style={{ opacity }}
      >
        <motion.div
          style={{ y: containerYOne }}
          className="relative -bottom-15 self-center justify-self-end col-start-1 row-start-1"
        >
          <SideText />
        </motion.div>
        <motion.div
          style={{ y: containerYTwo }}
          className="relative self-end col-start-1 row-start-1"
        >
          <HeroText />
        </motion.div>
      </motion.div>
      <button
        onClick={handleNavigate}
        className="col-start-1 row-start-1 z-10 bg-gray-300 w-35 h-15 cursor-pointer m-auto"
      >
        Explore
      </button>

      <img
        className="h-full w-full object-center object-cover col-start-1 row-start-1"
        src={heroImage}
        alt=""
      />
    </div>
  );
};

export default HeroSection;
