import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useLenis } from "lenis/react";

import "./App.css";

import Navbar from "@/components/layout/Navbar/navbar.tsx";
import Footer from "@/components/layout/Footer/footer.tsx";

const queryClient = new QueryClient();

function App() {
  const { pathname } = useLocation();

  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />

      <Outlet />

      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

// Go around code and look for nested prop-drilling and replace it with custom jotai-atoms
// fix home-page link to product
// Fix product-page so it displays correct information
// !! FIX !! Currently, all atoms need checks for when index is navigating. It continues -1, -2, and further than arrays length
