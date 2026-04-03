import { createBrowserRouter } from "react-router-dom";

import App from "@/app/App";
import Home from "@/pages/Home/home";
import Gallery from "@/pages/Gallery/gallery";
import Contact from "@/pages/Contact/contact";
import Product from "@/pages/Product/product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "gallery", element: <Gallery /> },
      { path: "contact", element: <Contact /> },
      { path: "product/:id", element: <Product /> },
    ],
  },
]);

export default router;
