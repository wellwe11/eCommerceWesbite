import { useRef } from "react";

import useInView from "../../components/hooks/useInView.js";
import FramerMotionContainer from "../../components/ui/FramerMotion/framerMotion";

import HeroSection from "../../components/ui/HeroSection/heroSection.js";
import WelcomeSection from "../../components/ui/WelcomeSection/welcomeSection.js";
import useFoundInView from "./hooks/useFoundInView.js";

const FramerMotionsContainer = ({ data }) => {
  const { one, two, three } = data;

  const intersectingRefs = useRef([]);

  const containerRef = useRef(null);

  const { intersectingEl } = useFoundInView(intersectingRefs);

  const { isIntersecting: intContainerRef } = useInView(containerRef, {
    threshold: 0.1,
  });

  return (
    <div className="grid grid-cols-[1fr_600px_1fr] grid-rows-1 w-screen">
      <div
        ref={containerRef}
        className="col-start-3 row-start-1 row-end-3 h-full text-start relative"
      >
        <div
          className="top-[15%] ml-[1vw] fixed h-15 overflow-hidden"
          style={{
            opacity: !intContainerRef ? "0" : "1",
            visibility: !intContainerRef ? "hidden" : "visible",
            transition: "opacity 0.2s ease, visibility 0.2s ease",
          }}
        >
          <h3 className="text-6xl font-extralight">0</h3>
          <div
            className="ml-9  transition-transform duration-700 ease"
            style={{ transform: `translateY(-${(+intersectingEl + 1) * 33}%)` }}
          >
            <h3 className="text-6xl font-extralight -mt-0.5">1</h3>
            <h3 className="text-6xl font-extralight -mt-0.5">2</h3>
            <h3 className="text-6xl font-extralight -mt-0.5">3</h3>
          </div>
        </div>
      </div>
      <div className="row-start-1 row-end-3 col-start-2 w-full h-full flex flex-col items-center">
        {Object.entries(data).map(([entry, obj], i) => (
          <div
            key={`framerContainer_${entry}_${i}`}
            ref={(el) => (intersectingRefs.current[i] = el)}
            className="mt-80 mb-80"
          >
            <FramerMotionContainer data={obj} />
          </div>
        ))}
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
