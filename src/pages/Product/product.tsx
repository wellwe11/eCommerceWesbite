import { useEffect, useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
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
import LinkWrapper from "@/components/ui/Link/link";

// navigate to another product-page when user clicks another item (set jotai-context to this obj before loading new page. Use custom <navLink> or whatever i called it)
// Scrolling down should show basic info about this piece such as price, dimensions, etc. This should be inside of GridSetup so that router navigates correctly to new info
// add debouncer to display middle-text
// fix cursor

const DirectionContainers = () => {
  const updateArtObjIndex = useSetAtom(handleActiveArtistAtom);
  const [displayCursor, handleCursor] = useAtom(handleCustomCursor);
  return (
    <div
      className=" h-screen w-screen flex"
      onMouseEnter={() => handleCursor(true)}
    >
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
  const setCount = useSetAtom(setCountAtom);
  const artArray = useAtomValue(handleArtAtom);
  const activeArt = useAtomValue(activeArtObj);
  const activeArtist = useAtomValue(handleArtistAtom);
  const [displayGrid, setDisplayGrid] = useAtom(handleDisplayGridAtom);

  if (!activeArtist) return;

  const { year, name: artName } = activeArt;
  const { name: artistName } = activeArtist;

  const text = (
    <div className="flex gap-10">
      <span>
        Issue <span className="italic">{artName}</span>
      </span>
      <span>by {artistName}</span>
      <span>{year}</span>
    </div>
  );

  const gridText = (
    <div className="flex gap-5">
      <span>GRID</span>
      <span>
        {artArray.length < 10 ? 0 : ""}
        {activeIndex + 1} - 0{artArray.length}
      </span>
    </div>
  );

  return (
    <div
      className="bio-title absolute top-0 inset-x-0 h-full w-full flex justify-center items-center pointer-events-none"
      onMouseLeave={() => {
        setDisplayGrid(false);
        handleCursor(true);
      }}
    >
      {!displayGrid && (
        <div className="flex justify-between w-full px-10 pointer-events-auto p-5">
          <div
            className="flex gap-10"
            onMouseMove={() => {
              if (displayCursor) {
                setDisplayGrid(true);
              }
            }}
            onMouseLeave={() => handleCursor(true)}
            onMouseEnter={() => handleCursor(false)}
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
            onMouseMove={() => {
              if (displayCursor) {
                setDisplayGrid(true);
              }
            }}
            onMouseLeave={() => handleCursor(true)}
            onMouseEnter={() => handleCursor(false)}
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
                  handleCursor(false);
                }}
              >
                <LinkWrapper to={`/product/${obj.id}`}>
                  <p className="cursor-pointer w-full p-5">{index + 1}</p>
                </LinkWrapper>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Sorter that places bio into 2nd grid-container
export const GridSetup = () => {
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
    <div
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseMove}
    >
      <section
        className="relative w-full flex justify-center"
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
      <Outlet />

      <div className="cursor-none">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto">
          <DirectionContainers />
        </div>

        <CustomCursor />
        <CenteredText />
      </div>
    </main>
  );
};

export default Product;
