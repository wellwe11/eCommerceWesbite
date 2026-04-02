import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSetAtom } from "jotai";

import { activeProductAtom } from "@/atoms/productAtoms";

import useProductData from "@/hooks/useProductData/useProductData";
import CustomCursor from "@components/ui/customCursor/customCursor";
import debounce from "@/functions/debounce/debounce";

// Next is to create a section for product-info, such as price, dimensions, colors etc.

// Create a class for the transitions of mouse and texts to minimise code
// Seperate components and isolate them from each other

const DirectionContainers = ({ handler }) => {
  return (
    <div className=" h-screen w-screen flex">
      <div className="w-full h-full flex-1" onClick={() => handler(+1)} />
      <div className="w-full h-full flex-1" onClick={() => handler(-1)} />
    </div>
  );
};

const CenteredText = ({
  activeIndex,
  imageArrayLength,
  name,
  mouseMoveClass,
}) => {
  // Will update and fix so that its fetched instead of being local
  const localText = {
    year: 2024,
    issue: "Issue 3 styled by Sarah Richardson",
    name,
  };

  return (
    <div className="bio-title pointer-events-none absolute top-[40%] inset-x-0 flex justify-between w-full px-10">
      <div className="flex gap-10">
        {Object.values(localText).map((text, index) => (
          <p
            key={index}
            className={`mix-blend-difference text-white ${mouseMoveClass}`}
          >
            {text}
          </p>
        ))}
      </div>

      <div>
        <p className={`mix-blend-difference text-white ${mouseMoveClass}`}>
          GRID {activeIndex < 10 ? 0 : ""}
          {activeIndex + 1} - 0{imageArrayLength}
        </p>
      </div>
    </div>
  );
};

// Sorter that places bio into 2nd grid-container
const GridSetup = ({ data }) => {
  const [displayCustomCursor, setDisplayCustomCursor] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mouseMove, setMouseMove] = useState(true);

  const imageArray = data.images;
  const imageArrayLength = imageArray.length;
  const { colors, height, width, price, name } = data;

  const mouseMoveClass = `transition-opacity duration-300 ease-in-out ${mouseMove ? "opacity-100" : "opacity-0"}`;

  const debounceMouseMove = useMemo(
    () =>
      debounce(() => {
        setMouseMove(false);
      }, 2000),
    [],
  );

  const handleMouseMove = () => {
    setMouseMove(true);
    debounceMouseMove();
  };

  const handleIncreaseIndex = () => {
    const nextIndex = (activeIndex + 1) % imageArray.length;
    setActiveIndex(nextIndex);
  };

  const handleDecreaseIndex = () => {
    const prevIndex = (activeIndex - 1 + imageArray.length) % imageArray.length;
    setActiveIndex(prevIndex);
  };

  return (
    <div onMouseMove={handleMouseMove} className="relative">
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
        {displayCustomCursor && (
          <div className={mouseMoveClass}>
            <CustomCursor />
          </div>
        )}
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

      <CenteredText
        mouseMoveClass={mouseMoveClass}
        mouseMove={mouseMove}
        activeIndex={activeIndex}
        imageArrayLength={imageArrayLength}
        name={name}
      />
    </div>
  );
};

const Product = () => {
  const setAtom = useSetAtom(activeProductAtom);
  const { id } = useParams();

  // Fetches placeholder data and updated data, caches it as 'product'
  const { product, isFetchingNull } = useProductData(id);

  console.log(product);

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
