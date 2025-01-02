import React, { useState, useEffect } from "react";
import TeamCard from "../../components/TeamCard";
import { useUser } from "../../context/context";
import axios from "../../utils/axiosInstance";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";

const AllTeams = () => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const { eventId } = useParams();

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true);
      const response = await axios.get(`/event/teams/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTeams(response.data);
      setIsLoading(false);
    };

    fetchTeams();
  }, []);

  return (
    <>
      <Navbar />
      <div className="teams-container bg-purple-800 min-h-[95vh]">
        {isLoading ? (
          <Loader />
        ) : teams && teams.length > 0 ? (
          teams.map((team) => (
            <TeamCard
              key={team.teamCode}
              team={team}
              user={user}
              all={true}
            />
          ))
        ) : (
          <div className="w-full text-xl font-mono flex justify-center items-center h-[90vh]">No teams registered for the event</div>
        )}
      </div>
    </>
  );
};

export default AllTeams;
