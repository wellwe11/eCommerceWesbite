import { useLenis } from "lenis/react";

import "./App.css";

import Navbar from "../components/layout/Navbar/navbar.tsx";

import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

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
  const { pathname } = useLocation();

  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return (
    <div className="overflow-hidden">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

// general TODO:
// Product page
// Cart page
// Contact page
// Footer
