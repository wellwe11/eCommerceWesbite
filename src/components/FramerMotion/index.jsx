import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import styles from "./framerMotion.module.scss";

import imageOne from "./resources/imageOne.avif";
import imageTwo from "./resources/imageTwo.avif";
import imageThree from "./resources/imageThree.avif";

import useInView from "./hooks/useInView.js";

// for tomorrow:
// make component scalable for smaller/bigger screens
// abstract code:
// textscontainer need to take in data from parent

const bioTitle = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const bio =
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. ";

const longText =
  "Duis aute irure esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.";

const TextsContainer = ({ isIntersecting, data }) => {
  const isIntersectingStyle = {
    opacity: isIntersecting ? "1" : "0",
  };

  return (
    <div className={styles.textsContainer} style={isIntersectingStyle}>
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

const FramerMotion = ({ containerRef, isIntersecting }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const mdRaw = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [150, 0, 0, -150]
  );
  const lgRaw = useTransform(
    scrollYProgress,
    [0, 0.4, 0.45, 0.55, 0.6, 1],
    [250, 60, 10, -10, -60, -250]
  );

  const springConfig = { stiffness: 1000, damping: 150, mass: 1 };

  const md = useSpring(mdRaw, springConfig);
  const lg = useSpring(lgRaw, springConfig);

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
          />
        </motion.div>
      ))}
    </div>
  );
};

const FramerMotionContainer = () => {
  const containerRef = useRef(null);
  const [targetRef, isIntersecting] = useInView(containerRef, {
    threshold: 0.1,
  });

  return (
    <div className={styles.container}>
      <TextsContainer isIntersecting={isIntersecting} />
      <FramerMotion containerRef={containerRef} />
    </div>
  );
};

export default FramerMotionContainer;
