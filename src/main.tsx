import { StrictMode } from "react";
import "./index.css";

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import ReactLenis from "lenis/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactLenis
      root
      options={{
        lerp: 0.15,
        wheelMultiplier: 0.45,

        syncTouch: true,
        touchMultiplier: 0.2,
      }}
    >
      <RouterProvider router={router} />
    </ReactLenis>
  </StrictMode>,
);

// create an atom-state
// create a 'fetch-api'
// fetch data with tanstack
