import { useScroll, useSpring, useTransform } from "framer-motion";

/**
 *
 * @param {object} containerRef - Element container
 * @returns { md, lg }
 */

const useSpringScroll = (containerRef: React.RefObject<HTMLElement>) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const mdRaw = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [150, 0, 0, -150],
  );
  const lgRaw = useTransform(
    scrollYProgress,
    [0, 0.4, 0.45, 0.55, 0.6, 1],
    [250, 60, 10, -10, -60, -250],
  );

  const springConfig = { stiffness: 1000, damping: 150, mass: 1 };

  const md = useSpring(mdRaw, springConfig);
  const lg = useSpring(lgRaw, springConfig);

  return { md, lg };
};

export default useSpringScroll;
