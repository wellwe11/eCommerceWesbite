import { useNavigate } from "react-router-dom";
import heroImage from "../../resources/imageThree.avif";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SideText = () => {
  return (
    <div className="relative -bottom-15 p-10 z-10 self-center col-start-1 row-start-1 justify-self-end [writing-mode:vertical-rl] flex items-center gap-5">
      <p className="text-xs">Small uninformative text, minor details</p>
      <h4 className="text-5xl">Big title text</h4>
    </div>
  );
};

const HeroText = () => {
  return (
    <div className="relative self-end p-10 z-10 col-start-1 row-start-1 justify-self-start">
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

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 1], [0, 1, 1, 0]);
  const containerY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 1],
    [50, 0, 0, 50],
  );

  return (
    <div className="w-full h-screen z-30 sticky grid place-items-center overflow-hidden grid-cols-1 grid-rows-1">
      <motion.div
        ref={containerRef}
        className="fixed w-full h-full grid grid-cols-1"
        style={{ opacity, y: containerY }}
      >
        <SideText />
        <HeroText />
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
