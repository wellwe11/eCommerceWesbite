import { ReactLenis } from "lenis/react";

import "./App.css";

import FramerMotionContainer from "../components/ui/FramerMotion/framerMotion.jsx";
import Navbar from "../components/layout/Navbar/navbar.js";

import imageOne from "./resources/imageOne.avif";
import imageTwo from "./resources/imageTwo.avif";
import imageThree from "./resources/imageThree.avif";

function App() {
  const lenisOptions = {
    lerp: 0.05,
    duration: 1.5,
    smoothWheel: true,
    smoothTouch: false,
    syncTouch: false,
  };

  const bioTitle = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  const info =
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. ";

  const longText =
    "Duis aute irure esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.";

  const motionOne = {
    index: 1,
    text: {
      title: bioTitle,
      info: info,
      bio: longText,
    },
    images: [imageOne, imageTwo, imageThree],
  };

  const motionTwo = {
    index: 2,
    text: {
      title: bioTitle,
      info: info,
      bio: longText,
    },
    images: [imageTwo, imageThree, imageOne],
  };

  const motionThree = {
    index: 3,
    text: {
      title: bioTitle,
      info: info,
      bio: longText,
    },
    images: [imageThree, imageOne, imageTwo],
  };

  return (
    <div>
      <Navbar />
      <ReactLenis options={lenisOptions} />
      <FramerMotionContainer data={motionOne} />
      <FramerMotionContainer data={motionTwo} />
      <FramerMotionContainer data={motionThree} />
    </div>
  );
}

export default App;
