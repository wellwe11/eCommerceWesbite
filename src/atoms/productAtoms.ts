import { atom } from "jotai";

export const activeProductAtom = atom<ProductPreview | null>(null);
