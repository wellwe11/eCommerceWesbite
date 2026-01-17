import HeroSection from "./components/HeroSection/heroSection";
import WelcomeSection from "./components/WelcomeSection/welcomeSection";
import CollectionsScroller from "./components/CollectionsScroller/collectionsScoller";
import type { HomeSection } from "src/router";

const Home = ({ data }: { data: Record<string, HomeSection> }) => {
  /*
   * Research nice welcoming-sections or alternatives
   *** create a introduction-component (something below top-component to introduce user)
   * create a slider for home
   * Create a instagram/socials section on home
   */

  return (
    <div>
      <HeroSection />
      <WelcomeSection />
      <CollectionsScroller data={data} />
    </div>
  );
};

export default Home;
