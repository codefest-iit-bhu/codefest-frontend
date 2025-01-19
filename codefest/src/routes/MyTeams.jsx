import React, { useState, useEffect } from "react";
import TeamCard from "../components/TeamCard";
import { useUser } from "../context/context";
import axios from "../utils/axiosInstance";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true);
      const response = await axios.get("/team/myTeams", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTeams(response.data);
      setIsLoading(false);
    };

    fetchTeams();
  }, []);

  const handleTeamDelete = (deletedTeamCode) => {
    setTeams(teams.filter((team) => team.teamCode !== deletedTeamCode));
  };

  const handleMemberUpdate = (teamCode, updatedMembers) => {
    setTeams(
      teams.map((team) =>
        team.teamCode === teamCode ? { ...team, members: updatedMembers } : team
      )
    );
  };

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
              onTeamDelete={handleTeamDelete}
              onMemberUpdate={handleMemberUpdate}
              user={user}
            />
          ))
        ) : (
          <div className="w-full text-xl font-mono flex justify-center items-center h-[90vh]">You have not registered for any event</div>
        )}
      </div>
    </>
  );
};

export default Teams;
