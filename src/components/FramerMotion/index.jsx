import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import styles from "./framerMotion.module.scss";

import imageOne from "./resources/imageOne.avif";
import imageTwo from "./resources/imageTwo.avif";
import imageThree from "./resources/imageThree.avif";

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
    <div className={styles.container}>
      <div className={styles.images} ref={containerRef}>
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
    </div>
  );
};

export default FramerMotion;
