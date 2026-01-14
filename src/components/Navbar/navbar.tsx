// import { useNavigate } from "react-router-dom";

const Button = ({ children, link }: { children: string; link: string }) => {
  //   const navigate = useNavigate();

  const handleNavigate = () => {
    // navigate(link);
  };

  return (
    <button onClick={handleNavigate} className="">
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
    <div className="flex justify-end align-center gap-8 p-8 pr-15 grow">
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
    <nav className="fixed top-0 left-0 w-full h">
      <ButtonsContainer />
    </nav>
  );
};

export default Navbar;
