import { atom } from "jotai";

const heroDataAtom = atom(null);

export const handleHeroDataAtom = atom(
  (get) => get(heroDataAtom),
  (_get, set, arr) => {
    set(heroDataAtom, arr);
  },
);

const countAtom = atom(0);

export const handleCountAtom = atom(
  (get) => get(countAtom),
  (get, set, action) => {
    const length = get(heroDataAtom).length;

    if (Number(action) || action == 0) {
      set(countAtom, action);
    } else {
      if (action === "inc") {
        set(countAtom, (get(countAtom) + 1) % length);
      } else if (action === "dec") {
        set(countAtom, (get(countAtom) - 1 + length) % length);
      }
    }
  },
);

const activeArtAtom = atom(null);

export const handleActiveArtAtom = atom(
  (get) => {
    const arr = get(heroDataAtom);
    const index = get(countAtom);

    if (!arr) return [];

    return arr[index];
  },
  (_get, set, obj) => {
    set(activeArtAtom, obj);
  },
);
