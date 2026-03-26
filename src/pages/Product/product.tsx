import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSetAtom } from "jotai";

import { activeProductAtom } from "@/atoms/productAtoms";

import useProductData from "@/hooks/useProductData";
import CustomCursor from "@components/ui/customCursor";

// Beyond noise        Issue 3 styled by Sarah Richardson     2024                          GRID 0-9

const DirectionContainers = ({ handler }) => {
  return (
    <div className=" h-screen w-screen fixed flex">
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

  console.log(activeIndex);

  const { colors, height, width, price, name } = data;
  const bio = [colors, height, width, price, name];

  return (
    <div className="">
      {/**Will abstract. This is the 'head' section */}
      <section
        className="cursor-none w-full flex justify-center"
        onMouseEnter={() => setDisplayCustomCursor(true)}
        onMouseLeave={() => setDisplayCustomCursor(false)}
      >
        <div className="fixed inset-0 flex flex-col items-center justify-center">
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
    </div>
    // <div className="flex w-full flex-wrap justify-center items-center gap-y-7">

    //   <div className="grid grid-cols-[repeat(2,clamp(100px,30vw,400px))] pt-30 justify-center justify-items-center w-full gap-x-10">
    //     <div className={flexWrap}>
    //       <img
    //         src={imageOne.src || imageOne}
    //         alt=""
    //         className="object-center w-[clamp(100px,30vw,400px)] h-full"
    //       />
    //     </div>
    //     <div className={flexWrap}>
    //       {bio.map((item, i) => (
    //         <p key={i}>{item}</p>
    //       ))}
    //     </div>
    //   </div>

    //   <div className="grid grid-cols-[repeat(2,clamp(100px,30vw,400px))] justify-center justify-items-center w-full gap-y-7 gap-x-10">
    //     {restImages.map((image, i) => (
    //       <div className={flexWrap} key={i}>
    //         <img
    //           src={image.src || image}
    //           alt=""
    //           className="object-center w-full h-full"
    //         />
    //       </div>
    //     ))}
    //   </div>
    // </div>
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
