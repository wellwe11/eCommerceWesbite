import { useRef, useState, useEffect } from "react";
import Product from "./components/product";
import type { ProductData } from "../../app/App";
import { motion, useInView } from "framer-motion";

const Gallery = ({ data }: { data: ProductData[] }) => {
  const [items, setItems] = useState(data.slice(0, 9));
  const [hasMore, setHasMore] = useState(true);
  const sentinenRef = useRef(null);

  const isInView = useInView(sentinenRef);

  useEffect(() => {
    if (isInView && hasMore) {
      loadMore();
    }
  }, [isInView]);

  const loadMore = () => {
    const nextBatch = data.slice(items.length, items.length + 9);

    if (nextBatch.length > 0) {
      setItems((prev) => [...prev, ...nextBatch]);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div className="grid grid-cols-[repeat(3,clamp(100px,18vw,350px))] pt-30 justify-center justify-items-center w-full gap-x-10 gap-y-7">
      {items.map((obj, index) => (
        <Product key={`product_${index}`} data={obj} />
      ))}

      {hasMore && <motion.div ref={sentinenRef} className="h-50 w-full" />}
    </div>
  );
};

export default Gallery;
