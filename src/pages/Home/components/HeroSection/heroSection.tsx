import { useNavigate } from "react-router-dom";
import heroImage from "../../resources/imageThree.avif";

const SideText = () => {
  return (
    <div className="relative top-[8.5vw] z-10 col-start-1 row-start-1 justify-self-end self-center [writing-mode:vertical-rl] flex items-center gap-5">
      <p className="text-xs">Small uninformative text, minor details</p>
      <h4 className="text-5xl">Big title text</h4>
    </div>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/gallery");
  };
  return (
    <div className="w-full h-screen z-30 sticky grid place-items-center overflow-hidden grid-cols-1 grid-rows-1">
      <SideText />
      <button
        onClick={handleNavigate}
        className="col-start-1 row-start-1 z-10 bg-gray-300 w-35 h-15 cursor-pointer m-auto"
      >
        Explore
      </button>

      <img
        className="h-full w-full object-center object-cover col-start-1 row-start-1"
        src={heroImage}
        alt=""
      />
    </div>
  );
};

export default HeroSection;
