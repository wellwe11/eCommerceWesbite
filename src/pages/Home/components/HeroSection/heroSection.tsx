import { useNavigate } from "react-router-dom";
import heroImage from "../../resources/imageThree.avif";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroImages from "./heroImages";

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
    <div className="p-10 z-100000 justify-self-start w-80">
      <p
        className="text-[12px] leading-5"
        style={{ fontVariationSettings: "'wght' 150" }}
      >
        Code is a silent medium. Data is a living ink. I create high-fidelity
        experiences that breathe, react, and resonate—transforming the static
        web into a moving canvas.
        <br />
        <br />
        <span className="italic">
          For editorial and commercial inquries please contact
          <button className="cursor-pointer hover:font-medium ml-1 pointer-events-auto">
            robin1ryan@hotmail.com.
          </button>
        </span>
      </p>
    </div>
  );
};

const TextsWrapper = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/gallery");
  };

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
    [0, 0.2, 0.5, 1],
    [40, 0, 0, 40],
  );

  return (
    <div className="w-full h-screen z-30 absolute top-0 grid place-items-center overflow-hidden grid-cols-1 grid-rows-1 will-change-transform pointer-events-none">
      <motion.div
        ref={containerRef}
        className="z-10 absolute w-full h-full grid grid-cols-1 will-change-auto"
        style={{ opacity }}
      >
        <motion.div
          style={{ y: containerYOne }}
          className="z-10 relative self-center justify-self-end col-start-1 row-start-1"
        >
          <SideText />
        </motion.div>
        <motion.div
          style={{ y: containerYTwo }}
          className="z-10 relative self-end col-start-1 row-start-1"
        >
          <HeroText />
        </motion.div>
      </motion.div>

      {/* <button
        onClick={handleNavigate}
        className="col-start-1 row-start-1 z-10 bg-gray-300 w-35 h-15 cursor-pointer m-auto"
      >
        Explore
      </button> */}
    </div>
  );
};

const HeroSection = () => {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <div className="relative w-full h-screen z-10">
      {/* <img
        className="fixed inset-0 h-full w-full object-cover"
        src={activeImage || ""}
        alt=""
      /> */}

      <HeroImages setter={setActiveImage} />
      <TextsWrapper />
    </div>
  );
};

export default HeroSection;
