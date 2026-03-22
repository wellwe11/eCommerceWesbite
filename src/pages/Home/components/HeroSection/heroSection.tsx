import { useNavigate } from "react-router-dom";
import heroImage from "../../resources/imageThree.avif";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// 2 containers, that are stacked on each other.
// Inside each container, have 5 div containers. Flex them so they are beside each other with a gap-2 or 5.
// Each container has 1 image.
// Each div should have a grid-layout that is 4x6 (24 squares)
// Simply place the images

const HeroImages = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleActiveIndex = () =>
    setActiveIndex((prev) => (prev === 0 ? 1 : 0));

  const imageArrayOne = [heroImage, heroImage, heroImage, heroImage, heroImage];
  const imageArrayTwo = [heroImage, heroImage, heroImage, heroImage, heroImage];

  const offsetsOne = [
    "-translate-y-40",
    "translate-y-30",
    "-translate-y-4",
    "translate-y-54",
    "-translate-y-24",
    "translate-y-12",
  ];

  const offsetsTwo = [
    "-translate-y-40",
    "translate-y-30",
    "-translate-y-4",
    "translate-y-54",
    "-translate-y-24",
    "translate-y-12",
  ];

  const flattedImages = [imageArrayOne, imageArrayTwo].flat();

  return (
    <div className="h-full py-25 cursor-pointer fixed">
      <div
        className="fixed z-10 h-full flex flex-col justify-between"
        style={{
          transform: "translate(-50%, -50%)",
          left: "50%",
          top: `${activeIndex}00%`,
          height: `calc(100% * 2 - 50px)`,
        }}
        onClick={handleActiveIndex}
      >
        {flattedImages.map((_, index) => (
          <p>{index}</p>
        ))}
      </div>

      <div className="flex justify-between gap-2 items-center h-full">
        {imageArrayOne.map((image, index) => (
          <div
            key={index}
            className={`w-1/5 ${offsetsOne[index % offsetsOne.length]}`}
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

      <div></div>
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
  return (
    <div className="relative w-full h-screen z-10 ">
      {/* <img
        className="fixed inset-0 h-full w-full object-cover"
        src={heroImage}
        alt=""
      /> */}

      <HeroImages />
      <TextsWrapper />
    </div>
  );
};

export default HeroSection;
