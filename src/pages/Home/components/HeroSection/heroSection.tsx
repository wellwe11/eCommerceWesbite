import { useNavigate } from "react-router-dom";
import heroImage from "../../resources/imageThree.avif";
import { useRef } from "react";
import { useInView } from "framer-motion";

const SideText = () => {
  return (
    <div className="relative top-[24.5vw] z-10 col-start-1 row-start-1 justify-self-end self-center [writing-mode:vertical-rl] flex items-center gap-5">
      <p className="text-xs">Small uninformative text, minor details</p>
      <h4 className="text-5xl">Big title text</h4>
    </div>
  );
};

const HeroText = () => {
  return (
    <div className="relative bottom-[-10vw] left-[1vw] z-10 col-start-1 row-start-1 justify-self-start self-end">
      <h1 className="text-9xl font-light">Art,</h1>
      <h1 className="text-9xl font-light">for you</h1>
    </div>
  );
};

const HeroSection = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/gallery");
  };

  const isInView = useInView(containerRef, {
    amount: 0.8,
  });

  const isIntersectingStyle = {
    opacity: isInView ? "1" : "0",
    visibility: isInView ? "visible" : "hidden",
    filter: isInView ? "blur(0px)" : "blur(1px)",
    transform: `translateY(${isInView ? 0 : 20}px)`,
    transition: `opacity 0.2s ease, visibility 0.2s ease, transform ${isInView ? "0.1s" : "0.3s"} ease, transform 0.2s ease`,
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-screen z-30 sticky grid place-items-center overflow-hidden grid-cols-1 grid-rows-1"
    >
      <div className="fixed w-full h-full" style={isIntersectingStyle}>
        <SideText />
        <HeroText />
      </div>
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
