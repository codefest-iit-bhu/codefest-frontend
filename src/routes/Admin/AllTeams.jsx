import React, { useState, useEffect } from "react";
import TeamCard from "../../components/TeamCard";
import { useUser } from "../../context/context";
import axios from "../../utils/axiosInstance";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import Search from "../../components/Search";

const AllTeams = () => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const { eventId } = useParams();
  const [search, setSearch] = useState("");

  const teamFilter = (team) => {
    console.log(team.members);
    return team.members.some(member => member.user.name.toLowerCase().includes(search.toLowerCase())) || team.teamCode.toLowerCase().includes(search.toLowerCase()) || team.teamName.toLowerCase().includes(search.toLowerCase())
  }

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
        <div className="flex gap-3 items-center font-mono w-2/3">
          <Search search={search} setSearch={setSearch} placeholder={"Search using member names or team name/code"} />
        </div>
        {isLoading ? (
          <Loader />
        ) : teams && teams.filter(teamFilter).length > 0 ? (
          <>
            <div className="flex items-center">
              <button className="bg-orange-500 px-3 py-2 text-white font-mono rounded-lg">
                {teams.filter(teamFilter).length} results
              </button>
            </div>
            {
              teams.filter(teamFilter).map((team) => (
                <TeamCard
                  key={team.teamCode}
                  team={team}
                  user={user}
                  all={true}
                />
              ))
            }
          </>
        ) : (
          <div className="w-full text-xl font-mono flex justify-center items-center h-[90vh]">No teams registered for the event</div>
        )}
      </div>
    </>
  );
};

export default AllTeams;
