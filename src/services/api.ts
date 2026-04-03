import axios from "axios";
import type { ProductData } from "@/types/product";

import artists from "./artistsData.json";
import collections from "./collectionsData.json";
import images from "./imagesData.json";

export const api = {
  // function which relates art to artists
  sortByArtist: (id) => {
    // Simulate fetch-timer
    await new Promise((resolve) => setTimeout(resolve, 500));
  },
};

const fetchData = async (path: string): Promise<ProductData[]> => {
  try {
    const { data } = await axios.get<ProductData[]>(path);
    return data;
  } catch (err) {
    throw new Error(`Error fetching data for ${path}: ${err}`);
  }
};

export default fetchData;
