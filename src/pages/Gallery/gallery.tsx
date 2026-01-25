import { useRef, useState, useEffect } from "react";
import Product from "./components/product";
import type { ProductData } from "../../app/App";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import fetchGallery from "../../services/api";

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
    <motion.div className="grid grid-cols-[repeat(3,clamp(100px,18vw,350px))] pt-30 justify-center justify-items-center w-full gap-y-7 gap-x-10">
      {data.map((obj, index) => (
        <Product key={`product_${index}`} data={obj} />
      ))}
    </motion.div>
  );
};

const Gallery = () => {
  const [items, setItems] = useState(9);

  const { data, isLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: () => fetchGallery("/galleryData.json"),

    select: (data) => ({
      items: data.slice(0, items),
      total: data.length,
    }),
  });

  const loadMore = () => {
    if (!data || !items) return;

    setItems((prev) => prev + 9);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (!data) return <h1>Failed to fetch data</h1>;

  return (
    <div className="">
      <Products data={data.items} />

      {data && items < data.total && <LoadMoreEl setter={loadMore} />}
    </div>
  );
};

export default Gallery;
