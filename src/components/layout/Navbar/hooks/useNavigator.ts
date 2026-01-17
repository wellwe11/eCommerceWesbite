import { useLenis } from "lenis/react";
import { useLocation, useNavigate } from "react-router-dom";

const useNavigator = (link: string) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const lenis = useLenis();

  const handleNavigate = () => {
    const isPathnameSame = pathname === link;

    if (!isPathnameSame) {
      navigate(link);
    } else {
      window.location.reload();
      lenis?.scrollTo(0, { immediate: true });
    }
  };

  return handleNavigate;
};

export default useNavigator;
