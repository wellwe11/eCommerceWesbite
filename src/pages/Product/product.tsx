import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import useProductData from "@/hooks/useProductData/useProductData";
import CustomCursor from "@/components/ui/customCursor/customCursor";
import debounce from "@/functions/debounce/debounce";
import {
  activeArtObj,
  handleActiveArtistAtom,
  handleArtAtom,
  handleArtistAtom,
  setCountAtom,
} from "@/atoms/activeArtistAtom";

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
const GridSetup = () => {
  const [displayCustomCursor, setDisplayCustomCursor] = useState(true);
  const [mouseMove, setMouseMove] = useState(true);

  // Handler for which atom is currently active
  const [activeArtObjIndex, updateArtObjIndex] = useAtom(
    handleActiveArtistAtom,
  );

  // The active object based on index
  const data = useAtomValue(activeArtObj);

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

  const handleMouseClick = (e) => {
    {
      if (displayCustomCursor) {
        if (e > 0) {
          updateArtObjIndex("inc");
        } else {
          updateArtObjIndex("dec");
        }
      }
    }
  };

  if (!data) return;

  const { name, collectionId } = data;

  return (
    <div onMouseMove={handleMouseMove} className="relative">
      <section
        className="relative cursor-none w-full flex justify-center"
        onMouseEnter={() => setDisplayCustomCursor(true)}
        onMouseLeave={() => setDisplayCustomCursor(false)}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <DirectionContainers handler={handleMouseClick} />
        </div>
        <div className="h-screen py-5">
          <img
            className="h-full w-auto object-contain block"
            src={data.src}
            alt=""
          />
        </div>
        {displayCustomCursor && (
          <div className={mouseMoveClass}>
            <CustomCursor />
          </div>
        )}
      </section>

      <CenteredText
        mouseMoveClass={mouseMoveClass}
        mouseMove={mouseMove}
        activeIndex={activeArtObjIndex}
        imageArrayLength={data.length}
        name={name}
      />
    </div>
  );
};

const Product = () => {
  const { id } = useParams();

  // Fetches placeholder data and updated data, caches it as 'product'
  const data = useProductData(id);

  const setCount = useSetAtom(setCountAtom);
  const setArtArray = useSetAtom(handleArtAtom);
  const setArtist = useSetAtom(handleArtistAtom);

  useEffect(() => {
    if (!data) return;

    const { art, ...artistData } = data.artistObj;

    setArtist(artistData);
    setArtArray(art);

    const initialIndex = art.findIndex((obj) => obj?.id == id);
    setCount(initialIndex);
  }, [data]);

  if (!data) return <div>Loading...</div>;

  return (
    <main>
      <GridSetup />
    </main>
  );
};

export default Product;
