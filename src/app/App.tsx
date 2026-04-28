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
      <div className="monitor-width">
        <Navbar />

        <Outlet />

        <Footer />
      </div>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

// Go around code and look for nested prop-drilling and replace it with custom jotai-atoms
// fix home-page link to product
// Style product-page
// memo heroImages becasue they re-render like crazy
// on home-page: Once user has scrolled 50% of the scroll-meeter, 'dehydrate' the atoms that use the data for gallery so it pre-calculates the data
// abstract classes so that I have generic text-types etc. For example, all capital-letters, the text size, width etc.
// randomise order for art on gallery
// FIX custom mouse: Currently, whenever it is disabled, it stops moving. This is bad, because it cuases the cursor to snap once it appears aagain. Make it so it follows while inactive, but is simply not visible. And add a 'disable' option so it can be turned off if it completely leaves its container
// Seperate DATA so that art-piece data like description, exhibitions etc. are in collectionsData, and prices etc. are in imagesData

// Fix accessibility
// Fix Testing
// Fix CSS classes & abstract it
// Add a loader to gallery when fetching more products
