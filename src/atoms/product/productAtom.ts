import { atom } from "jotai";
import { activeProductAtom } from "../productAtoms";

export const productAtom = atom({
  artArray: [],
  artist: null,
  currentIndex: 0,
  displayGrid: false,
});

// Getters
export const handleArtArrAtom = atom((get) => get(productAtom).artArray);
export const handleArtistAtom = atom((get) => get(productAtom).artist);
export const handleDisplayGridAtom = atom(
  (get) => get(productAtom).displayGrid,
);

export const handleActiveArtistAtom = atom(
  (get) => get(productAtom).currentIndex,
);

export const handleActiveArtAtom = atom((get) => {
  const { artArray, currentIndex } = get(productAtom);
  const baseAtom = get(activeProductAtom);
  return artArray[currentIndex] || baseAtom || null;
});

// Setters
export const handleProductAction = atom(null, (get, set, action) => {
  const state = get(productAtom);
  const { artArray, currentIndex } = state;
  const length = artArray.length;

  // Handle initial load
  if (action.type === "INIT") {
    set(productAtom, {
      ...state,
      artArray: action.payload.art,
      artist: action.payload.artist,
      currentIndex: action.payload.index,
    });
    return;
  }

  if (action.type === "TOGGLE_GRID") {
    set(productAtom, { ...state, displayGrid: action.payload });
    return;
  }

  if (length === 0) return;

  switch (action) {
    case "inc":
      set(productAtom, {
        ...state,
        currentIndex: (currentIndex + 1) % length,
      });
      break;
    case "dec":
      set(productAtom, {
        ...state,
        currentIndex: (currentIndex - 1 + length) % length,
      });
      break;
    case "reset":
      set(productAtom, { ...state, currentIndex: 0 });
      break;
    default:
      if (typeof action === "number") {
        set(productAtom, { ...state, currentIndex: action });
      }
  }
});
