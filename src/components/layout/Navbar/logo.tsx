import useNavigator from "./hooks/useNavigator";

const Logo = () => {
  const handleNavigate = useNavigator("/");

  return (
    <button
      onClick={handleNavigate}
      className="px-12 flex items-center justify-center cursor-pointer"
    >
      <h1 className="text-5xl">Art & Co.</h1>
    </button>
  );
};

export default Logo;
