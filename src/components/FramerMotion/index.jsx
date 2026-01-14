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

const BioContainer = () => {
  return (
    <div className={styles.bioContainer}>
      <div className={styles.fixedContainer}>
        <h6 className={styles.bioTitle}>{bioTitle}</h6>
        <p className={styles.bio}>{bio}</p>
      </div>
    </div>
  );
};

const CollectionTypeContainer = () => {
  return (
    <div className={styles.typeContainer}>
      <h1 className={styles.title}>01</h1>
    </div>
  );
};

const LongTextContainer = () => {
  return (
    <div className={styles.longTextContainer}>
      <p className={styles.text}>{longText}</p>
    </div>
  );
};

const FramerMotion = ({ containerRef, isIntersecting }) => {
  console.log(isIntersecting);
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
      <div
        className={styles.leftContainer}
        style={{
          opacity: isIntersecting ? "1" : "0",
          visibility: isIntersecting ? "visible" : "hidden",
          transition: isIntersecting
            ? "opacity 0.6s ease, visibility 1s ease"
            : "opacity 0.2s ease, visibility 0.2s ease",
        }}
      >
        <BioContainer />
      </div>
      <div
        className={styles.rightContainer}
        style={{
          opacity: isIntersecting ? "1" : "0",
          visibility: isIntersecting ? "visible" : "hidden",
          transition: isIntersecting
            ? "opacity 0.6s ease, visibility 1s ease"
            : "opacity 0.2s ease, visibility 0.2s ease",
        }}
      >
        <CollectionTypeContainer />
      </div>
      <div
        className={styles.belowContainer}
        style={{
          opacity: isIntersecting ? "1" : "0",
          visibility: isIntersecting ? "visible" : "hidden",
          transition: isIntersecting
            ? "opacity 0.6s ease, visibility 1s ease"
            : "opacity 0.2s ease, visibility 0.2s ease",
        }}
      >
        <LongTextContainer />
      </div>
    </div>
  );
};

const FramerMotionContainer = () => {
  const containerRef = useRef(null);
  const [targetRef, isIntersecting] = useInView(containerRef, {
    threshold: 0.7,
  });

  return (
    <div className={styles.container}>
      {/* <TextsContainer isIntersecting={isIntersecting} /> */}
      <FramerMotion
        containerRef={containerRef}
        isIntersecting={isIntersecting}
      />
    </div>
  );
};

export default FramerMotionContainer;
