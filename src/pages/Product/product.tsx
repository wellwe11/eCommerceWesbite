import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSetAtom } from "jotai";

import { activeProductAtom } from "@/atoms/productAtoms";

import useProductData from "@/hooks/useProductData";

// Create a Grid.
// 2nd grid container should have information. So thats price, dimensions, colors etc.
// All other grid containers should be the images of the product.

// Basic grid
const GridLayout = () => {};

// Sorter that places bio into 2nd grid-container
const GridSetup = () => {};

const Product = () => {
  const setAtom = useSetAtom(activeProductAtom);
  const { id } = useParams();
  const { product, isFetchingNull } = useProductData(id);

  // Cleans up atom on unmount
  useEffect(() => {
    console.log("Cleaning up Product page. Setting activeProductAtom to null");
    return () => setAtom(null);
  }, [setAtom]);

  if (!product) return <div>Loading...</div>;

  console.log(product);

  return (
    <div>
      <h1>This is the product page of product {product.id}</h1>
    </div>
  );
};

export default Product;
