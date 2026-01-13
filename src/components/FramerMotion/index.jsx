import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import styles from "./framerMotion.module.scss";

import imageOne from "./resources/imageOne.avif";
import imageTwo from "./resources/imageTwo.avif";
import imageThree from "./resources/imageThree.avif";

const TextsContainer = () => {
  const bioTitle = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  const bio =
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. ";

  const longText =
    "Duis aute irure esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.";

  return (
    <div className={styles.textsContainer}>
      <div className={styles.subText}>
        <div className={styles.textContainer}>
          <p>{longText}</p>
        </div>
      </div>
      <div className={styles.leftContainer}>
        <div className={styles.bioContainer}>
          <h6 className={styles.title}>{bioTitle}</h6>
          <p className={styles.bio}>{bio}</p>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.collectionContainer}>
          <div className={styles.title}>
            <h1>01</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

const FramerMotion = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const md = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  const lg = useTransform(scrollYProgress, [0, 0.5, 1], [150, 0, -150]);

  const images = [
    { src: imageOne, y: 0 },
    { src: imageTwo, y: lg },
    {
      src: imageThree,
      y: md,
    },
  ];

  return (
    <div className={styles.framerMotion} ref={containerRef}>
      {images.map(({ src, y }, i) => (
        <motion.div
          key={`i_${i}`}
          style={{ y }}
          className={styles.imageContainer}
        >
          <img
            className={styles.image}
            src={src}
            placeholder="blur"
            alt="image"
            fill="true"
          />
        </motion.div>
      ))}
    </div>
  );
};

const FramerMotionContainer = () => {
  return (
    <div className={styles.container}>
      <TextsContainer />
      <FramerMotion />
    </div>
  );
};

export default FramerMotionContainer;
