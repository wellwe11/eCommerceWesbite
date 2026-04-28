import { useRef, useState, useEffect } from "react";
import Product from "./components/product";
import type { ProductData } from "@/types/product";
import { motion, useInView } from "framer-motion";

import LinkWrapper from "@/components/ui/Link/link";
import { useGlobalProducts } from "@/hooks/useGlobalData/useGlobalData";

const LoadMoreEl = ({ setter }: { setter: CallableFunction }) => {
  const sentinenRef = useRef(null);
  const isInView = useInView(sentinenRef);

  useEffect(() => {
    if (isInView) {
      setter();
    }
  }, [isInView]);

  return <motion.div ref={sentinenRef} className="h-50 w-full" />;
};

const Products = ({ data }: { data: ProductData[] }) => {
  return (
    <motion.div className="grid grid-cols-[repeat(3,clamp(100px,18vw,350px))] pt-30 justify-center justify-items-center gap-y-7 gap-x-10">
      {data.map((obj, index) => (
        <LinkWrapper
          classes="w-full"
          key={`product_${index}`}
          product={obj}
          to={`/product/${obj.id}`}
        >
          <Product data={obj} />
        </LinkWrapper>
      ))}
    </motion.div>
  );
};

const Gallery = () => {
  const [items, setItems] = useState(9);

  // For future:
  // When I have an API, TanStack Query offers 'infinite scroll queries'. Should use this instead
  // This also allows me to 'save' previous page. So when user goes back from product-page, I can still to the correct section.
  const { data } = useGlobalProducts(({ imagesData }) =>
    Array.from(imagesData.values()).slice(0, items),
  );

  const loadMore = () => {
    if (!data || !items) return;

    setItems((prev) => prev + 9);
  };

  if (!data) return;

  return (
    <div>
      <Products data={data} />
      {data && items <= data.length && <LoadMoreEl setter={loadMore} />}
    </div>
  );
};

export default Gallery;
