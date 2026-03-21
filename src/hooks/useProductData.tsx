import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { activeProductAtom } from "@/atoms/productAtoms";
import fetchProductById from "@/services/fetchProductById";

// Hook fetches new product while actively displaying data taken from the interaction of clicking a product.
// This means, user clicks a product, some minor data about the product is then displayed via jotai context, while more data is fetched in the background.
const useProductData = (id: string) => {
  const [preview] = useAtom(activeProductAtom);

  const { data: fullData, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    placeholderData: preview?.id === id ? preview : undefined,
  });

  return {
    product: fullData | preview,
    isFetchingNull: isLoading,
  };
};

export default useProductData;
