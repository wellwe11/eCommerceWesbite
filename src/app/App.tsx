import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useLenis } from "lenis/react";

import "./App.css";

import Navbar from "@/components/layout/Navbar/navbar.tsx";
import Footer from "@/components/layout/Footer/footer.tsx";

// Add tests to:
// Footer
// functions/

// For next time:
// Create a hash-map that collects data from artistsData and ImagesData. Then sort it in an API file for front-page and gallery.
// Use tanstack for caching the data through their custom hooks
// its fun to think about architecture but building a planet full of tools for such a small project makes no sense

const useArtistGallery = (artistId) => {
  return useQuery({
    queryKey: ["artist", artistId],
    queryFn: async () => {
      // We are fetching a real, physical file from our public folder
      const response = await fetch(`/api/artists/${artistId}.json`);
      if (!response.ok) throw new Error("Artist not found");
      return response.json();
    },
  });
};

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
