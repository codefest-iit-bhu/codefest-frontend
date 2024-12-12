import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import TeamRegistrationModal from "../components/TeamRegistrationModel.jsx";
import JoinTeamModal from "../components/JoinTeamModal.jsx"; // New import
import events from "../store/events.js";
import { useUser } from "../context/context.jsx";
import axios from "../utils/axiosInstance.js";

export const Event = () => {
  const { name } = useParams();
  const event = events.find((event) => event.name === name);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isJoinTeamModalOpen, setIsJoinTeamModalOpen] = useState(false);
  const { isAuthenticated } = useUser();
  const [isMember, setIsMember] = useState(false);
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    async function getIsMember() {
      const res = await axios.get(`/event/${event.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setIsMember(res.data.isMember);
      if (res.data.isMember) {
        setTeamName(res.data.teamName);
      }
    }
    if (isAuthenticated) getIsMember();
  }, []);

  const data = {
    "Detailed Description": event.description,
    Rules: event.rules,
    Scoring: event.scoring,
    "How to register": event.howto,
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-evenly"style={{ backgroundColor: "#140B29", color: "#FFFFFF" }}>
        <div className="w-full md:w-1/2 rounded-md py-4 backdrop-blur-[2px] px-6">
          <div className="text-center text-4xl text-lime-400">{event.name}</div>
          <div className="text-center text-lg mb-6">{event.date}</div>

          <div>
            <span className="text-xl text-lime-400">
              Registration Deadline:
            </span>
            <span> {event.last_date_reg} </span>
          </div>

          {isAuthenticated && (
            <div className="flex justify-center mt-3 space-x-3">
              {!isMember ? (
                <>
                  <button
                    className="bg-lime-600 text-white p-3 rounded-lg hover:bg-lime-700 transition-colors"
                    onClick={() => setIsRegistrationModalOpen(true)}
                  >
                    Register Now!
                  </button>
                  <button
                    className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors"
                    onClick={() => setIsJoinTeamModalOpen(true)}
                  >
                    Join Team
                  </button>
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
            </div>
          )}

          <div className="mt-6">
            <div dangerouslySetInnerHTML={{ __html: event.overview }} />
          </div>

          {Object.entries(data).map(([key, value]) => (
            <div className="mt-6" key={key}>
              <div className="text-xl text-lime-400 mb-4"> {key} :</div>
              <div dangerouslySetInnerHTML={{ __html: value }} />
            </div>
          ))}

          <div className="mt-6 mb-6">
            <div className="text-xl text-lime-400 mb-4">Contact:</div>
            <div> {event.contact} </div>
          </div>
        </div>
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

export default Event;
