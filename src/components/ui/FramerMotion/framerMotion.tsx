import { useRef } from "react";
import { motion } from "framer-motion";

import styles from "./framerMotion.module.scss";

import useInView from "../../hooks/useInView.js";
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

const FramerMotion = ({
  data,
  threshold = 0.7,
}: {
  data: HomeSection;
  threshold: number | undefined;
}) => {
  const containerRef = useRef(null);
  const { md, lg } = useSpringScroll(containerRef);
  const { isIntersecting } = useInView(containerRef, {
    threshold: threshold,
  });

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

  const intersectingStyle: Object = {
    opacity: isIntersecting ? "1" : "0",
    visibility: isIntersecting ? "visible" : "hidden",
    transition: isIntersecting
      ? "opacity 0.6s ease, visibility 1s cubic-bezier(0.16, 1, 0.3, 1)"
      : "opacity 0.2s ease, visibility 0.2s cubic-bezier(0.7, 0, 0.84, 0)",
    transform: "translateX(0)",
  };

  return (
    <div className={styles.framerMotion} ref={containerRef}>
      {images.map(({ src, y }, i) => (
        <motion.div
          key={`i_${i}`}
          style={{ y }}
          className={styles.imageContainer}
        >
          <img className={styles.image} src={src} alt="image" />
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
  threshold,
}: {
  data: HomeSection;
  threshold: number | undefined;
}) => {
  return (
    <div className={styles.container}>
      <FramerMotion data={data} threshold={threshold} />
    </div>
  );
};

export default FramerMotionContainer;
