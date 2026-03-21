import { useSetAtom } from "jotai";
import { activeProductAtom } from "@/atoms/productAtoms";
import useProductData from "@/hooks/useProductData";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

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
  // Add logic if user refreshes page

  return (
    <div>
      <h1>This is the product page of product {product.id}</h1>
    </div>
  );
};

export default Product;
