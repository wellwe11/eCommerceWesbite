import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSetAtom } from "jotai";

import { activeProductAtom } from "@/atoms/productAtoms";

import useProductData from "@/hooks/useProductData";

// Create a Grid.
// 2nd grid container should have information. So thats price, dimensions, colors etc.
// All other grid containers should be the images of the product.

// Sorter that places bio into 2nd grid-container
const GridSetup = ({ data }) => {
  console.log(data);

  const images = data.images;
  const imageOne = images[0];

  const { colors, height, width, price, name } = data;
  const bio = [colors, height, width, price, name];
  const restImages = images.slice(1);

  console.log(imageOne, restImages);

  // Store imageOne in one container with class flexWrap
  // Store bio in another container with class flexWrap
  // Store restImages inside of a map, with each item having class flexWrap

  const flexWrap = "w-full h-full overflow-hidden";

  return (
    <div className="flex w-full flex-wrap justify-center items-center gap-y-7">
      <div className="grid grid-cols-[repeat(2,clamp(100px,30vw,400px))] pt-30 justify-center justify-items-center w-full gap-x-10">
        <div className={flexWrap}>
          <img
            src={imageOne.src}
            alt=""
            className="object-center w-[clamp(100px,30vw,400px)] h-full"
          />
        </div>
        <div className={flexWrap}>
          {bio.map((item) => (
            <p>{item}</p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[repeat(2,clamp(100px,30vw,400px))] justify-center justify-items-center w-full gap-y-7 gap-x-10">
        {restImages.map((image, i) => (
          <div className={flexWrap} key={i}>
            <img
              src={image.src}
              alt=""
              className="object-center w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Product = () => {
  const setAtom = useSetAtom(activeProductAtom);
  const { id } = useParams();

  // Fetches placeholder data and updated data, caches it as 'product'
  const { product, isFetchingNull } = useProductData(id);

  // Cleans up atom on unmount
  useEffect(() => {
    return () => {
      console.log(
        "Cleaning up Product page. Setting activeProductAtom to null",
      );
      setAtom(null);
    };
  }, [setAtom]);

  if (!product) return <div>Loading...</div>;

  return (
    <main>
      <h1>This is the product page of product {product.id}</h1>
      <GridSetup data={product} />
    </main>
  );
};

export default Product;
