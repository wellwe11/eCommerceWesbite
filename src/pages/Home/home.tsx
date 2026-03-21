import { useQuery } from "@tanstack/react-query";

import fetchGallery from "@/services/api";

import HeroSection from "./components/HeroSection/heroSection";
import WelcomeSection from "./components/WelcomeSection/welcomeSection";
import CollectionsScroller from "./components/CollectionsScroller/collectionsScoller";
import ChangePageSection from "./components/ChangePageSection/changePageSection";

const Home = () => {
  /*
   * Research nice welcoming-sections or alternatives
   *** create a introduction-component (something below top-component to introduce user)
   **
   * create a subscribe-section on home
   * Create a instagram/socials section on home
   */

  const { isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: () => fetchGallery("/homeData.json"),
  });

  if (isLoading) return <h1>loading...</h1>;

  return (
    <main className="relative">
      <HeroSection />

      <section className="relative z-10 bg-white min-h-screen">
        <WelcomeSection />
        <CollectionsScroller />

        <ChangePageSection />
      </section>
    </main>
  );
};

export default Home;
