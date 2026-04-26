import LinkWrapper from "@/components/ui/Link/link";

const Logo = () => {
  return (
    <LinkWrapper
      to="/"
      classes="flex items-center justify-center cursor-pointer pointer-events-auto"
    >
      <h1 className="text-5xl">Art & Co.</h1>
    </LinkWrapper>
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
        <LinkWrapper
          to={link}
          classes="cursor-pointer flex-1 flex items-center justify-center hover:bg-gray-50/50 hover:backdrop-blur-xs transition-colors duration 400 ease pointer-events-auto"
          key={text + i}
        >
          <h5 className="text-[13px] font-light ">{text}</h5>
        </LinkWrapper>
      ))}
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="monitor-width fixed top-0 left-0 right-0 mx-auto z-50 pointer-events-none flex justify-between align-middle">
      <Logo />
      <ButtonsContainer />
    </nav>
  );
};

export default Navbar;
