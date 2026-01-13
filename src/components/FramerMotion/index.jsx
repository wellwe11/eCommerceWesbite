import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import styles from "./framerMotion.module.scss";

import imageOne from "./resources/imageOne.avif";
import imageTwo from "./resources/imageTwo.avif";
import imageThree from "./resources/imageThree.avif";

// what needs to be done for this component

// this component (the completed version) is going to have texts on both sides
// those texts are going to the centered.
// left side is going to have a title, and a short bio
// right side is going to be a title with a number (the number-id of that collection)
// below collection of images, there will be a smaller text, which contains further information

// what i need to do is create a component with all of these texts
// whenever the with the correct images intersects, the correct texts should display
// the reason i say correct texts, is because when I have 2-3-4 components like this
// the texts must switch to match the new collection of images

const TextsContainer = () => {
  return (
    <div className={styles.textsContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.bioContainer}></div>
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
