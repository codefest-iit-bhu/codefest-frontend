import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import TeamRegistrationModal from "../components/TeamRegistrationModel.jsx";
import JoinTeamModal from "../components/JoinTeamModal.jsx";
import { useUser } from "../context/context.jsx";
import axios from "../utils/axiosInstance.js";
import Footer from "../components/Footer.jsx";

export const ArithmeticaEvent = ({ event }) => {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isJoinTeamModalOpen, setIsJoinTeamModalOpen] = useState(false);
  const { isAuthenticated, user } = useUser();
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

  const data = {
    "Detailed Description": event.description,
    Rules: event.rules,
    Scoring: event.scoring,
    ...(event.submission && { Submission: event.submission }),
    "How to register": event.howto,
    ...(event.prizes && { Prizes: event.prizes }),
  };

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
              backgroundImage: "url(/Arithmetica.webp)",
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

                      <a
                        href="https://discord.gg/St3q2sCn"
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

      {/* 
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 py-8">
          
          <div className="max-w-4xl mx-auto mt-[500px] sm:mt-[800px] md:mt-[1000px] flex flex-col items-center gap-4">
            {registrations_open && !hasEnded ? (
              <>
                {!isMember ? (
                  <>
                    <button
                      className="bg-transparent border-2 border-yellow-500 text-yellow-500 px-8 py-3 text-lg font-bold rounded-lg hover:bg-yellow-500 hover:text-black transition-all duration-300"
                      onClick={() => {
                        if (!isAuthenticated)
                          return (window.location.href = "/login");
                        setIsRegistrationModalOpen(true);
                      }}
                    >
                      Register Now
                    </button>
                    {event.max_members > 1 && (
                      <button
                        className="bg-transparent border-2 border-yellow-500 text-yellow-500 px-8 py-3 text-lg font-bold rounded-lg hover:bg-yellow-500 hover:text-black transition-all duration-300"
                        onClick={() => {
                          if (!isAuthenticated)
                            return (window.location.href = "/login");
                          setIsJoinTeamModalOpen(true);
                        }}
                      >
                        Join Team
                      </button>
                    )}
                  </>
                ) : (
                  <Link
                    to={`/myTeams#${teamName}`}
                    className="bg-transparent border-2 border-yellow-500 text-yellow-500 px-8 py-3 text-lg font-bold rounded-lg hover:bg-yellow-500 hover:text-black transition-all duration-300 inline-block text-center"
                  >
                    My Team
                  </Link>
                )}
              </>
            ) : (
              <div className="py-3 px-6 border-2 border-yellow-500 text-yellow-500 rounded-lg text-lg font-mono">
                {hasEnded
                  ? "Registration Closed"
                  : `Registrations will begin ${event.id === "7" ? "on 3rd Jan 12pm" : "soon"}!`}
              </div>
            )}
            {user && user.role === "admin" && (
              <a href={`/event/teams/${event.id}`}>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                  View Teams
                </button>
              </a>
            )}
          </div>

          
          <div className="max-w-4xl mx-auto mt-8 flex justify-center">
            <span className="text-lg font-mono p-3 border-2 border-yellow-500 text-yellow-200 rounded-lg bg-black bg-opacity-60">
              All information will be communicated{" "}
              <a
                href="https://discord.gg/St3q2sCn"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-400 hover:text-blue-300"
              >
                here
              </a>
            </span>
          </div>

          
          <div className="max-w-4xl mx-auto mt-12 space-y-8 pb-16">
            {event.registration_attention && (
              <div className="bg-black bg-opacity-70 p-6 rounded-lg border-2 border-yellow-600">
                <div
                  className="text-yellow-200 font-mono"
                  dangerouslySetInnerHTML={{
                    __html: event.registration_attention,
                  }}
                />
              </div>
            )}

            {event.unstop && (
              <div className="bg-black bg-opacity-70 p-6 rounded-lg border-2 border-yellow-600">
                <p className="text-yellow-200 font-mono font-bold">
                  It is mandatory to register on{" "}
                  <a
                    href={event.unstop}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-400 hover:text-blue-300"
                  >
                    unstop
                  </a>{" "}
                  too!
                </p>
              </div>
            )}

            {event.overview && (
              <div className="bg-black bg-opacity-70 p-6 rounded-lg border-2 border-yellow-600">
                <div
                  className="text-yellow-200 font-mono"
                  dangerouslySetInnerHTML={{ __html: event.overview }}
                />
              </div>
            )}

            {Object.entries(data).map(([key, value]) => (
              <div
                key={key}
                className="bg-black bg-opacity-70 p-6 rounded-lg border-2 border-yellow-600"
              >
                <div className="text-2xl text-yellow-400 mb-4 font-bold font-serif">
                  {key}:
                </div>
                <div
                  className="text-yellow-200 font-mono"
                  dangerouslySetInnerHTML={{ __html: value }}
                />
              </div>
            ))}

            <div className="bg-black bg-opacity-70 p-6 rounded-lg border-2 border-yellow-600">
              <div className="text-2xl text-yellow-400 mb-4 font-bold font-serif">
                Contact:
              </div>
              <div className="text-yellow-200 font-mono">{event.contact}</div>
            </div>
          </div>
        </div>
      */}

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

export default ArithmeticaEvent;
