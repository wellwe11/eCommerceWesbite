import HeroSection from "./components/HeroSection/heroSection";
import WelcomeSection from "./components/WelcomeSection/welcomeSection";
import CollectionsScroller from "./components/CollectionsScroller/collectionsScoller";
import ChangePageSection from "./components/ChangePageSection/changePageSection";

import { useGlobalProducts } from "@/hooks/useGlobalData/useGlobalData";
import { sortForHomePage } from "@/services/api";

const Home = () => {
  /*
   * create a subscribe-section on home
   * Create a instagram/socials section on home
   * Fix EXPLORE GALLERY for touch-pads. It works way to aggressively when not using a mouse-scroll.
   */

  const { data: artistsHash } = useGlobalProducts(({ _, artistsHash }) =>
    sortForHomePage(Array.from(artistsHash.values())),
  );

  if (!artistsHash) return;

  const heroData = artistsHash.heroSectionData;
  const scrollerData = artistsHash.collectionScrollerData;

  return (
    <main className="relative">
      <HeroSection data={heroData} />

      <section className="relative z-10 bg-white min-h-screen">
        <WelcomeSection />
        <CollectionsScroller data={scrollerData} />

        <ChangePageSection />
      </section>
    </main>
  );
};

export default Home;
