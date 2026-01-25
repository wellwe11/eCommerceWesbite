import { createBrowserRouter } from "react-router-dom";
import App from "./app/App";
import Home from "./pages/Home/home";
import Gallery from "./pages/Gallery/gallery";

import Contact from "./pages/Contact/contact";

const bioTitle = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const info =
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. ";

const longText =
  "Duis aute irure esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.";

export interface HomeSection {
  index: number;
  text: {
    title: string;
    info: string;
    bio: string;
  };
  images: string[];
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "gallery",
        element: <Gallery />,
      },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

export default router;
