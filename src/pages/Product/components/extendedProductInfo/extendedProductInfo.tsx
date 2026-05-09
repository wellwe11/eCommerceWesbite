import { useAtomValue } from "jotai";

import {
  handleActiveArtAtom,
  handleArtistAtom,
} from "@/atoms/product/productAtom";

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

export default ExtendedProductInfo;
