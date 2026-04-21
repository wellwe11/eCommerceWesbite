import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomCursor from "@/components/ui/customCursor/customCursor";
import LinkWrapper from "@/components/ui/Link/link";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  handleActiveArtAtom,
  handleCountAtom,
  handleHeroDataAtom,
} from "@/atoms/home/heroImages";

const IndexedImages = ({ arr, activeIndex }) => {
  return (
    <div className="w-full h-full">
      {arr.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 hover:cursor-pointer w-full h-full"
          style={{
            opacity: index === activeIndex ? 1 : 0,
            pointerEvents: index === activeIndex ? "auto" : "none",
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <LinkWrapper to={""}>
            <img
              src={image}
              alt=""
              className="object-scale-down hover:grayscale w-full h-full"
            />
          </LinkWrapper>
        </div>
      ))}
    </div>
  );
};

const DirectionContainers = ({ handler }) => {
  return (
    <div className=" h-screen w-screen fixed flex">
      <div className="w-full h-full flex-1" onClick={() => handler(+1)} />
      <div className="w-full h-full flex-1" onClick={() => handler(-1)} />
    </div>
  );
};

const NumberText = ({ obj, opacityCondition, numberHover, numberClicker }) => {
  return (
    <p className="flex items-center justify-center tracking-tighter text-[10px] uppercase gap-2 pointer-events-none  text-white">
      <span
        className={`block min-w-30 text-right text-nowrap pointer-events-none font-extralight mix-blend-difference  ${
          opacityCondition ? "visible" : "invisible"
        }`}
      >
        {obj.pre}
      </span>

      <span
        className="shrink-0 font-light pointer-events-auto mix-blend-difference cursor-pointer"
        onMouseEnter={() => numberHover(true)}
        onMouseLeave={() => numberHover(false)}
        onClick={numberClicker}
      >
        {obj.num}
      </span>

      <span
        className={`block min-w-30 text-left text-nowrap pointer-events-none italic font-extralight mix-blend-difference  ${
          opacityCondition ? "visible" : "invisible"
        }`}
      >
        {obj.post}
      </span>
    </p>
  );
};

const BackgroundImage = ({
  src,
  setCurrentHoverImage,
  imageArray,
  activeIndex,
}) => {
  const bigImageRef = useRef(null);
  const smallImageRef = useRef(null);
  const [isHover, setIsHover] = useState(false);

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
          setCurrentHoverImage(true);
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setTimeout(() => {
            setIsHover(false);
          }, 200);
          setCurrentHoverImage(false);
        }}
        onMouseMove={handleMouseMove}
      >
        <IndexedImages arr={imageArray} activeIndex={activeIndex} />
      </div>
    </div>
  );
};

const HeroImages = () => {
  const data = useAtomValue(handleHeroDataAtom);
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useAtom(handleCountAtom);
  const currentImage = useAtomValue(handleActiveArtAtom);

  const [currentHoverImage, setCurrentHoverImage] = useState<boolean | null>(
    false,
  );

  const [customCursorVisible, setCustomerCuorsorVisible] = useState(false);

  if (!data) return;
  const imagesArray = data.map(({ src }) => src);

  const editorialMetadata = data.map(({ artName, artistName }, index) => ({
    pre: artName,
    num: `0${index + 1}`,
    post: `by ${artistName}`,
  }));

  const handleIndex = (e) => {
    if (!currentHoverImage) {
      if (e > 0) {
        setActiveIndex("dec");
      } else {
        setActiveIndex("inc");
      }
    }
  };

  return (
    <div
      className="h-full w-full fixed cursor-none inset-0"
      onMouseEnter={() => setCustomerCuorsorVisible(true)}
      onMouseLeave={() => setCustomerCuorsorVisible(false)}
    >
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
        <DirectionContainers handler={handleIndex} />

        <BackgroundImage
          src={currentImage}
          setCurrentHoverImage={setCurrentHoverImage}
          imageArray={imagesArray}
          activeIndex={activeIndex}
        />

        <div
          className="absolute inset-x-0 flex justify-between items-center pointer-events-none px-8"
          style={{
            top: "10%",
            height: "100%",
            transition: "top 0.4s ease",
          }}
        >
          {editorialMetadata.map((obj, index) => (
            <NumberText
              key={index}
              obj={obj}
              opacityCondition={activeIndex === index}
              numberClicker={() => {
                setActiveIndex(index);
              }}
              numberHover={(e) => {
                if (e) {
                  setCurrentHoverImage(true);
                } else {
                  setCurrentHoverImage(false);
                }
              }}
            />
          ))}
        </div>
      </div>

      {!currentHoverImage && customCursorVisible && <CustomCursor />}
    </div>
  );
};

export default HeroImages;
