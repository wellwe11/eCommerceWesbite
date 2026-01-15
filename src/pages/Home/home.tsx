import FramerMotionContainer from "../../components/ui/FramerMotion/framerMotion";
import HeroSection from "../../components/ui/HeroSection/heroSection.js";
import WelcomeSection from "../../components/ui/WelcomeSection/welcomeSection.js";

const Home = ({ data }) => {
  const { one, two, three } = data;

  /**
   * For tomorrow:
   * Add button to hero-section in home
   * Research nice welcoming-sections or alternatives
   * Create a instagram/socials section on home
   *
   * fun idea:
   * make it so that the number to the right roles up when new image pops up instead of disappearing
   * Remove it from framerMotion.jsx
   * Add it here
   * Add refs into each div-container
   * Then animate them once intersection
   */
  return (
    <div>
      <HeroSection />
      <WelcomeSection />
      <div className="mt-80 mb-120 ">
        <FramerMotionContainer data={one} threshold={0.3} />
      </div>
      <div className="mt-70">
        <FramerMotionContainer data={two} />
      </div>
      <div className="mt-60">
        <FramerMotionContainer data={three} />
      </div>
    </div>
  );
};

export default Home;
