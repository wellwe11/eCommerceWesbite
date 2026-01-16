/**
 * @param {object} refs - Intersection Observer Refs in array-form
 * @param {object} options - Intersection Observer config (threshold, rootMargin);
 * @returns { interesectingEl } - index of item in array that is returned
 */

import { useEffect, useState, type RefObject } from "react";

const useFoundInView = (
  refs: RefObject<(HTMLDivElement | null)[]>,
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: "0px" }
) => {
  if (!refs || !refs.current) {
    throw new Error("-- useInView -- requires a ref");
  }

  const { threshold, rootMargin } = options;

  const [intersectingEl, setIntersectingEl] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIntersectingEl(
            refs.current.indexOf(entry.target as HTMLDivElement)
          );
        }
      });
    }, options);

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [threshold, rootMargin, refs]);

  return { intersectingEl };
};

export default useFoundInView;
