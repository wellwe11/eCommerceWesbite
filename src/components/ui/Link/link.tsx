import { useSetAtom } from "jotai";
import { Link, type LinkProps } from "react-router-dom";
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

  const handleClick = () => {
    if (product) {
      setProduct(product);
    }
  };

  return (
    <Link className={classes} onClick={handleClick} to={to} {...props}>
      {children}
    </Link>
  );
};

export default LinkWrapper;
