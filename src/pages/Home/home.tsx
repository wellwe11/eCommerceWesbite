import HeroSection from "./components/HeroSection/heroSection";
import WelcomeSection from "./components/WelcomeSection/welcomeSection";
import CollectionsScroller from "./components/CollectionsScroller/collectionsScoller";
import ChangePageSection from "./components/ChangePageSection/changePageSection";
import useHomeData from "@/hooks/useHome/useHome";

const Home = () => {
  /*
   * create a subscribe-section on home
   * Create a instagram/socials section on home
   * Fix EXPLORE GALLERY for touch-pads. It works way to aggressively when not using a mouse-scroll.
   */

  const { isLoading } = useHomeData();

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
