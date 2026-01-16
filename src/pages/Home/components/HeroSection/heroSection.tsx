import heroImage from "../../resources/imageThree.avif";

const Button = () => {
  return (
    <button className="p-3.5 bg-amber-400">
      <h1></h1>
    </button>
  );
};

const HeroSection = () => {
  return (
    <div className="w-full h-screen z-30 sticky grid place-items-center overflow-hidden ">
      <button className="absolute left-[50%] right-[50%] grid-cols-1 grid-rows-1 bg-amber-50 w-35 h-15 cursor-pointer">
        Explore
      </button>

      <img
        className="w-full h-full object-contain grid-cols-1 grid-rows-1"
        src={heroImage}
        alt=""
      />
    </div>
  );
};

export default HeroSection;
