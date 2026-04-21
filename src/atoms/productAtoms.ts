import { atom } from "jotai";

// This atom works as an 'in-betweener' atom that holds data.
// When navigating from home/gallery to product-page, we set the clicked object to this atom, so that the product loads instantly
// After it's loaded, we retrieve additional data
export const activeProductAtom = atom<any | null>(null);
