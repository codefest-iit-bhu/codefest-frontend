import React, { useState, useEffect } from "react";
import axios from "axios";
import TeamCard from "../components/TeamCard";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/team/myTeams");
        if (response.data.success) {
          setTeams(response.data.teams);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Failed to fetch teams. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
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
    <div className="teams-container">
      {isLoading ? (
        <p>Loading teams...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        teams.map((team) => (
          <TeamCard
            key={team.teamCode}
            team={team}
            onTeamDelete={handleTeamDelete}
            onMemberUpdate={handleMemberUpdate}
          />
        ))
      )}
    </div>
  );
};

export default Teams;
