import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import FramerMotionContainer from "@components/ui/FramerMotion/framerMotion.tsx";

import { useQueryClient } from "@tanstack/react-query";
import LinkWrapper from "@components/ui/Link/link";

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
      className="relative col-start-3 row-start-1 row-end-3 h-full text-start [clip-path:inset(0_0_0_0)] ml-2"
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

const CollectionsContainer = ({ setter }) => {
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData(["home"]);

  if (!data) return;

  const dataArr = !Array.isArray(data) ? Object.values(data) : data;

  return (
    <div className="row-start-1 row-end-3 col-start-2 w-full h-full flex flex-col items-center">
      {dataArr.map((obj, i) => (
        <motion.div
          key={`framerContainer_${obj?.id}_${i}`}
          className="mt-100 mb-100"
          whileInView={() => setter(i)}
        >
          <LinkWrapper to={`/product/${obj.id}`} product={obj}>
            <FramerMotionContainer data={obj} threshold={0.7} />
          </LinkWrapper>
        </motion.div>
      ))}
    </div>
  );
};

const CollectionsScoller = () => {
  const [activeCount, setActiveCount] = useState(0);

  return (
    <motion.div
      className="grid grid-cols-[1fr_clamp(calc(30vw+10rem),50%,45vw)_1fr] grid-rows-1 w-full overflow-clip"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      <CollectionNumberCounter activeCount={activeCount} />
      <CollectionsContainer setter={setActiveCount} />
    </motion.div>
  );
};

export default CollectionsScoller;
