import { atom } from "jotai";

// Holds the array of all art-objects
const artAtom = atom([]);

// Index of which current art-index is active
const countAtom = atom(0);

// Retrieve array or update array
export const handleArtAtom = atom(
  (get) => get(artAtom),
  (_get, set, newArray) => {
    set(artAtom, newArray);
  },
);

export const activeArtObj = atom((get) => {
  const list = get(artAtom);
  const index = get(countAtom);
  return list[index];
});

export const handleActiveArtistAtom = atom(null, (get, set, action) => {
  if (action === "inc") {
    set(countAtom, get(countAtom) + 1);
  } else if (action === "dec") {
    set(countAtom, get(countAtom) - 1);
  } else if (action === "reset") {
    set(countAtom, 0);
  }
});
