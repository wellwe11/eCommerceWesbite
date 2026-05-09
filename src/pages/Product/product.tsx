import { useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { motion } from "framer-motion";

import useProductData from "@/hooks/useProductData/useProductData";
import CustomCursor from "@/components/ui/customCursor/customCursor";
import debounce from "@/functions/debounce/debounce";

import handleCustomCursor from "@/atoms/customCursor/customCursor";
import LinkWrapper from "@/components/ui/Link/link";
import useKeyboard from "@/hooks/useKeyboard/useKeyboard";
import {
  handleArtArrAtom,
  handleArtistAtom,
  handleDisplayGridAtom,
  handleActiveArtAtom,
  handleProductAction,
  productAtom,
} from "@/atoms/product/productAtom";

const createDebounce = (fn) => debounce(fn, 2000);

// DirectionsContainer
// Generates a new link to navigate to another product
const getPath = (arr, currentIndex, direction) => {
  let newIndex;

  if (direction === "inc") {
    newIndex = arr[(currentIndex + 1) % arr.length]?.id;
  } else if (direction === "dec") {
    newIndex = arr[(currentIndex - 1 + arr.length) % arr.length]?.id;
  }

  return `/product/${newIndex}`;
};

const ExtendedProductInfo = () => {
  const activeArtist = useAtomValue(handleArtistAtom);
  const activeArt = useAtomValue(handleActiveArtAtom);

  if (!activeArtist || !activeArt) return;

  const { name: artistName, born, deceased, country } = activeArtist;
  const {
    name: artName,
    year,
    description,
    height,
    width,
    price,
    exhibitions,
    literature,
  } = activeArt;

  const productInfo = {
    title: `${artName}, ${year}`,
    info: [description, `${width} x ${height} cm`, `${price} €`],
  };

  const extendedInfo = [
    { title: "exhibitions", info: exhibitions },
    { title: "literature", info: literature },
  ];

  return (
    <div className="flex flex-col gap-10 w-fi border-t border-b border-gray-200 py-2">
      <ul className="flex flex-col">
        <li>
          <span className="large-text font-extralight uppercase">
            {artistName}
          </span>
          <span className="medium-text font-extralight uppercase pl-2">
            {country},
          </span>
        </li>

        <li>
          <span className="small-text font-extralight">
            {born} {deceased ? "- " + deceased : ""}
          </span>
        </li>
      </ul>

      <ul className="flex flex-col gap-5">
        <li className="flex flex-col gap-1">
          <span className="medium-text uppercase">{productInfo.title}</span>

          {productInfo.info.map((text, i) => (
            <span key={i} className="small-text font-extralight">
              {text}
            </span>
          ))}
        </li>

        <button className="w-fit p-3 cursor-pointer flex-1 flex items-center justify-center bg-gray-100/100 hover:bg-gray-50/50 hover:backdrop-blur-xs transition-colors duration 400 ease pointer-events-auto">
          <p className="medium-text font-extralight">Add to cart</p>
        </button>

        {extendedInfo.map(
          ({ title, info }, index) =>
            info &&
            info.length > 0 && (
              <li key={index} className="flex flex-col">
                <span className="medium-text uppercase font-extralight">
                  {title}
                </span>

                <div className="flex">
                  {info.map((e, i) => (
                    <span key={i} className="small-text font-extralight">
                      {e}
                      {i !== info.length - 1 ? (
                        <span className="text-gray-400 px-1">│</span>
                      ) : (
                        ""
                      )}
                    </span>
                  ))}
                </div>
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

const DirectionContainers = () => {
  const artArray = useAtomValue(handleArtArrAtom);
  const activeArt = useAtomValue(handleActiveArtAtom);

  const id = +activeArt?.id;
  const [isInView, setIsInView] = useState(false);
  const navigate = useNavigate();

  const currentIndex = artArray?.findIndex((item) => +item?.id === id);

  useKeyboard(
    {
      ArrowRight: () => navigate(getPath(artArray, currentIndex, "inc")),
      ArrowLeft: () => navigate(getPath(artArray, currentIndex, "dec")),
    },
    isInView,
  );

  return (
    <motion.div
      className="h-full w-full flex"
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
    >
      <LinkWrapper
        classes="w-full h-full flex-1 cursor-none"
        to={getPath(artArray, currentIndex, "dec")}
      />
      <LinkWrapper
        classes="w-full h-full flex-1 cursor-none"
        to={getPath(artArray, currentIndex, "inc")}
      />
    </motion.div>
  );
};

const CenteredText = () => {
  const [displayCursor, handleCursor] = useAtom(handleCustomCursor);

  const { artArray, artist, currentIndex, displayGrid } =
    useAtomValue(productAtom);
  const activeArt = useAtomValue(handleActiveArtAtom);

  const setDisplayGrid = useSetAtom(handleProductAction);

  if (!artist) return;

  const { year, name: artName } = activeArt;
  const { name: artistName } = artist;

  return (
    <div
      className="w-full"
      onMouseEnter={() => {
        setDisplayGrid({ type: "TOGGLE_GRID", payload: true });
        handleCursor(false);
      }}
      onMouseLeave={() =>
        setDisplayGrid({ type: "TOGGLE_GRID", payload: false })
      }
      onClick={() => setDisplayGrid({ type: "TOGGLE_GRID", payload: false })}
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
                {currentIndex + 1} - 0{artArray.length}
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
                  <p className="cursor-pointer w-full p-5 py-15">{index + 1}</p>
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
  const data = useAtomValue(handleActiveArtAtom);

  if (!data) return;

  return (
    <div className="relative">
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

  const dispatch = useSetAtom(handleProductAction);

  const displayGrid = useAtomValue(handleDisplayGridAtom);

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
    const initialIndex = art.findIndex((obj) => obj?.id == id);

    dispatch({
      type: "INIT",
      payload: {
        art,
        artist: artistData,
        index: initialIndex,
      },
    });
  }, [data, id]);

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
