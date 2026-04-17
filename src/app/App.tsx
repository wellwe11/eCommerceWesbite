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
