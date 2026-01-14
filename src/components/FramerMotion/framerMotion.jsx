import { useRef } from "react";
import { motion } from "framer-motion";

import styles from "./framerMotion.module.scss";

import useInView from "./hooks/useInView.js";
import useSpringScroll from "./hooks/usespringScroll.js";

const BioContainer = ({ bioTitle, bio }) => {
  return (
    <div className={styles.bioContainer}>
      <div className={styles.fixedContainer}>
        <h6 className={styles.bioTitle}>{bioTitle}</h6>
        <p className={styles.bio}>{bio}</p>
      </div>
    </div>
  );
};

const CollectionTypeContainer = ({ index = 0 }) => {
  const indexText = index < 10 ? "0" + index : index;

  return (
    <div className={styles.typeContainer}>
      <h1 className={styles.title}>{indexText}</h1>
    </div>
  );
};

const LongTextContainer = ({ longText }) => {
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
        <BioContainer bioTitle={title} bio={info} />
      </div>
      <div
        className={`${styles.rightContainer} ${styles.gridTextClass}`}
        style={intersectingStyle}
      >
        <CollectionTypeContainer index={index} />
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
