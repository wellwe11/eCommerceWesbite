import { useRef } from "react";

import useInView from "../../../../components/hooks/useInView.ts";

import FramerMotionContainer from "@components/ui/FramerMotion/framerMotion.js";

import useFoundInView from "../../hooks/useFoundInView.ts";

const CollectionsScoller = ({ data }) => {
  const intersectingRefs = useRef<(HTMLDivElement | null)[]>([]);

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
            ref={(el) => {
              intersectingRefs.current[i] = el;
            }}
            className="mt-80 mb-80"
          >
            <FramerMotionContainer data={obj} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsScoller;
