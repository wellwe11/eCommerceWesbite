import axios from "axios";
import type { ProductData } from "@/types/product";

// import artists from "./artistsData.json";
// import collections from "./collectionsData.json";
// import images from "./imagesData.json";

export const api = {
  sortByArtist: async function () {
    const artistPromise = fetchData("/artistsData.json").then((data) => {
      return this.createHashMap(data, "id");
    });

    const imagesPromise = fetchData("/imagesData.json");

    const [artistsHash, imagesData] = await Promise.all([
      artistPromise,
      imagesPromise,
    ]);

    if (!artistsHash || !imagesData) return;

    imagesData.forEach((obj) => {
      const artist = artistsHash.get(obj?.artist_id);

      if (artist) {
        artist.art.push(obj);
      }
    });

    return Array.from(artistsHash.values());
  },

  createHashMap: (data, sortBy) => {
    const artistMap = new Map();

    data.forEach((obj) => {
      const id = obj[sortBy];

      if (!artistMap.has(id)) {
        artistMap.set(id, { ...obj, art: [] });
      }
    });

    return artistMap;
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
