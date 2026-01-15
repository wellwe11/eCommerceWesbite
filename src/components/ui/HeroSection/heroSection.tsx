import heroImage from "../../../resources/imageThree.avif";

const Button = () => {
  return (
    <button>
      <h1></h1>
    </button>
  );
};

const HeroSection = () => {
  return (
    <div className="w-full h-screen">
      <img className="w-full h-full object-cover" src={heroImage} alt="" />
    </div>
  );
};

export default HeroSection;
