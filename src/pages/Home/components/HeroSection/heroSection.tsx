import heroImage from "../../resources/imageThree.avif";

// const Button = () => {
//   return (
//     <button className="p-3.5 bg-amber-400">
//       <h1></h1>
//     </button>
//   );
// };

const HeroSection = () => {
  return (
    <div className="w-screen h-screen z-30 sticky grid place-items-center overflow-hidden grid-cols-1 grid-rows-1">
      <button className="col-start-1 row-start-1 z-10 bg-amber-300 w-35 h-15 cursor-pointer m-auto">
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
