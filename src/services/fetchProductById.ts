import axios from "axios";

const findObject = (id, arr) => {
  return arr.find((p: any) => p.id === id) || [];
};

const fetchProductById = async (id: string) => {
  try {
    const { data } = await axios.get("/galleryData.json");

    return findObject(id, data);
  } catch (err) {
    throw new Error(`Error fetching data for gallery: ${err}`);
  }
};

export default fetchProductById;
