import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import TeamRegistrationModal from "../components/TeamRegistrationModel.jsx";
import JoinTeamModal from "../components/JoinTeamModal.jsx"; // New import
import events from "../store/events.js";
import { useUser } from "../context/context.jsx";
import axios from "../utils/axiosInstance.js";


import Footer from "../components/Footer.jsx";
import ArithmeticaEvent from "./ArithmeticaEvent.jsx";
import CodewarsEvent from "./CodewarsEvent.jsx";
import CaptureTheFlagEvent from "./CaptureTheFlagEvent.jsx";
import VistaEvent from "./VistaEvent.jsx";
import EnigmaEvent from "./EnigmaEvent.jsx";
import HaXploreEvent from "./HaXploreEvent.jsx";
import ManthanEvent from "./ManthanEvent.jsx";

export const Event = () => {
  const { name } = useParams();
  const event = events.find((event) => event.name === name);

  if (event && event.name === "Arithmetica") {
    return <ArithmeticaEvent event={event} />;
  }

  if (event && event.name === "Codewars") {
    return <CodewarsEvent event={event} />;
  }

  if (event && event.name === "Capture the Flag") {
    return <CaptureTheFlagEvent event={event} />;
  }

  if (event && event.name === "Vista") {
    return <VistaEvent event={event} />;
  }

  if (event && event.name === "Enigma") {
    return <EnigmaEvent event={event} />;
  }

  if (event && event.name === "HaXplore") {
    return <HaXploreEvent event={event} />;
  }

  if (event && event.name === "Manthan") {
    return <ManthanEvent event={event} />;
  }

  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isJoinTeamModalOpen, setIsJoinTeamModalOpen] = useState(false);
  const { isAuthenticated } = useUser();
  const [isMember, setIsMember] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [browser, setBrowser] = useState("");
  const [registrations_open, setRegistrations_open] = useState(false);
  const { user } = useUser();
  const hasEnded = new Date() > new Date(event.last_date_reg);

  function detectBrowser() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("chrome") && !userAgent.includes("edg")) {
      return setBrowser("chrome");
    } else if (userAgent.includes("firefox")) {
      return setBrowser("firefox");
    }
    setBrowser("default");
  }

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

    detectBrowser();
    if (isAuthenticated) getIsMember();
    getEvent();
  }, []);

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
      <Navbar />
    
      {/* <div
        className={`flex flex-col md:flex-row items-center justify-evenly ${browser === "firefox" ? "bg-[#1E032C]" : "bg-[#140C27]"}`}
      >
        <div className="w-full md:w-2/3 rounded-md pt-4 backdrop-blur-[2px] px-6">
          <div className="text-center text-6xl text-lime-400">{event.name}</div>
          <div className="text-center text-lg mb-6 font-mono">{event.date}</div>

          <div className="relative mt-6 mb-6">
            <img
              src={cloudLeft}
              alt=""
              className="absolute top-0 left-0 w-40 h-auto -z-10"
            />
            <br />

            <img
              src={event.image_desk_path}
              alt=""
              className="mx-auto w-40 h-auto z-20 rounded-full"
            />
            <br />

            <img
              src={cloudRight}
              alt=""
              className="absolute bottom-0 right-0 w-40 h-auto"
            />
          </div>

          <div className="text-2xl">
            <span className="text-lime-400">Registration Deadline:</span>
            <span className="font-mono"> {event.last_date_reg} </span>
          </div>

          <div className="flex justify-center mt-3 space-x-3">
            {registrations_open && !hasEnded ? (
              <>
                {!isMember ? (
                  <>
                    <button
                      className="bg-lime-600 text-white p-3 font-bold rounded-lg hover:bg-lime-700 transition-colors"
                      onClick={() => {
                        if (!isAuthenticated)
                          return (window.location.href = "/login");
                        setIsRegistrationModalOpen(true);
                      }}
                    >
                      Register Now!
                    </button>
                    {event.max_members > 1 && (
                      <button
                        className="bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
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
                    className="bg-lime-600 text-white p-3 rounded-lg hover:bg-lime-700 transition-colors"
                    onClick={() => setIsRegistrationModalOpen(true)}
                  >
                    My Team
                  </Link>
                )}
              </>
            ) : (
              <span className="py-2 px-4 border border-lime-400 text-lime-400 rounded-lg font-mono text-lg">
                {hasEnded
                  ? "Registration Closed"
                  : `Registrations will begin ${event.id === "7" ? "on 3rd Jan 12pm" : "soon"} !`}
              </span>
            )}
            {user && user.role === "admin" && (
              <a href={`/event/teams/${event.id}`}>
                <button className="bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
                  View Teams
                </button>
              </a>
            )}
          </div>
          <div className="flex justify-center items-center">
          <span className="text-lg mt-5 font-mono p-2 border-2 border-green-500 rounded-lg">
            All the information will be communicated <a href="https://discord.gg/St3q2sCn" target="_blank" className="underline text-blue-500">here</a>
          </span>
          </div>

          {event.registration_attention && (
            <div className="mt-6 text-lg font-mono flex justify-center items-center">
              <div
                dangerouslySetInnerHTML={{
                  __html: event.registration_attention,
                }}
              />
            </div>
          )}

          {
            event.unstop &&
            <div className="mt-6 text-lg font-mono font-bold text-green-500">
              <p>It is mandatory to register on <a href={event.unstop} target="_blank" className="underline text-blue-500">unstop</a> too!</p>
            </div>
          }
          <div className="mt-6 text-lg font-mono">
            <div dangerouslySetInnerHTML={{ __html: event.overview }} />
          </div>

          {Object.entries(data).map(([key, value]) => (
            <div className="mt-6 font-mono" key={key}>
              <div className="text-xl text-lime-400 mb-4"> {key} :</div>
              <div dangerouslySetInnerHTML={{ __html: value }} />
            </div>
          ))}

          <div className="mt-6 mb-6">
            <div className="text-xl text-lime-400 mb-4">Contact:</div>
            <div className="font-mono"> {event.contact} </div>
          </div>

          <div className="mt-6">
            <img src={ground} alt="" className="w-full h-auto" />
          </div>
        </div>
      </div>
      <Footer />

      <TeamRegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        event={event}
      />

      <JoinTeamModal
        isOpen={isJoinTeamModalOpen}
        onClose={() => setIsJoinTeamModalOpen(false)}
      /> */}
    </>
  );
};

export default Event;
