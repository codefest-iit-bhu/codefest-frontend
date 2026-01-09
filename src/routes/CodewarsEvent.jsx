import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TeamRegistrationModal from "../components/TeamRegistrationModel.jsx";
import JoinTeamModal from "../components/JoinTeamModal.jsx";
import { useUser } from "../context/context.jsx";
import axios from "../utils/axiosInstance.js";
import Footer from "../components/Footer.jsx";

export const CodewarsEvent = ({ event }) => {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isJoinTeamModalOpen, setIsJoinTeamModalOpen] = useState(false);
  const { isAuthenticated } = useUser();
  const [isMember, setIsMember] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [registrations_open, setRegistrations_open] = useState(false);
  const hasEnded = new Date() > new Date(event.last_date_reg);

  useEffect(() => {
    async function getIsMember() {
      const res = await axios.get(`/event/is_member/${event.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setIsMember(res.data.isMember);
      if (res.data.isMember) {
        setTeamName(res.data.teamName);
      }
    }

    async function getEvent() {
      const res = await axios.get(`/event/${event.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRegistrations_open(res.data.registrations_open);
    }

    if (isAuthenticated) getIsMember();
    getEvent();
  }, [event.id, isAuthenticated]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Page shell: poster scroll area + footer outside (footer won't move with poster background) */}
      <div className="min-h-screen flex flex-col pt-12">
        <div className="relative w-full flex-1 overflow-y-auto overflow-x-hidden">
          <div
            className="relative w-full"
            style={{
              backgroundImage: "url(/Codewars.webp)",
              backgroundSize: "100% auto",
              backgroundPosition: "top center",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#1a0a0a",
            }}
          >
            <div className="w-full pt-[200.14%]" />

            <div className="absolute inset-0 pointer-events-none">
              <div className="relative w-full h-full">
                <div className="absolute inset-x-0 top-0 h-full mx-auto w-full max-w-[1600px] pointer-events-none">
                  <div className="relative w-full h-full pointer-events-none">
                    <div
                      className="absolute left-1/2 -translate-x-1/2 flex flex-row flex-nowrap items-center justify-center pointer-events-auto top-[11%] md:top-[13%]"
                      style={{ gap: "clamp(0.4rem, 1.4vw, 1.15rem)" }}
                    >
                      {isMember ? (
                        <a
                          href="https://chat.whatsapp.com/LvztuPLkXuD0XZdEinZ6AO"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group cursor-pointer focus:outline-none"
                          style={{ width: "clamp(140px, 42vw, 450px)" }}
                        >
                          <img
                            src="/whatsapp.png"
                            alt="Join whatsapp"
                            className="block w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            if (!isAuthenticated)
                              return (window.location.href = "/login");
                            setIsRegistrationModalOpen(true);
                          }}
                          className="group cursor-pointer focus:outline-none"
                          style={{ width: "clamp(140px, 42vw, 450px)" }}
                        >
                          <img
                            src="/event_register_btn.png"
                            alt="Register now"
                            className="block w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        </button>
                      )}

                      <a
                        href="https://www.hackerrank.com/codewars-26"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group cursor-pointer"
                        style={{ width: "clamp(140px, 42vw, 450px)" }}
                      >
                        <img
                          src="/further_details_btn.png"
                          alt="Further details will be updated here"
                          className="block w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <TeamRegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        event={event}
      />

      <JoinTeamModal
        isOpen={isJoinTeamModalOpen}
        onClose={() => setIsJoinTeamModalOpen(false)}
      />
    </>
  );
};

export default CodewarsEvent;
