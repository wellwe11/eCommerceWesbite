import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import imageOne from "/resources/brutalismTest/artist1_1.jpg";
import imageTwo from "/resources/brutalismTest/artist3_1.webp";
import imageThree from "/resources/brutalismTest/artist2_1.avif";
import imageFour from "/resources/brutalismTest/artist8_2.jpg";

// Make all texts in hero-section "mix-blend-difference"
// navigate to collection when user clicks smaller image

const CustomCursor = React.memo(() => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mouseDirection, setMouseDirection] = useState(0);

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
  );
});

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
          <a className="block w-full h-full" key={index}>
            <img
              src={image}
              alt=""
              className="object-scale-down hover:grayscale w-full h-full"
            />
          </a>
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
        className={`block w-30 text-right text-nowrap pointer-events-none font-extralight mix-blend-difference  ${
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
        className={`block w-30 text-left text-nowrap pointer-events-none italic font-extralight mix-blend-difference  ${
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentHoverImage, setCurrentHoverImage] = useState<boolean | null>(
    false,
  );

  const [customCursorVisible, setCustomerCuorsorVisible] = useState(false);

  const imageArray = [imageOne, imageTwo, imageThree, imageFour];
  const currentImage = imageArray[activeIndex];

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/gallery");
  };

  const handleIncreaseIndex = () => {
    const nextIndex = (activeIndex + 1) % imageArray.length;
    setActiveIndex(nextIndex);
  };

  const handleDecreaseIndex = () => {
    const prevIndex = (activeIndex - 1 + imageArray.length) % imageArray.length;
    setActiveIndex(prevIndex);
  };

  const editorialMetadata = [
    {
      pre: "d’stylli",
      num: "01",
      post: "vellure-tross r0cco styled by b’narrock",
    },
    {
      pre: "koll-stunn",
      num: "02",
      post: "d’epoque r’poublika styled by jerni",
    },
    {
      pre: "d’stylli",
      num: "03",
      post: "m’norra vell-fohr f’olline b’narrock",
    },
    { pre: "r’poublika apoll-rocc", num: "04", post: "styled by vinnia-fohr" },
  ];

  return (
    <div
      className="h-full w-full fixed cursor-none inset-0"
      onMouseEnter={() => setCustomerCuorsorVisible(true)}
      onMouseLeave={() => setCustomerCuorsorVisible(false)}
    >
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
        <DirectionContainers
          handler={(e) => {
            if (!currentHoverImage) {
              if (e > 0) {
                handleDecreaseIndex();
              } else {
                handleIncreaseIndex();
              }
            }
          }}
        />

        <BackgroundImage
          src={currentImage}
          setCurrentHoverImage={setCurrentHoverImage}
          imageArray={imageArray}
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
