import { createBrowserRouter } from "react-router-dom";
import App from "./app/App";
import Home from "./pages/Home/home";
import Gallery from "./pages/Gallery/gallery";

import imageOne from "./resources/imageOne.avif";
import imageTwo from "./resources/imageTwo.avif";
import imageThree from "./resources/imageFour.avif";
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

const homeData: Record<string, HomeSection> = {
  one: {
    index: 1,

    text: {
      title: bioTitle,
      info: info,
      bio: longText,
    },
    images: [imageOne, imageTwo, imageThree],
  },
  two: {
    index: 2,

    text: {
      title: bioTitle,
      info: info,
      bio: longText,
    },
    images: [imageTwo, imageThree, imageOne],
  },
  three: {
    index: 3,

    text: {
      title: bioTitle,
      info: info,
      bio: longText,
    },
    images: [imageOne, imageThree, imageTwo],
  },
};

const galleryData = [
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },

  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
  {
    name: "Picture in blue",

    price: 34.99,

    width: 20,
    height: 45,

    colors: ["blue", "white"],

    images: [
      { src: imageOne, type: "main" },
      { src: imageThree, type: "alternative" },
      { src: imageTwo, type: "rest" },
      { src: imageOne, type: "rest" },
      { src: imageTwo, type: "rest" },
    ],
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home data={homeData} /> },
      {
        path: "gallery",
        element: <Gallery data={galleryData} />,
      },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

export default router;
