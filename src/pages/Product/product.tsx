import { useEffect, useMemo } from "react";
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
  handleDisplayGridAtom,
  setCountAtom,
} from "@/atoms/product/activeArtistAtom";
import handleCustomCursor from "@/atoms/customCursor/customCursor";

// Scrolling down should show basic info about this piece such as price, dimensions, etc.
// Hovering the text in the middle should show a grid of other art from arist, together with a grid from index 0 - arr.length

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

const CenteredText = () => {
  const [displayCursor, handleCursor] = useAtom(handleCustomCursor);
  const activeIndex = useAtomValue(handleActiveArtistAtom);
  console.log(activeIndex);
  const setCount = useSetAtom(setCountAtom);
  const artArray = useAtomValue(handleArtAtom);
  const activeArt = useAtomValue(activeArtObj);
  const activeArtist = useAtomValue(handleArtistAtom);
  const [displayGrid, setDisplayGrid] = useAtom(handleDisplayGridAtom);

  if (!activeArtist) return;

  const { year, name: artName } = activeArt;
  const { name: artistName } = activeArtist;

  const text = `Issue ${artName}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 by ${artistName}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${year}`;
  const gridText = `GRID \u00A0\u00A0\u00A0 ${artArray.length < 10 ? 0 : ""}${activeIndex + 1} - 0${artArray.length}`;

  return (
    <div
      className="bio-title absolute top-0 inset-x-0 h-full w-full flex justify-center items-center pointer-events-none"
      onMouseLeave={() => {
        setDisplayGrid(false);
        handleCursor(true);
      }}
    >
      {!displayGrid && (
        <div className="flex justify-between w-full px-10 pointer-events-auto">
          <div
            className="flex gap-10"
            onMouseEnter={() => {
              setDisplayGrid(true);
              handleCursor(false);
            }}
          >
            <p
              className={`mix-blend-difference text-white pointer-events-none transition-opacity duration-[400ms] ease-in-out ${
                displayCursor ? "opacity-100" : "opacity-0"
              }`}
            >
              {text}
            </p>
          </div>

          <div
            onMouseEnter={() => {
              setDisplayGrid(true);
              handleCursor(false);
            }}
          >
            <p
              className={`mix-blend-difference text-white pointer-events-none transition-opacity duration-[400ms] ease-in-out ${
                displayCursor ? "opacity-100" : "opacity-0"
              }`}
            >
              {gridText}
            </p>
          </div>
        </div>
      )}

      {displayGrid && (
        <div
          className="flex justify-between w-full px-10 pointer-events-auto"
          onMouseLeave={() => {
            handleCursor(true);
            setDisplayGrid(false);
          }}
        >
          {artArray.map((obj, index) => (
            <div
              key={index}
              className="group w-full h-full flex justify-center items-center"
            >
              <img
                src={obj.src}
                alt=""
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease absolute top-25 w-25"
              />
              <div
                className="w-full text-center"
                onClick={() => {
                  setCount(index);
                  setDisplayGrid(false);
                  handleCursor(true);
                }}
              >
                <p className="cursor-pointer w-full">{index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Sorter that places bio into 2nd grid-container
const GridSetup = () => {
  const handleCursor = useSetAtom(handleCustomCursor);
  const [displayGrid, setDisplayGrid] = useAtom(handleDisplayGridAtom);

  // The active object based on index
  const data = useAtomValue(activeArtObj);

  const debounceMouseMove = useMemo(
    () =>
      debounce(() => {
        handleCursor(false);
      }, 2000),
    [],
  );

  const handleMouseMove = () => {
    if (!displayGrid) {
      handleCursor(true);
      debounceMouseMove();
    } else {
      handleCursor(false);
    }
  };

  if (!data) return;

  return (
    <div onMouseMove={handleMouseMove} className="relative cursor-none">
      <section
        className="relative w-full flex justify-center"
        onMouseEnter={() => handleCursor(true)}
        onMouseLeave={() => handleCursor(false)}
        onClick={() => handleCursor(true)}
      >
        <div className="h-screen py-5">
          <img
            className={`h-full w-auto object-contain block ${displayGrid ? "opacity-10" : "opacity-100"} transition-opacity duration-200 ease`}
            src={data.src}
            alt=""
          />
        </div>
      </section>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto">
        <DirectionContainers />
      </div>
      <CenteredText />
      <CustomCursor />
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
    <main className="relative">
      <GridSetup />
    </main>
  );
};

export default Product;
