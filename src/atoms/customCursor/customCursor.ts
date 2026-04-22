import { atom } from "jotai";

const customCursorAtom = atom(false);

const handleCustomCursor = atom(
  (get) => get(customCursorAtom),
  (_get, set, val) => set(customCursorAtom, val),
);

export default handleCustomCursor;
