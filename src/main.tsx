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
        duration: 0.5,
        easing: (t) => 1 - Math.pow(1 - t, 5),
        wheelMultiplier: 0.7,
      }}
    >
      <RouterProvider router={router} />
    </ReactLenis>
  </StrictMode>,
);

// create an atom-state
// create a 'fetch-api'
// fetch data with tanstack
