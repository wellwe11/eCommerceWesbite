import { motion, useMotionValue } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import imageOne from "/resources/brutalismTest/artist1_1.jpg";
import imageTwo from "/resources/brutalismTest/artist3_1.webp";
import imageThree from "/resources/brutalismTest/artist2_1.avif";
import imageFour from "/resources/brutalismTest/artist8_2.jpg";

const CustomCursor = React.memo(({ activeIndex }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-999999"
      style={{ x: mouseX, y: mouseY }}
    >
      <div
        style={{
          transform: `rotate(${activeIndex === 1 ? -90 : 90}deg)`,
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
  return (
    <p
      className="flex items-center justify-center tracking-tighter text-[10px] uppercase gap-2 pointer-events-none mix-blend-difference"
      style={{ color: colorCondition ? "white" : "black" }}
    >
      <span
        style={{ opacity: opacityCondition ? 1 : 0 }}
        className="block w-30 text-right transition-opacity duration-300 text-nowrap pointer-events-none font-extralight"
      >
        {obj.pre}
      </span>

      <span className="shrink-0 font-light pointer-events-auto">{obj.num}</span>

      <span
        style={{ opacity: opacityCondition ? 1 : 0 }}
        className="block w-30 text-left transition-opacity duration-300 text-nowrap pointer-events-none italic font-extralight"
      >
        {obj.post}
      </span>
    </p>
  );
};

const HeroImages = ({ setter }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentHoverImage, setCurrentHoverImage] = useState<number | null>(
    null,
  );
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
      className="h-full w-full fixed cursor-none isolate"
      onMouseEnter={() => setCustomerCuorsorVisible(true)}
      onMouseLeave={() => setCustomerCuorsorVisible(false)}
      onClick={(e) => {
        !currentHoverImage && handleActiveIndex(e);
      }}
    >
      {!currentHoverImage && customCursorVisible && (
        <CustomCursor activeIndex={activeIndex} />
      )}
      <div
        className="fixed z-10 h-full flex justify-between items-center pointer-events-none py-20 hover:text-white"
        style={{
          transform: "translate(-50%, -50%)",
          left: "50%",
          top: "65%",
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

      <div
        className="fixed"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <IndexedImages
          arr={imageArray}
          activeIndex={activeIndex}
          setter={({ index, image }) => {
            if (index === null) {
              setCurrentHoverImage(null);
              setter(null);
            } else {
              setter(image);
              setCurrentHoverImage(index);
            }
          }}
        />
      </div>
    </div>
  );
};
export default HeroImages;
