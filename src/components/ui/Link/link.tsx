import { useSetAtom } from "jotai";
import { Link, useNavigate, type LinkProps } from "react-router-dom";
import { activeProductAtom } from "@/atoms/productAtoms";

interface LinkInterface extends LinkProps {
  classes?: string;
  label?: string;
  product?: {};
}

const LinkWrapper = ({
  children,
  product,
  classes,
  to = "",
  label,
  ...props
}: LinkInterface) => {
  const setProduct = useSetAtom(activeProductAtom);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    if (product) {
      setProduct(product);
    }

    navigate(to);
  };

  return (
    <Link className={classes} onClick={handleClick} to={to} {...props}>
      {children ? children : ""}
    </Link>
  );
};

export default LinkWrapper;
