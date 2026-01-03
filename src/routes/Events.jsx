import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import MobileEventsPage from "./Eventsmobileview";
import DesktopEventsPage from "./EventsDesktopview";
import Footer from "../components/Footer";

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
    <div className="bg-[url('/Events_bg.png')] bg-contain">
      <Navbar />
      {isMobile ? (
        <MobileEventsPage />
      ) : (
        <DesktopEventsPage />
      )}
      <Footer />
    </div>
  );
}