import FramerMotionContainer from "../../components/ui/FramerMotion/framerMotion";
import HeroSection from "../../components/ui/HeroSection/heroSection.js";
import WelcomeSection from "../../components/ui/WelcomeSection/welcomeSection.js";

const Home = ({ data }) => {
  const { one, two, three } = data;

  return (
    <div>
      <HeroSection />
      <WelcomeSection />
      <FramerMotionContainer data={one} />
      <FramerMotionContainer data={two} />
      <FramerMotionContainer data={three} />
    </div>
  );
};

export default Home;
