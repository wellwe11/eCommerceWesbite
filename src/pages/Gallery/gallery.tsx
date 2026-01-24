import { useRef, useState, useEffect } from "react";
import Product from "./components/product";
import type { ProductData } from "../../app/App";
import { motion, useInView } from "framer-motion";

const LoadMoreEl = ({
  setter,
  hasMore,
}: {
  setter: CallableFunction;
  hasMore: boolean;
}) => {
  const sentinenRef = useRef(null);
  const isInView = useInView(sentinenRef);

  useEffect(() => {
    if (isInView && hasMore) {
      setter();
    }
  }, [isInView]);

  return hasMore && <motion.div ref={sentinenRef} className="h-50 w-full" />;
};

const Products = ({ data }: { data: ProductData[] }) => {
  return (
    <motion.div className="grid grid-cols-[repeat(3,clamp(100px,18vw,350px))] pt-30 justify-center justify-items-center w-full gap-y-7 gap-x-10">
      {data.map((obj, index) => (
        <Product key={`product_${index}`} data={obj} />
      ))}
    </motion.div>
  );
};

const Gallery = ({ data }: { data: ProductData[] }) => {
  const [items, setItems] = useState(data.slice(0, 9));
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadMore = () => {
    const nextBatch = data.slice(items.length, items.length + 9);

    if (nextBatch.length > 0) {
      setItems((prev) => [...prev, ...nextBatch]);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div className="">
      <Products data={items} />

      <LoadMoreEl setter={loadMore} hasMore={hasMore} />
    </div>
  );
};

export default Gallery;
