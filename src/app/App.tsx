import { ReactLenis, useLenis } from "lenis/react";

import "./App.css";

import FramerMotion from "../components/FramerMotion/index.jsx";

function App() {
  const lenis = useLenis((lenis) => {
    console.log(lenis);
  });
  return (
    <div>
      <ReactLenis />
      <FramerMotion />
    </div>
  );
}

export default App;
