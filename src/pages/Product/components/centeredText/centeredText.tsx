import { useAtom, useAtomValue, useSetAtom } from "jotai";

import handleCustomCursor from "@/atoms/customCursor/customCursor";
import {
  handleActiveArtAtom,
  handleProductAction,
  productAtom,
} from "@/atoms/product/productAtom";

import LinkWrapper from "@/components/ui/Link/link";

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

export default CenteredText;
