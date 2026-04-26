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

const createDebounce = (fn) => debounce(fn, 2000);

// DirectionsContainer
// Generates a new link to navigate to another product
const getPath = (arr, currentIndex, direction) => {
  let newIndex;

  if (direction === "inc") {
    newIndex = arr[(currentIndex + 1) % arr.length].id;
  } else if (direction === "dec") {
    newIndex = arr[(currentIndex - 1 + arr.length) % arr.length]?.id;
  }

  return `/product/${newIndex}`;
};

const ExtendedProductInfo = () => {
  const activeArtist = useAtomValue(handleArtistAtom);
  const activeArt = useAtomValue(activeArtObj);

  if (!activeArtist || !activeArt) return;

  const { name: artistName, born, deceased, bio_art } = activeArtist;
  const { name: artName, height, width, price, year } = activeArt;

  const artist = [artistName, `${born} - ${deceased}`, bio_art];
  const art = [artName, year, `${height} x ${width}`, price];

  return (
    <div className="flex flex-col gap-10">
      <div>
        {artist.map((val, i) => (
          <p key={i} className="capitalize">
            {val}
          </p>
        ))}
      </div>

      <div className="border-b border-gray-200" />

      <div>
        {art.map((val, i) => (
          <p key={i} className="">
            {val}
          </p>
        ))}
      </div>
    </div>
  );
};

const DirectionContainers = () => {
  const artArray = useAtomValue(handleArtAtom);
  const activeArt = useAtomValue(activeArtObj);
  const id = +activeArt?.id;

  if (!artArray || !id) return;

  const currentIndex = artArray?.findIndex((item) => +item?.id === id);

  if (currentIndex != 0 && !currentIndex) return;

  return (
    <div className="h-full w-full flex">
      <LinkWrapper
        classes="w-full h-full flex-1 cursor-none"
        to={getPath(artArray, currentIndex, "dec")}
      />
      <LinkWrapper
        classes="w-full h-full flex-1 cursor-none"
        to={getPath(artArray, currentIndex, "inc")}
      />
    </div>
  );
};

const CenteredText = () => {
  const [displayCursor, handleCursor] = useAtom(handleCustomCursor);
  const activeIndex = useAtomValue(handleActiveArtistAtom);
  const artArray = useAtomValue(handleArtAtom);
  const activeArt = useAtomValue(activeArtObj);
  const activeArtist = useAtomValue(handleArtistAtom);
  const [displayGrid, setDisplayGrid] = useAtom(handleDisplayGridAtom);

  if (!activeArtist) return;

  const { year, name: artName } = activeArt;
  const { name: artistName } = activeArtist;

  return (
    <div
      className="w-full"
      onMouseEnter={() => {
        setDisplayGrid(true);
        handleCursor(false);
      }}
      onMouseLeave={() => setDisplayGrid(false)}
      onClick={() => setDisplayGrid(false)}
    >
      {!displayGrid && (
        <div className="flex justify-between w-full py-5">
          <div className="flex gap-10 pointer-events-auto">
            <p
              className={`mix-blend-difference text-white pointer-events-none transition-opacity duration-[400ms] ease-in-out flex gap-5 ${
                displayCursor ? "opacity-100" : "opacity-0"
              }`}
            >
              <span>
                Issue <span className="italic">{artName}</span>
              </span>
              <span>by {artistName}</span>
              <span>{year}</span>
            </p>
          </div>

          <div className="pointer-events-auto">
            <p
              className={`mix-blend-difference text-white pointer-events-none transition-opacity duration-[400ms] ease-in-out flex gap-5 ${
                displayCursor ? "opacity-100" : "opacity-0"
              }`}
            >
              <span>GRID</span>
              <span>
                {artArray.length < 10 ? 0 : ""}
                {activeIndex + 1} - 0{artArray.length}
              </span>
            </p>
          </div>
        </div>
      )}

      {displayGrid && (
        <div className="flex justify-between w-full px-10 pointer-events-auto">
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
              <div className="w-full text-center">
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
  const displayGrid = useAtomValue(handleDisplayGridAtom);

  // The active object based on index
  const data = useAtomValue(activeArtObj);

  if (!data) return;

  return (
    <div>
      <section className="relative w-full flex justify-center">
        <div className="h-screen py-5">
          <img
            className={`h-full w-auto object-contain block ${displayGrid ? "opacity-10 blur-md" : "opacity-100"} transition-opacity duration-200 ease`}
            src={data.src}
            alt=""
          />
        </div>
      </section>

      <section>
        <ExtendedProductInfo />
      </section>
    </div>
  );
};

const Product = () => {
  const { id } = useParams();

  // Fetches placeholder data and updated data, caches it as 'product'
  const data = useProductData(id);
  const handleCursor = useSetAtom(handleCustomCursor);
  const displayGrid = useAtomValue(handleDisplayGridAtom);

  const setCount = useSetAtom(setCountAtom);
  const setArtArray = useSetAtom(handleArtAtom);
  const setArtist = useSetAtom(handleArtistAtom);

  const debounceMouseMove = useMemo(
    () => createDebounce(() => handleCursor(false)),
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
      {/* This is for grid-setup which will update the image and the extended-product info */}
      <Outlet />

      <nav
        className="monitor-width cursor-none absolute left-0 right-0 top-0 h-screen h-max-[100%] grid grid-colrs-1 grid-rows-1 place-items-center"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => handleCursor(false)}
      >
        <div className="inset-0 col-start-1 row-start-1 flex flex-col items-center justify-center pointer-events-auto w-full h-full">
          <DirectionContainers />
        </div>

        <div className="bio-title col-start-1 row-start-1 inset-x-0 h-full w-full flex justify-center items-center pointer-events-none">
          <CenteredText />
        </div>
        <CustomCursor displayOnload={true} />
      </nav>
    </main>
  );
};

export default Product;
