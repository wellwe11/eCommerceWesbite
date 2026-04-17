import { useAtom } from "jotai";
import { activeProductAtom } from "@/atoms/productAtoms";

import { useGlobalProducts } from "../useGlobalData/useGlobalData";

// Hook fetches new product while actively displaying data taken from the interaction of clicking a product.
// This means, user clicks a product, some minor data about the product is then displayed via jotai context, while more data is fetched in the background.
const useProductData = (id: string) => {
  const [preview] = useAtom(activeProductAtom);

  const { data } = useGlobalProducts(({ imagesData, artistsHash }) => {
    const targetId = +id;
    const artObj = imagesData.get(targetId);

    if (!artObj) return null;

    const artistObj = artistsHash.get(artObj.artist_id);

    return { artObj, artistObj };
  });

  if (data) return data;
  if (preview) return { artObj: preview, artistObj: null };

  return null;
};

export default useProductData;
