const Links = ({ children }) => {
  return (
    <div className="flex gap-2 justify-between">
      {children.map((obj, index) => (
        <a key={index} href={obj.link}>
          <p className="bio-text">{obj.name.toUpperCase()}</p>
        </a>
      ))}
    </div>
  );
};

const Footer = () => {
  const links = [
    {
      name: "tiktok",
      link: "/",
    },
    {
      name: "instagram",
      link: "/",
    },
    {
      name: "facebook",
      link: "/",
    },
    {
      name: "pinterest",
      link: "/",
    },
    {
      name: "youtube",
      link: "/",
    },
    {
      name: "spotify",
      link: "/",
    },
  ];

  const settings = [
    {
      name: "cookies",
      link: "/",
    },
    {
      name: "settings",
      link: "/",
    },
    {
      name: "privacy and cookies",
      link: "/",
    },
    {
      name: "policy",
      link: "/",
    },
    {
      name: "terms of use",
      link: "/",
    },
  ];

  return (
    <footer className="z-30 relative w-full h-fit bg-white flex ">
      <div className="w-[clamp(400px,calc(100vw-10px),1910px)] flex flex-col justify-center items-center gap-1.5 pt-5">
        <p className="bio-title">EXPLORE OUR SOCIALS</p>

        <div className="flex flex-col gap-5">
          <Links>{links}</Links>
          <Links>{settings}</Links>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
