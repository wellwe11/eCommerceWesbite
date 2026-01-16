/**
 * @param {object} refs - Intersection Observer Refs in array-form
 * @param {object} options - Intersection Observer config (threshold, rootMargin);
 * @returns { interesectingEl } - index of item in array that is returned
 */

import { useEffect, useState } from "react";

const useFoundInView = (
  refs: React.RefObject<HTMLElement>[] | React.RefObject<null>[],
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: "0px" }
) => {
  if (!refs) {
    throw new Error("-- useInView -- requires a ref");
  }

  const { threshold, rootMargin } = options;

  const [intersectingEl, setIntersectingEl] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, index) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIntersectingEl(refs.current.indexOf(entry.target));
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
