import Logo from "./logo";

import useNavigator from "./hooks/useNavigator";

const Button = ({ children, link }: { children: string; link: string }) => {
  const handleNavigate = useNavigator(link);
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
    <div className="z-50 w-screen fixed top-0 left-0 flex justify-center">
      <nav className="w-[clamp(400px,calc(100vw-10px),1910px)] flex justify-between align-middle">
        <Logo />
        <ButtonsContainer />
      </nav>
    </div>
  );
};

export default Navbar;
