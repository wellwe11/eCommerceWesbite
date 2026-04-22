import { Activity, useEffect, useMemo, useState } from "react";
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
} from "@/atoms/product/activeArtistAtom";
import handleCustomCursor from "@/atoms/customCursor/customCursor";

// Next is to create a section for product-info, such as price, dimensions, colors etc.

// Create a class for the transitions of mouse and texts to minimise code
// Seperate components and isolate them from each other

const DirectionContainers = () => {
  const updateArtObjIndex = useSetAtom(handleActiveArtistAtom);

  return (
    <div className=" h-screen w-screen flex">
      <div
        className="w-full h-full flex-1"
        onClick={() => updateArtObjIndex("inc")}
      />
      <div
        className="w-full h-full flex-1"
        onClick={() => updateArtObjIndex("dec")}
      />
    </div>
  );
};

const CenteredText = ({ name }) => {
  // Will update and fix so that its fetched instead of being local
  const localText = {
    year: 2024,
    issue: "Issue 3 styled by Sarah Richardson",
    name,
  };

  const displayCursor = useAtomValue(handleCustomCursor);
  const activeIndex = useAtomValue(handleActiveArtistAtom);
  const artArray = useAtomValue(handleArtAtom);
  const activeArt = useAtomValue(activeArtObj);
  const activeArtist = useAtomValue(handleArtistAtom);

  const { year, name: artName } = activeArt;
  const { name: artistName } = activeArtist;

  const text = `Issue ${artName} by ${artistName} - ${year}`;

  return (
    <Activity mode={displayCursor ? "visible" : "hidden"}>
      <div className="bio-title pointer-events-none absolute top-[40%] inset-x-0 flex justify-between w-full px-10">
        <div className="flex gap-10">
          <p className={`mix-blend-difference text-white pointer-events-none`}>
            {text}
          </p>
        </div>

        <div>
          <p className={`mix-blend-difference text-white pointer-events-none`}>
            GRID {artArray.length < 10 ? 0 : ""}
            {activeIndex + 1} - 0{artArray.length}
          </p>
        </div>
      </div>
    </Activity>
  );
};

// Sorter that places bio into 2nd grid-container
const GridSetup = () => {
  // Handler for which atom is currently active
  const [activeArtObjIndex, updateArtObjIndex] = useAtom(
    handleActiveArtistAtom,
  );
  const handleCursor = useSetAtom(handleCustomCursor);

  // The active object based on index
  const data = useAtomValue(activeArtObj);

  // const mouseMoveClass = `transition-opacity duration-300 ease-in-out ${mouseMove ? "opacity-100" : "opacity-0"}`;

  const debounceMouseMove = useMemo(
    () =>
      debounce(() => {
        handleCursor(false);
      }, 2000),
    [],
  );

  const handleMouseMove = () => {
    handleCursor(true);
    debounceMouseMove();
  };

  if (!data) return;

  const { name, collectionId } = data;

  return (
    <div onMouseMove={handleMouseMove} className="relative">
      <section
        className="relative cursor-none w-full flex justify-center"
        onMouseEnter={() => handleCursor(true)}
        onMouseLeave={() => handleCursor(false)}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <DirectionContainers />
        </div>
        <div className="h-screen py-5">
          <img
            className="h-full w-auto object-contain block"
            src={data.src}
            alt=""
          />
        </div>

        <CustomCursor />
      </section>

      <CenteredText
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
