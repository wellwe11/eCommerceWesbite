import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

import CustomCursor from "@/components/ui/customCursor/customCursor";
import LinkWrapper from "@/components/ui/Link/link";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  handleActiveArtAtom,
  handleCountAtom,
  handleHeroDataAtom,
} from "@/atoms/home/heroImages";
import handleCustomCursor from "@/atoms/customCursor/customCursor";

const DirectionContainers = ({ handler }) => {
  return (
    <div className=" h-screen w-screen fixed flex">
      <div className="w-full h-full flex-1" onClick={() => handler(+1)} />
      <div className="w-full h-full flex-1" onClick={() => handler(-1)} />
    </div>
  );
};

const EditorialData = () => {
  const [activeIndex, setActiveIndex] = useAtom(handleCountAtom);
  const handleCursor = useSetAtom(handleCustomCursor);
  const arr = useAtomValue(handleHeroDataAtom);

  return (
    <div
      className="absolute inset-x-0 flex justify-between items-center pointer-events-none px-8"
      style={{
        top: "10%",
        height: "100%",
        transition: "top 0.4s ease",
      }}
    >
      {arr.map((obj, index) => {
        const { artName, artistName } = obj;
        return (
          <p
            key={index}
            className="flex items-center justify-center tracking-tighter text-[10px] uppercase gap-2 pointer-events-none  text-white"
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => handleCursor(false)}
            onMouseLeave={() => handleCursor(true)}
          >
            <span
              className={`block min-w-30 text-right text-nowrap pointer-events-none font-extralight mix-blend-difference  ${
                index === activeIndex ? "visible" : "invisible"
              }`}
            >
              {artName}
            </span>

            <span className="shrink-0 font-light pointer-events-auto mix-blend-difference cursor-pointer">
              0{index + 1}
            </span>

            <span
              className={`block min-w-30 text-left text-nowrap pointer-events-none italic font-extralight mix-blend-difference  ${
                index === activeIndex ? "visible" : "invisible"
              }`}
            >
              {artistName}
            </span>
          </p>
        );
      })}
    </div>
  );
};

const BackgroundImage = () => {
  const bigImageRef = useRef(null);
  const smallImageRef = useRef(null);
  const [isHover, setIsHover] = useState(false);

  const activeIndex = useAtomValue(handleCountAtom);
  const arr = useAtomValue(handleHeroDataAtom);
  const activeProduct = useAtomValue(handleActiveArtAtom);
  const handleCursor = useSetAtom(handleCustomCursor);

  const activeArtObj = useAtomValue(handleActiveArtAtom);
  const src = activeArtObj.src;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 100, stiffness: 200, mass: 1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!smallImageRef.current) return;

    const {
      left: sILeft,
      top: sITop,
      width: sIWidth,
      height: sIHeight,
    } = smallImageRef.current.getBoundingClientRect();

    const mouseX = (e.clientX - sILeft) / sIWidth;
    const mouseY = (e.clientY - sITop) / sIHeight;

    const scale = 1.34;
    const vpW = window.innerWidth;
    const vpH = window.innerHeight;

    const overflowX = (vpW * scale - vpW) / 2;
    const overflowY = (vpH * scale - vpH) / 2;

    const rawX = -(mouseX - 0.5) * overflowX * 2;
    const rawY = -(mouseY - 0.5) * overflowY * 2;

    x.set(Math.max(-overflowX, Math.min(overflowX, rawX)));
    y.set(Math.max(-overflowY, Math.min(overflowY, rawY)));
  };

  return (
    <div className="relative">
      <motion.img
        ref={bigImageRef}
        className="fixed inset-0 h-full w-full object-cover scale-150 origin-center pointer-events-none"
        src={src || null}
        alt=""
        style={{
          x: smoothX,
          y: smoothY,
          opacity: isHover ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      <div
        ref={smallImageRef}
        className="relative w-110 h-150"
        onMouseEnter={() => {
          setIsHover(true);
          handleCursor(false);
        }}
        onMouseLeave={() => {
          setTimeout(() => {
            setIsHover(false);
          }, 200);

          handleCursor(true);
        }}
        onMouseMove={handleMouseMove}
      >
        {arr.map(({ src, id }, index) => (
          <div
            key={index}
            className="absolute inset-0 hover:cursor-pointer w-full h-full"
            style={{
              opacity: index === activeIndex ? 1 : 0,
              pointerEvents: index === activeIndex ? "auto" : "none",
              transition: "opacity 0.2s ease-in-out",
            }}
          >
            <LinkWrapper to={`/product/${id}`} product={activeProduct}>
              <img
                src={src}
                alt=""
                className="object-scale-down hover:grayscale w-full h-full"
              />
            </LinkWrapper>
          </div>
        ))}
      </div>
    </div>
  );
};

const HeroImages = () => {
  const data = useAtomValue(handleHeroDataAtom);

  const setActiveIndex = useSetAtom(handleCountAtom);
  const handleCursor = useSetAtom(handleCustomCursor);

  if (!data) return;

  const handleIndex = (e) => {
    if (e > 0) {
      setActiveIndex("dec");
    } else {
      setActiveIndex("inc");
    }
  };

  return (
    <div
      className="h-full w-full fixed cursor-none inset-0"
      onMouseEnter={() => handleCursor(true)}
      onMouseLeave={() => handleCursor(false)}
    >
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
        <DirectionContainers handler={handleIndex} />
        <BackgroundImage />

        <EditorialData />
      </div>

      <CustomCursor />
    </div>
  );
};

export default HeroImages;
