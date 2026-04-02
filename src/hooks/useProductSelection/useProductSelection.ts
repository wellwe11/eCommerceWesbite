import { useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { activeProductAtom } from "@/atoms/productAtoms";

// Sets atom to currently selected product and navigates to page with product id
const useProductSelection = () => {
  const setProduct = useSetAtom(activeProductAtom);
  const navigate = useNavigate();

  const selectProducts = (productSummary: any) => {
    setProduct(productSummary);

    navigate(`/product/${productSummary.id}`);
  };

  return selectProducts;
};

export default useProductSelection;
