import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import MobileEventsPage from "./Eventsmobileview.jsx";
import DesktopEventsPage from "./EventsDesktopview";

export default function Events() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    // Check screen size on initial render
    handleResize();

    // Add event listener to update on resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-[rgba(20,11,41,1)]">
      <Navbar />
      {isMobile ? (
        <MobileEventsPage />
      ) : (
        <DesktopEventsPage />
      )}
    </div>
  );
}