import React, { useState, useEffect } from "react";
import TeamCard from "../components/TeamCard";
import { useUser } from "../context/context";
import axios from "../utils/axiosInstance";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");
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
      <div className="teams-container">
        {isLoading ? (
          <Loader />
        ) : (
          teams ?
            teams.map((team) => (
              <TeamCard
                key={team.teamCode}
                team={team}
                onTeamDelete={handleTeamDelete}
                onMemberUpdate={handleMemberUpdate}
                user={user}
              />)) : <p>No Teams</p>
        )
        }
      </div>
    </>
  );
};

export default Teams;
