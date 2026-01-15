import { ReactLenis } from "lenis/react";

import "./App.css";

import Navbar from "../components/layout/Navbar/navbar.tsx";

import { Outlet } from "react-router-dom";

export type ProductImage = {
  src: string;
  type?: string;
};

export type ProductData = {
  name: string;
  price: number;
  width: number;
  height: number;

  colors: string[];

  images: ProductImage[];
};

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

      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

// Today:
// Fix logo for navbar
// Create empty pages
// -- home
// -- gallery
// -- contact
// add routing

// Create a top-component for home
// create a introduction-component (something below top-component to introduce user)
// create a slider for home
//
