import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { motion } from "framer-motion";

import {
  handleActiveArtAtom,
  handleArtArrAtom,
} from "@/atoms/product/productAtom";

import useKeyboard from "@/hooks/useKeyboard/useKeyboard";
import LinkWrapper from "@/components/ui/Link/link";

// DirectionsContainer
// Generates a new link to navigate to another product
const getPath = (arr, currentIndex, direction) => {
  let newIndex;

  if (direction === "inc") {
    newIndex = arr[(currentIndex + 1) % arr.length]?.id;
  } else if (direction === "dec") {
    newIndex = arr[(currentIndex - 1 + arr.length) % arr.length]?.id;
  }

  return `/product/${newIndex}`;
};

const DirectionContainers = () => {
  const artArray = useAtomValue(handleArtArrAtom);
  const activeArt = useAtomValue(handleActiveArtAtom);

  const id = +activeArt?.id;
  const [isInView, setIsInView] = useState(false);
  const navigate = useNavigate();

  const currentIndex = artArray?.findIndex((item) => +item?.id === id);

  useKeyboard(
    {
      ArrowRight: () => navigate(getPath(artArray, currentIndex, "inc")),
      ArrowLeft: () => navigate(getPath(artArray, currentIndex, "dec")),
    },
    isInView,
  );

  return (
    <motion.div
      className="h-full w-full flex"
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
    >
      <LinkWrapper
        classes="w-full h-full flex-1 cursor-none"
        to={getPath(artArray, currentIndex, "dec")}
      />
      <LinkWrapper
        classes="w-full h-full flex-1 cursor-none"
        to={getPath(artArray, currentIndex, "inc")}
      />
    </motion.div>
  );
};

export default DirectionContainers;
