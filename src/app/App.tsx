import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useLenis } from "lenis/react";

import "./App.css";

import Navbar from "../components/layout/Navbar/navbar.tsx";
import Footer from "@components/layout/Footer/footer.tsx";

// Add tests to:
// Footer
// hooks/
// functions/

/** Fetched object
 * Because we have a lot of information, I need to structure the objects based off of artists, rather my initial idea which was based off of collections.
 * Example:
 * 
const artists = [
  {
    artist: "Some artist",
    artistId: 1231233,
    collections: [
      {
        item: 23123,
        name: "some name",
        image: "src/asdasd",
        restImages: ["src/asd", "src/hbwd", "src/12esa", "src/sdamk"],
        price: 24.99,
        currency: "Euro",
        released: 2024,
        dimensions: {
          width: 130,
          height: 240,
          type: "metric", // For imperial, 1inch = 2.54cm
        },
      },
      {
        item: 3242,
        name: "this is called this",
        image: "src/as234asd",
        restImages: ["src/asfd", "src/hd", "src/1sswa", "src/samkaa"],
        price: 24.99,
        currency: "Euro",
        released: 2023,
        dimensions: {
          width: 110,
          height: 210,
          type: "metric",
        },
      },
    ],
  },
  // ..... and the continue
];
* Please read:
* The reason for this structure is because on product-page, we are stating which specific collection this currently is from the artist, which year it is.
* Also, hero-section holds Artist name AND item-name
* Technically, if this page was to ever launch, you could insert new data based off of artist, and it would naturally find it's index. Like so, you can directly order art based off off creator
* This allows for easy future sorting-methods as well.
* This also is good because I am not building the page based off of collections. It is simply 1 art-peice, and then other images of that same item.
* Then you can show items made by same artist below the artist as well, or something similar. 
* 
 */

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
