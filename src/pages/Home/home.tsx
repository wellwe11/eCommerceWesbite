import { useEffect } from "react";
import { useSetAtom } from "jotai";

import HeroSection from "./components/HeroSection/heroSection";
import WelcomeSection from "./components/WelcomeSection/welcomeSection";
import CollectionsScroller from "./components/CollectionsScroller/collectionsScoller";
import ChangePageSection from "./components/ChangePageSection/changePageSection";

import { useGlobalProducts } from "@/hooks/useGlobalData/useGlobalData";
import { sortForHomePage } from "@/services/api";
import {
  handleActiveArtAtom,
  handleHeroDataAtom,
} from "@/atoms/home/heroImages";

const Home = () => {
  /*
   * create a subscribe-section on home
   * Create a instagram/socials section on home
   * Fix EXPLORE GALLERY for touch-pads. It works way to aggressively when not using a mouse-scroll.
   */

  const { data: artistsHash } = useGlobalProducts(({ _, artistsHash }) =>
    sortForHomePage(Array.from(artistsHash.values())),
  );

  const handleHeroData = useSetAtom(handleHeroDataAtom);
  const handleActiveArtistAtom = useSetAtom(handleActiveArtAtom);

  useEffect(() => {
    if (!artistsHash) return;

    handleHeroData(artistsHash.heroSectionData);
    handleActiveArtistAtom(artistsHash.heroSectionData[0]);
  }, [artistsHash]);

  if (!artistsHash) return;

  const scrollerData = artistsHash.collectionScrollerData;

  return (
    <main className="relative">
      <HeroSection />

      <section className="relative z-10 bg-white min-h-screen">
        <WelcomeSection />
        <CollectionsScroller data={scrollerData} />

        <ChangePageSection />
      </section>
    </main>
  );
};

export default Home;
