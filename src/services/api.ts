import axios from "axios";
import type { ProductData } from "@/types/product";
import createHashMap from "@/functions/createHashMap/createHashMap";

// import artists from "./artistsData.json";
// import collections from "./collectionsData.json";
// import images from "./imagesData.json";

export const sortByArtist = async () => {
  const artistPromise = fetchData("/artistsData.json").then((data) => {
    console.log(data);
    return createHashMap(data, "id", () => ({ art: [] }));
  });

  const imagesPromise = fetchData("/imagesData.json");

  const [artistsHash, imagesData] = await Promise.all([
    artistPromise,
    imagesPromise,
  ]);

  if (!artistsHash || !imagesData) return;

  imagesData.forEach((obj) => {
    const id = obj.artist_id;
    console.log(id);
    const artist = artistsHash.get(id);
    console.log(artist);

    if (artist) {
      artist.art.push(obj);
    }
  });

  return Array.from(artistsHash.values());
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
