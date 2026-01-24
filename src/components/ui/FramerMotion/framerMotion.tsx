import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

  const isInView = useInView(containerRef, { amount: 0.9 });

  const { md, lg } = useSpringScroll(containerRef);

  const {
    index,
    text: { title, info, bio },
    images: imageSources,
  } = data;

  const images = [
    { src: imageSources[0], y: 0 },
    { src: imageSources[1], y: lg },
    {
      src: imageSources[2],
      y: md,
    },
  ];

  // update this to use framerMotion instead
  const intersectingStyle: Object = {
    opacity: isInView ? "1" : "0",
    visibility: isInView ? "visible" : "hidden",
    transition: isInView
      ? "opacity 0.6s ease, visibility 1s cubic-bezier(0.16, 1, 0.3, 1)"
      : "opacity 0.2s ease, visibility 0.2s cubic-bezier(0.7, 0, 0.84, 0)",
    transform: "translateX(0)",
  };

  return (
    <div className={styles.framerMotion} ref={containerRef}>
      {images.map(({ src, y }, i) => (
        <motion.div
          key={`i_${i} ${index}`}
          style={{ y }}
          className={styles.imageContainer}
        >
          <img
            className={styles.image}
            src={src}
            alt="image"
            loading="eager"
            decoding="async"
          />
        </motion.div>
      ))}
      <div
        className={`${styles.leftContainer} ${styles.gridTextClass}`}
        style={intersectingStyle}
      >
        <BioContainer bioTitle={title} bio={info} />
      </div>

      <div
        className={`${styles.belowContainer} ${styles.gridTextClass}`}
        style={intersectingStyle}
      >
        <LongTextContainer longText={bio} />
      </div>
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
