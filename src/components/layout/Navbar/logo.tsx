import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center justify-center cursor-pointer pointer-events-auto"
    >
      <h1 className="text-5xl">Art & Co.</h1>
    </Link>
  );
};

export default Logo;
