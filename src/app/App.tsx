import { ReactLenis } from "lenis/react";

import "./App.css";

import FramerMotionContainer from "../components/FramerMotion/index.jsx";

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
      <ReactLenis options={lenisOptions} />
      <FramerMotionContainer />
      <FramerMotionContainer />
      <FramerMotionContainer />
    </div>
  );
}

export default App;
