import Logo from "./logo";

import { useNavigate } from "react-router-dom";

const Button = ({ children, link }: { children: string; link: string }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(link);
  };

  return (
    <button
      onClick={handleNavigate}
      className="cursor-pointer flex-1 flex items-center justify-center hover:bg-gray-50/50 hover:backdrop-blur-xs transition-colors duration 400 ease"
      type="button"
    >
      <h5 className="">{children}</h5>
    </button>
  );
};

const ButtonsContainer = () => {
  const buttons = [
    {
      link: "/",
      text: "HOME",
    },
    { link: "/gallery", text: "GALLERY" },
    {
      link: "/contact",
      text: "CONTACT",
    },
  ];

  return (
    <div className="flex cursor-pointer w-[clamp(300px,10vw,400px)] h-[clamp(50px,5vw,75px)]">
      {buttons.map(({ link, text }, i) => (
        <Button key={"navButton " + i} link={link}>
          {text}
        </Button>
      ))}
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between align-middle z-50 px-2">
      <Logo />
      <ButtonsContainer />
    </nav>
  );
};

export default Navbar;
