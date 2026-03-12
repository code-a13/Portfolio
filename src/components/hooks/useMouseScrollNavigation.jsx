import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// We import your exact navItems so the hook always knows the correct order!
import { navItems } from "../Layout"; 

export const useMouseScrollNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isScrolling = useRef(false);

  useEffect(() => {
    // Dynamically extract just the paths from your navItems array
    const routes = navItems.map(item => item.path);

    const handleWheel = (e) => {
      if (isScrolling.current) return;

      const currentIndex = routes.indexOf(location.pathname);
      if (currentIndex === -1) return;

      // Scrolling Down
      if (e.deltaY > 50) {
        if (currentIndex < routes.length - 1) {
          isScrolling.current = true;
          navigate(routes[currentIndex + 1]);
          // 1200ms lock to perfectly match your Framer Motion 1.2s transitions
          setTimeout(() => (isScrolling.current = false), 1200); 
        }
      } 
      // Scrolling Up
      else if (e.deltaY < -50) {
        if (currentIndex > 0) {
          isScrolling.current = true;
          navigate(routes[currentIndex - 1]);
          setTimeout(() => (isScrolling.current = false), 1200);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
    
  }, [location.pathname, navigate]);
};