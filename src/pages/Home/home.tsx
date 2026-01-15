import FramerMotionContainer from "../../components/ui/FramerMotion/framerMotion.jsx";
import HeroSection from "../../components/ui/HeroSection/heroSection.js";

const Home = ({ data }) => {
  return (
    <div>
      <HeroSection />
      <FramerMotionContainer data={data} />
    </div>
  );
};

export default Home;
