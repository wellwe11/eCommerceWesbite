import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSetAtom } from "jotai";

import { activeProductAtom } from "@/atoms/productAtoms";

import useProductData from "@/hooks/useProductData";
import CustomCursor from "@components/ui/customCursor";

// Beyond noise        Issue 3 styled by Sarah Richardson     2024                          GRID 0-9

const DirectionContainers = ({ handler }) => {
  return (
    <div className=" h-screen w-screen flex">
      <div className="w-full h-full flex-1" onClick={() => handler(+1)} />
      <div className="w-full h-full flex-1" onClick={() => handler(-1)} />
    </div>
  );
};

// Sorter that places bio into 2nd grid-container
const GridSetup = ({ data }) => {
  const imageArray = data.images;
  const [displayCustomCursor, setDisplayCustomCursor] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIncreaseIndex = () => {
    const nextIndex = (activeIndex + 1) % imageArray.length;
    setActiveIndex(nextIndex);
  };

  const handleDecreaseIndex = () => {
    const prevIndex = (activeIndex - 1 + imageArray.length) % imageArray.length;
    setActiveIndex(prevIndex);
  };

  const { colors, height, width, price, name } = data;
  const bio = [colors, height, width, price, name];

  return (
    <div>
      {/**Will abstract. This is the 'head' section */}
      <section
        className="relative cursor-none w-full flex justify-center"
        onMouseEnter={() => setDisplayCustomCursor(true)}
        onMouseLeave={() => setDisplayCustomCursor(false)}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <DirectionContainers
            handler={(e) => {
              if (displayCustomCursor) {
                if (e > 0) {
                  handleDecreaseIndex();
                } else {
                  handleIncreaseIndex();
                }
              }
            }}
          />
        </div>
        <div className="h-screen py-5">
          <img
            className="h-full w-auto object-contain block"
            src={imageArray[activeIndex].src}
            alt=""
          />
        </div>
        {displayCustomCursor && <CustomCursor />}
      </section>

      <section className="flex justify-center gap-15 h-45 z-200">
        {imageArray.map((obj, index) => (
          <img
            src={obj.src}
            alt=""
            key={index}
            className="cursor-pointer"
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </section>
    </div>
  );
};

const Product = () => {
  const setAtom = useSetAtom(activeProductAtom);
  const { id } = useParams();

  // Fetches placeholder data and updated data, caches it as 'product'
  const { product, isFetchingNull } = useProductData(id);

  // Cleans up atom on unmount
  // Currently disabled because strict mode forces it to run regardless
  useEffect(() => {
    return () => {
      console.log(
        "Cleaning up Product page. Setting activeProductAtom to null",
      );
      // setAtom(null);
    };
  }, [setAtom]);

  if (!product) return <div>Loading...</div>;

  return (
    <main>
      <GridSetup data={product} />
    </main>
  );
};

export default Product;
