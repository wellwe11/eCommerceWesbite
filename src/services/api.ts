import axios from "axios";
import type { ProductData } from "src/app/App";

const fetchGallery = async (path: string): Promise<ProductData[]> => {
  try {
    const { data } = await axios.get<ProductData[]>(path);
    return data;
  } catch (err) {
    throw new Error(`Error fetching data for ${path}: ${err}`);
  }
};

export default fetchGallery;
