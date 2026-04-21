import axios from "axios";
import type { ProductData } from "@/types/product";
import createHashMap from "@/functions/createHashMap/createHashMap";

// This function assumes that data is already sorted by artist
export const sortForHomePage = (data) => {
  const heroSectionData = data.slice(0, 5).map((obj) => {
    const {
      name: artistName,
      art: [{ name: artName, src, id } = {}],
    } = obj;

    return { artName, src, artistName, id };
  });

  const collectionScrollerData = data.slice(5, 8).map((obj) => {
    return {
      name: obj.name,
      bio_art: obj.bio_art,
      bio_life: obj.bio_life,
      art: obj.art.slice(0, 3).map(({ name, src, id }) => ({ name, src, id })),
    };
  });

  return { heroSectionData, collectionScrollerData };
};

export const sortByArtist = async () => {
  const artistPromise = fetchData("/artistsData.json").then((data) => {
    return createHashMap(data, "id", () => ({ art: [] }));
  });

  const imagesPromise = fetchData("/imagesData.json").then((data) => {
    return createHashMap(data, "id");
  });

  const [artistsHash, imagesData] = await Promise.all([
    artistPromise,
    imagesPromise,
  ]);

  if (!artistsHash || !imagesData) return;

  imagesData.forEach((obj) => {
    const id = obj.artist_id;

    const artist = artistsHash.get(id);

    if (artist) {
      artist.art.push(obj);
    }
  });

  return { imagesData, artistsHash };
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
