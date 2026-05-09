/**
 * @usage <proxElement.div className="box">I am observed!</.div>
 */

const proxyElement = new Proxy(
  {},
  {
    get: (target, property) => {
      return ({ children, ...props }) => {
        const ref = (node) => {
          if (node) {
            const observer = new IntersectionObserver(([entry]) => {
              if (entry.isIntersecting) {
                node.classList.add("visible");
              }
            });
            observer.observe(node);
          }
        };

        // "div", "span", etc.
        const Tag = property;
        return (
          <Tag ref={ref} {...props}>
            {children}
          </Tag>
        );
      };
    },
  },
);

export default proxyElement;
