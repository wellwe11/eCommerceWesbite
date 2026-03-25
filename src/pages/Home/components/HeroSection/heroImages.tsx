import { motion, useMotionValue } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import imageOne from "/resources/brutalismTest/artist1_1.jpg";
import imageTwo from "/resources/brutalismTest/artist3_1.webp";
import imageThree from "/resources/brutalismTest/artist2_1.avif";
import imageFour from "/resources/brutalismTest/artist8_2.jpg";

/** Fix CustomCursor
 * Should point left and right. Needs to be left if user is on left side of screen. Right on right side of screen.
 * Increase activeIndex if on right side of screen. Decrease on left side.
 * Pointer when hovering numbers.
 */

/** ActiveIndex
 * Set activeIndex to current image if user clicks one of the numbers
 */

/** Create an image Component.
 * This component changes image depending on activeIndex
 * If user hovers the image in center, it will display the image, with a smooth transition, and scroll towards the direction of the mouse.
 * This means, the big image will anvigate towards the mouses location on the small image.
 */

const CustomCursor = React.memo(() => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mouseDirection, setMouseDirection] = useState(0);

  // get mointor width
  // check if e.clientX > monWidth / 2

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

const IndexedImages = ({ arr, setter, activeIndex }) => {
  return (
    <div className="w-90 h-160 relative">
      {arr.map((image, index) => (
        <div
          key={index}
          onMouseEnter={() => setter({ index, image })}
          onMouseLeave={() => setter({ index: null, image })}
          className="absolute inset-0 hover:cursor-pointer"
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
              className="w-full h-full object-scale-down hover:grayscale"
            />
          </a>
        </div>
      ))}
    </div>
  );
};

const NumberText = ({ obj, opacityCondition, colorCondition }) => {
  const opacity = opacityCondition ? 1 : 0;

  return (
    <p className="flex items-center justify-center tracking-tighter text-[10px] uppercase gap-2 pointer-events-none  text-white">
      <span
        className={`block w-30 text-right text-nowrap pointer-events-none font-extralight mix-blend-difference  ${
          opacityCondition ? "visible" : "invisible"
        }`}
      >
        {obj.pre}
      </span>

      <span className="shrink-0 font-light pointer-events-auto mix-blend-difference">
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

const HeroImages = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentHoverImage, setCurrentHoverImage] = useState<number | null>(
    null,
  );
  const [activeImage, setActiveImage] = useState(null);
  const [customCursorVisible, setCustomerCuorsorVisible] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/gallery");
  };

  const handleActiveIndex = () => {
    setActiveIndex((prev) => (prev + 1 >= imageArray.length ? 0 : prev + 1));
  };

  const imageArray = [imageOne, imageTwo, imageThree, imageFour];

  const offsetsTwo = [
    {
      y: "translate-y-40",
      x: "-translate-x-5",
    },
    {
      y: "-translate-y-5",
      x: "-translate-x-0",
    },
    {
      y: "translate-y-25",
      x: "translate-x-0",
    },
    {
      y: "translate-y-100",
      x: "translate-x-15",
    },
    {
      y: "-translate-y-16",
      x: "-translate-x-10",
    },
  ];

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
      onClick={(e) => {
        !currentHoverImage && handleActiveIndex(e);
      }}
    >
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
        <img
          className="fixed inset-0 h-full w-full object-cover"
          src={activeImage || ""}
          alt=""
        />
        <div className="relative w-90 h-160">
          <IndexedImages
            arr={imageArray}
            activeIndex={activeIndex}
            setter={({ index, image }) => {
              if (index === null) {
                setCurrentHoverImage(null);
                setActiveImage(null);
              } else {
                setActiveImage(image);
                setCurrentHoverImage(index);
              }
            }}
          />
        </div>

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
              colorCondition={currentHoverImage}
            />
          ))}
        </div>
      </div>

      {!currentHoverImage && customCursorVisible && <CustomCursor />}
    </div>
  );
};

export default HeroImages;
