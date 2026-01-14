import { useEffect, useState } from "react";

/**
 * @param {object} options - Intersection Observer config (threshold, rootMargin);
 * @param {object} ref - Intersection Observer ref
 * @returns [isIntersecting]
 */

const useInView = (
  targetRef,
  options = { threshold: 0.1, rootMargin: "0px" }
) => {
  if (!targetRef) {
    throw new Error("-- useInView -- requires a ref");
  }

  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    const currentTarget = targetRef.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
};

export default useInView;
