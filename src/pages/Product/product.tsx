import { useEffect, useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";

import CenteredText from "./components/centeredText/centeredText";
import DirectionContainers from "./components/directionContainers/directionContainers";
import ExtendedProductInfo from "./components/extendedProductInfo/extendedProductInfo";
import CustomCursor from "@/components/ui/customCursor/customCursor";

import useProductData from "@/hooks/useProductData/useProductData";

import debounce from "@/functions/debounce/debounce";

import handleCustomCursor from "@/atoms/customCursor/customCursor";
import {
  handleActiveArtAtom,
  handleDisplayGridAtom,
  handleProductAction,
} from "@/atoms/product/productAtom";

const createDebounce = (fn) => debounce(fn, 2000);

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
