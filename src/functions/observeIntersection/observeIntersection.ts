/**
 *
 * @param className
 * @returns
 * @usage <div ref={observeIntersection('animate-fade')} />
 */

const observeIntersection = (className) => (node) => {
  if (!node) return;

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      node.classList.add(className);
    }
  });
  observer.observe(node);
};

export default observeIntersection;
