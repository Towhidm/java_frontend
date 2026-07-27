import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scroll to top on every route change (fixes landing mid/bottom of page). */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
