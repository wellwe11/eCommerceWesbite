import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { HomeSection } from "src/router.tsx";

import FramerMotionContainer from "@components/ui/FramerMotion/framerMotion.tsx";

// number on right side which displays currently showing collection (1/2/3...)
const CollectionNumberCounter = ({ activeCount }: { activeCount: number }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={containerRef}
      className="relative col-start-3 row-start-1 row-end-3 h-full text-start"
      style={{ opacity }}
    >
      <motion.div
        className="fixed top-[15%] h-15 overflow-hidden"
        initial="hidden"
        whileInView="visible"
      >
        <h3 className="text-6xl font-heavy">0</h3>
        <motion.div
          viewport={{ amount: 0.5 }}
          className="ml-9  transition-transform duration-700 ease"
          style={{
            transform: `translateY(-${(activeCount + 1) * 33}%)`,
          }}
        >
          <h3 className="text-6xl font-heavy -mt-0.5">1</h3>
          <h3 className="text-6xl font-heavy -mt-0.5">2</h3>
          <h3 className="text-6xl font-heavy -mt-0.5">3</h3>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const CollectionsContainer = ({
  data,
  setter,
}: {
  data: Record<string, HomeSection>;
  setter: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="row-start-1 row-end-3 col-start-2 w-full h-full flex flex-col items-center">
      {Object.entries(data).map(([entry, obj], i) => (
        <motion.div
          key={`framerContainer_${entry}_${i}`}
          onViewportEnter={() => setter(i)}
          className="mt-80 mb-80"
        >
          <FramerMotionContainer data={obj} threshold={0.7} />
        </motion.div>
      ))}
    </div>
  );
};

const CollectionsScoller = ({
  data,
}: {
  data: Record<string, HomeSection>;
}) => {
  const [activeCount, setActiveCount] = useState(0);

  return (
    <div className="grid grid-cols-[1fr_clamp(calc(30vw+10rem),50%,45vw)_1fr] grid-rows-1 w-full">
      <CollectionNumberCounter activeCount={activeCount} />
      <CollectionsContainer data={data} setter={setActiveCount} />
    </div>
  );
};

export default CollectionsScoller;
