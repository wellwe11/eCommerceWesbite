import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import styles from "./framerMotion.module.scss";

import useSpringScroll from "./hooks/useSpringScroll.ts";
import type { HomeSection } from "src/router.tsx";

const BioContainer = ({ bioTitle, bio }: { bioTitle: string; bio: string }) => {
  return (
    <div className={styles.bioContainer}>
      <div className={styles.fixedContainer}>
        <h6 className={styles.bioTitle}>{bioTitle}</h6>
        <p className={styles.bio}>{bio}</p>
      </div>
    </div>
  );
};

const LongTextContainer = ({ longText }: { longText: string }) => {
  return (
    <div className={styles.longTextContainer}>
      <p className={styles.text}>{longText}</p>
    </div>
  );
};

const FramerMotion = ({ data }: { data: HomeSection }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { md, lg } = useSpringScroll(containerRef);

  const {
    index,
    text: { title, info, bio },
    images: imageSources,
  } = data;

  if (!data) return;

  const images = [
    { src: imageSources[0], y: 0 },
    { src: imageSources[1], y: lg },
    {
      src: imageSources[2],
      y: md,
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start", "end end", "end start"],
  });

  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8, 1],
    [0, 1, 1, 0],
  );
  const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 20 });

  return (
    <div className={styles.framerMotion} ref={containerRef}>
      {images.map(({ src, y }, i) => (
        <motion.div
          key={`i_${i} ${index}`}
          style={{ y }}
          className={styles.imageContainer}
        >
          <img className={styles.image} src={src} alt="image" />
        </motion.div>
      ))}
      <motion.div
        className={`${styles.leftContainer} ${styles.gridTextClass}`}
        style={{ opacity }}
      >
        <BioContainer bioTitle={title} bio={info} />
      </motion.div>

      <motion.div
        className={`${styles.belowContainer} ${styles.gridTextClass}`}
        style={{ opacity }}
      >
        <LongTextContainer longText={bio} />
      </motion.div>
    </div>
  );
};

const FramerMotionContainer = ({
  data,
}: {
  data: HomeSection;
  threshold: number | undefined;
}) => {
  return (
    <div className={styles.container}>
      <FramerMotion data={data} />
    </div>
  );
};

export default FramerMotionContainer;
