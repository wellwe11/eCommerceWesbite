import { useEffect, useRef, useState } from "react";

import useInView from "../../components/hooks/useInView.js";
import FramerMotionContainer from "../../components/ui/FramerMotion/framerMotion";

import HeroSection from "../../components/ui/HeroSection/heroSection.js";
import WelcomeSection from "../../components/ui/WelcomeSection/welcomeSection.js";

const FramerMotionsContainer = ({ data }) => {
  const [activeImage, setActiveImage] = useState(1);
  const { one, two, three } = data;

  const refOne = useRef(null);
  const refTwo = useRef(null);
  const refThree = useRef(null);

  const { isIntersecting: intOne } = useInView(refOne, {
    threshold: 0.3,
  });

  const { isIntersecting: intTwo } = useInView(refTwo, {
    threshold: 0.3,
  });

  const { isIntersecting: intThree } = useInView(refThree, {
    threshold: 0.3,
  });

  useEffect(() => {
    [intOne, intTwo, intThree].forEach((boolean, i) => {
      if (boolean) {
        setActiveImage(i + 1);
      }
    });
  }, [intOne, intTwo, intThree]);

  return (
    <div className="grid grid-cols-[1fr_600px_1fr] grid-rows-1 w-screen">
      <div className="col-start-3 row-start-1 row-end-3 h-full text-start relative">
        <div
          className="top-[15%] left-100 sticky h-15 overflow-hidden"
          style={{ opacity: activeImage === 0 ? "0" : "1" }}
        >
          <h3 className="text-6xl font-extralight">0</h3>
          <div
            className="ml-9  transition-transform duration-700 ease"
            style={{ transform: `translateY(-${activeImage * 33}%)` }}
          >
            <h3 className="text-6xl font-extralight -mt-0.5">1</h3>
            <h3 className="text-6xl font-extralight -mt-0.5">2</h3>
            <h3 className="text-6xl font-extralight -mt-0.5">3</h3>
          </div>
        </div>
      </div>
      <div className="row-start-1 row-end-3 col-start-2 w-full h-full flex flex-col items-center">
        <div ref={refOne} className="mt-80 mb-120">
          <FramerMotionContainer data={one} threshold={0.3} />
        </div>
        <div ref={refTwo} className="mt-70">
          <FramerMotionContainer data={two} />
        </div>
        <div ref={refThree} className="mt-60">
          <FramerMotionContainer data={three} />
        </div>
      </div>
    </div>
  );
};

const Home = ({ data }) => {
  /**
   * For tomorrow:
   * Add button to hero-section in home
   * Research nice welcoming-sections or alternatives
   * Create a instagram/socials section on home
   *
   * fun idea:
   * make it so that the number to the right roles up when new image pops up instead of disappearing
   * Remove it from framerMotion.jsx
   * Add it here
   * Add refs into each div-container
   * Then animate them once intersection
   */
  return (
    <div>
      <HeroSection />
      <WelcomeSection />
      <FramerMotionsContainer data={data} />
    </div>
  );
};

export default Home;
