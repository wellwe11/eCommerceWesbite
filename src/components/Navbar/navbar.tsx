// import { useNavigate } from "react-router-dom";

const Button = ({ children, link }: { children: string; link: string }) => {
  //   const navigate = useNavigate();

  const handleNavigate = () => {
    // navigate(link);
  };

  return (
    <button onClick={handleNavigate}>
      <h5>{children}</h5>
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

  return buttons.map(({ link, text }, i) => (
    <Button key={"navButton " + i} link={link}>
      {text}
    </Button>
  ));
};

const Navbar = () => {
  return (
    <nav>
      <ButtonsContainer />
    </nav>
  );
};

export default Navbar;
