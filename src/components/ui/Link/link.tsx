import type { ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

interface LinkInterface extends LinkProps {
  classes?: string;
  label?: string;
}

const LinkWrapper = ({
  children,
  classes,
  to = "",
  label,
  ...props
}: LinkInterface) => {
  return (
    <Link className={classes} to={to} {...props}>
      {children}
    </Link>
  );
};

export default LinkWrapper;
