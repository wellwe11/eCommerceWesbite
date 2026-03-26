import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSetAtom } from "jotai";

import { activeProductAtom } from "@/atoms/productAtoms";

import useProductData from "@/hooks/useProductData";
import CustomCursor from "@components/ui/customCursor";

// When user has not moved mouse for about 2 seconds, remove texts & cursor, so the image sits by itself (ofc with navbar active)
// Next is to create a section for product-info, such as price, dimensions, colors etc.

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

  // Name of collection, amount of art from a specific artist, year of release
  // GRID - current index out of max index

  return (
    <div className="relative">
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

      <section className="flex justify-center gap-15 h-45">
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

      <div className="bio-title absolute top-[40%] inset-x-0 flex justify-between w-full px-10">
        <div className="flex gap-10">
          <p className="mix-blend-difference text-white">2024</p>
          <p className="mix-blend-difference text-white">
            Issue 3 styled by Sarah Richardson
          </p>
          <p className="bio-title mix-blend-difference text-white">{name}</p>
        </div>

        <div>
          <p className="mix-blend-difference text-white">
            GRID {activeIndex < 10 ? 0 : ""}
            {activeIndex + 1} - 0{imageArray.length + 1}
          </p>
        </div>
      </div>
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
