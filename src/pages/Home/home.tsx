import HeroSection from "./components/HeroSection/heroSection";
import WelcomeSection from "./components/WelcomeSection/welcomeSection";
import CollectionsScroller from "./components/CollectionsScroller/collectionsScoller";
import type { HomeSection } from "src/router";
import { useQuery } from "@tanstack/react-query";

import fetchGallery from "../../services/api";

const Home = () => {
  /*
   * Research nice welcoming-sections or alternatives
   *** create a introduction-component (something below top-component to introduce user)
   **
   * create a subscribe-section on home
   * Create a instagram/socials section on home
   */

  const { data, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: () => fetchGallery("/homeData.json"),
  });

  // Update jotai to hold home-page data so that it more easily is passed down with very minial information

  if (isLoading) return <h1>loading...</h1>;

  return (
    <main className="relative">
      <HeroSection />

      <section className="relative z-10 bg-white min-h-screen">
        <WelcomeSection />
        <CollectionsScroller data={data} />
      </section>
    </main>
  );
};

export default Home;
