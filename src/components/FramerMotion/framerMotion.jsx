import { useRef } from "react";
import { motion } from "framer-motion";

import styles from "./framerMotion.module.scss";

import imageOne from "./resources/imageOne.avif";
import imageTwo from "./resources/imageTwo.avif";
import imageThree from "./resources/imageThree.avif";

import useInView from "./hooks/useInView.js";
import useSpringScroll from "./hooks/usespringScroll.js";

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

// data is going to hold images src & bio info. An object will look something like:
// data: [ {
// images: [ {src: ""}, {src: ""}, {srec: ""} ],
// bio: { title: "", description: "", bio: "" }
// } ]
const FramerMotion = ({ containerRef, isIntersecting, data }) => {
  const { md, lg } = useSpringScroll(containerRef);

  const images = [
    { src: imageOne, y: 0 },
    { src: imageTwo, y: lg },
    {
      src: imageThree,
      y: md,
    },
  ];

  const intersectingStyle = {
    opacity: isIntersecting ? "1" : "0",
    visibility: isIntersecting ? "visible" : "hidden",
    transition: isIntersecting
      ? "opacity 0.6s ease, visibility 1s ease"
      : "opacity 0.2s ease, visibility 0.2s ease",
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
          <img
            className={styles.image}
            src={src}
            placeholder="blur"
            alt="image"
          />
        </motion.div>
      ))}
      <div
        className={`${styles.leftContainer} ${styles.gridTextClass}`}
        style={intersectingStyle}
      >
        <BioContainer />
      </div>
      <div
        className={`${styles.rightContainer} ${styles.gridTextClass}`}
        style={intersectingStyle}
      >
        <CollectionTypeContainer />
      </div>
      <div
        className={`${styles.belowContainer} ${styles.gridTextClass}`}
        style={intersectingStyle}
      >
        <LongTextContainer />
      </div>
    </div>
  );
};

const FramerMotionContainer = ({ data }) => {
  const containerRef = useRef(null);
  const [targetRef, isIntersecting] = useInView(containerRef, {
    threshold: 0.7,
  });

  return (
    <div className={styles.container}>
      <FramerMotion
        containerRef={containerRef}
        isIntersecting={isIntersecting}
        data={data}
      />
    </div>
  );
};

export default FramerMotionContainer;
