import Logo from "./logo";

import { Link } from "react-router-dom";

const Button = ({ children, link }: { children: string; link: string }) => {
  return (
    <Link
      to={link}
      className="cursor-pointer flex-1 flex items-center justify-center hover:bg-gray-50/50 hover:backdrop-blur-xs transition-colors duration 400 ease pointer-events-auto"
      type="button"
    >
      <h5 className="text-[13px] font-light ">{children}</h5>
    </Link>
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
    <div className="flex cursor-pointer w-65 h-[clamp(60px,10vw,85px)] pointer-events-auto">
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
    <nav className="z-50 fixed top-0 left-0 pointer-events-none w-[clamp(400px,calc(100vw-10px),1910px)] flex justify-between align-middle px-10">
      <Logo />
      <ButtonsContainer />
    </nav>
  );
};

export default Navbar;
