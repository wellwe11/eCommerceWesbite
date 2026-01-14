// import { useNavigate } from "react-router-dom";

const Button = ({ children, link }: { children: string; link: string }) => {
  //   const navigate = useNavigate();

  const handleNavigate = () => {
    // navigate(link);
  };

  return (
    <button
      onClick={handleNavigate}
      className="cursor-pointer h-20 flex-1 flex items-center justify-center hover:bg-gray-50 transition-colors duration 400 ease"
    >
      <h5 className="">{children}</h5>
    </button>
  );
};

const ButtonsContainer = () => {
  const buttons = [
    {
      link: "",
      text: "HOME",
    },
    { link: "", text: "GALLERY" },
    {
      link: "",
      text: "CONTACT",
    },
  ];

  return (
    <div className="flex cursor-pointer w-[clamp(400px,10vw,700px)]">
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
    <nav className="fixed top-0 left-0 w-full flex justify-end">
      <ButtonsContainer />
    </nav>
  );
};

export default Navbar;
