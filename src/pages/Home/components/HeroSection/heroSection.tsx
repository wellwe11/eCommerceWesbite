import { useNavigate } from "react-router-dom";
import heroImage from "../../resources/imageThree.avif";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";

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

const IndexedImages = ({ arr, offsets, setter }) => {
  return (
    <div className="flex justify-between gap-2 items-center h-full">
      {arr.map((image, index) => (
        <div
          key={index}
          className={`w-1/5 ${offsets[index % offsets.length].y} ${offsets[index % offsets.length].x} cursor-pointer`}
          onMouseEnter={() => setter({ index, image })}
          onMouseLeave={() => setter({ index: null, image })}
        >
          <a>
            <img
              src={image}
              alt=""
              className="hover:grayscale group-hover:invert"
            />
          </a>
        </div>
      ))}
    </div>
  );
};

const NumberText = ({ obj, condition }) => {
  return (
    <p className="flex items-center justify-center tracking-tighter text-[10px] uppercase gap-2 pointer-events-none">
      <span
        style={{ opacity: condition ? 1 : 0 }}
        className="block w-100 text-right transition-opacity duration-300 text-nowrap pointer-events-none font-extralight"
      >
        {obj.pre}
      </span>

      <span className="shrink-0 font-light pointer-events-auto">{obj.num}</span>

      <span
        style={{ opacity: condition ? 1 : 0 }}
        className="block w-100 text-left transition-opacity duration-300 text-nowrap pointer-events-none italic font-extralight"
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
  const [customCursorVisible, setCustomerCuorsorVisible] = useState(true);

  const handleActiveIndex = () =>
    setActiveIndex((prev) => (prev === 0 ? 1 : 0));

  const imageArrayOne = [heroImage, heroImage, heroImage, heroImage, heroImage];
  const imageArrayTwo = [heroImage, heroImage, heroImage, heroImage, heroImage];

  const offsetsOne = [
    {
      y: "translate-y-10",
      x: "translate-x-15",
    },
    {
      y: "translate-y-80",
      x: "-translate-x-15",
    },
    {
      y: "-translate-y-4",
      x: "-translate-x-20",
    },
    {
      y: "translate-y-100",
      x: "translate-x-15",
    },
    {
      y: "translate-y-24",
      x: "-translate-x-2",
    },
  ];

  const offsetsTwo = [
    {
      y: "translate-y-104",
      x: "translate-x-5",
    },
    {
      y: "translate-y-10",
      x: "-translate-x-15",
    },
    {
      y: "translate-y-90",
      x: "translate-x-10",
    },
    {
      y: "translate-y-4",
      x: "translate-x-15",
    },
    {
      y: "translate-y-106",
      x: "-translate-x-17",
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
    {
      pre: "v’benarrock-stunn",
      num: "05",
      post: "d’epoque r’poublika 11 r’occo",
    },
    {
      pre: "d’stylli jerni-vellure",
      num: "06",
      post: "styled by k’oll b’narrock",
    },
    {
      pre: "m’norra",
      num: "07",
      post: "r’poublika v’benarrock styled by tross",
    },
    { pre: "d’stylli vinnia-rocc", num: "08", post: "fohrer-apoll r’poublika" },
    {
      pre: "b’narrock-fohr styled by",
      num: "09",
      post: "jerni d’epoque m’norra",
    },
    { pre: "r’poublika", num: "10", post: "k’oll-stunn d’stylli by vinnia-02" },
  ];

  return (
    <div
      className="h-full w-full fixed cursor-none"
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
        className="fixed z-10 h-full flex flex-col justify-between items-center pointer-events-none"
        style={{
          transform: "translate(-50%, -50%)",
          left: "50%",
          top: `${activeIndex * 100}%`,
          height: `calc(100% * 2 - 50px)`,
          transition: "top 0.4s ease",
        }}
      >
        {editorialMetadata.map((obj, index) => (
          <NumberText
            key={index}
            obj={obj}
            condition={currentHoverImage === index}
          />
        ))}
      </div>

      <div
        className="fixed p-20"
        style={{
          opacity: activeIndex === 1 ? 1 : 0.035,
          transition: "opacity 0.5s ease, filter 1s ease",
          filter: activeIndex === 1 ? "blur(0px)" : "blur(1px)",
          pointerEvents: activeIndex === 0 ? "none" : "auto",
          transitionDelay: activeIndex === 1 ? "0.8s" : "0.15s",
        }}
      >
        <IndexedImages
          arr={imageArrayOne}
          offsets={offsetsOne}
          setter={({ index, image }) => {
            setCurrentHoverImage(index);
            setter(image);

            if (index === null) {
              setter(null);
            }
          }}
        />
      </div>

      <div
        className="fixed p-20"
        style={{
          opacity: activeIndex === 1 ? 0.035 : 1,
          filter: activeIndex === 1 ? "blur(1px)" : "blur(0px)",
          transition: "opacity 0.5s ease, filter 1s ease",
          pointerEvents: activeIndex === 1 ? "none" : "auto",
          transitionDelay: activeIndex === 0 ? "0.8s" : "0.15s",
        }}
      >
        <IndexedImages
          arr={imageArrayTwo}
          offsets={offsetsTwo}
          setter={({ index, image }) => {
            if (index === null) {
              setCurrentHoverImage(null);
              setter(null);
            } else {
              setter(image);
              setCurrentHoverImage(index + 5);
            }
          }}
        />
      </div>
    </div>
  );
};

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
      {/* <TextsWrapper /> */}
    </div>
  );
};

export default HeroSection;
