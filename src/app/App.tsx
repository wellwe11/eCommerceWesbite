import { ReactLenis } from "lenis/react";

import "./App.css";

import FramerMotionContainer from "../components/FramerMotion/framerMotion.jsx";
import Navbar from "../components/Navbar/navbar.js";

function App() {
  const lenisOptions = {
    lerp: 0.05,
    duration: 1.5,
    smoothWheel: true,
    smoothTouch: false,
    syncTouch: false,
  };

  return (
    <div>
      <Navbar />
      <ReactLenis options={lenisOptions} />
      <FramerMotionContainer />
      <FramerMotionContainer />
      <FramerMotionContainer />
    </div>
  );
}

export default App;
