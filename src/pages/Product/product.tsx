import { useAtomValue } from "jotai";
import { activeProductAtom } from "@/atoms/productAtoms";
import useProductData from "@/hooks/useProductData";

const Product = () => {
  const productAtom = useAtomValue(activeProductAtom);
  if (!productAtom) return <p>No product</p>;

  const productId = productAtom.id;

  const { product, isFetchingNull } = useProductData(productId);

  return (
    <div>
      <h1>This is the product page of product {productId}</h1>
    </div>
  );
};

export default Product;
