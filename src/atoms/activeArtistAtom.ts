import { atom } from "jotai";
import { activeProductAtom } from "./productAtoms";

// Holds the array of all art-objects
const artAtom = atom([]);

// Index of which current art-index is active
const countAtom = atom(null);

export const setCountAtom = atom(null, (_get, set, val) => {
  set(countAtom, +val);
});

// Retrieve array or update array
export const handleArtAtom = atom(
  (get) => get(artAtom),
  (_get, set, newArray) => {
    set(artAtom, newArray);
  },
);

export const activeArtObj = atom((get) => {
  const baseAtom = get(activeProductAtom);
  if (!baseAtom) return null;

  const list = get(artAtom);
  const index = get(countAtom);

  return list[index] || baseAtom;
});

export const handleActiveArtistAtom = atom(null, (get, set, action) => {
  console.log(get(countAtom));
  if (action === "inc") {
    set(countAtom, get(countAtom) + 1);
  } else if (action === "dec") {
    set(countAtom, get(countAtom) - 1);
  } else if (action === "reset") {
    set(countAtom, 0);
  }
});
