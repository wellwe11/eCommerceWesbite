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
        lerp: 0.05,
        duration: 1,
        smoothWheel: true,
        wheelMultiplier: 0.5,
      }}
    >
      <RouterProvider router={router} />
    </ReactLenis>
  </StrictMode>
);
