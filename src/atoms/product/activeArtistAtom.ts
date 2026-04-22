import { atom } from "jotai";
import { activeProductAtom } from "../productAtoms";

// Holds the array of all art-objects
const artAtom = atom([]);

const artistAtom = atom(null);

export const handleArtistAtom = atom(
  (get) => get(artistAtom),
  (_get, set, newArtist) => {
    set(artistAtom, newArtist);
  },
);

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

  const list = get(artAtom);
  const index = get(countAtom);

  return list[index] || baseAtom;
});

export const handleActiveArtistAtom = atom(
  (get) => get(countAtom),
  (get, set, action) => {
    const length = get(artAtom).length;

    if (action === "inc") {
      set(countAtom, (get(countAtom) - 1 + length) % length);
    } else if (action === "dec") {
      set(countAtom, (get(countAtom) + 1) % length);
    } else if (action === "reset") {
      set(countAtom, 0);
    }
  },
);
