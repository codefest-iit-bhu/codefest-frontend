import { useState } from "react";
import { useEffect } from "react";
import axios from "../utils/axiosInstance.js";
import toast from "react-hot-toast";
import events from "../store/events.js";
import "./TeamCard.css"

const TeamCard = ({
  team,
  onTeamDelete,
  onMemberUpdate,
  user,
  all = false,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [members, setMembers] = useState(team.members);
  const [isChangeLeaderModalOpen, setIsChangeLeaderModalOpen] = useState(false);
  const [selectedNewLeader, setSelectedNewLeader] = useState("");
  
  const eventName = events.find(
    (event) => event.id === team.event.eventId
  ).name;

  const eventDeadline = new Date(events.find((event)=> event.id===team.event.eventId).deadline);
  //const canUnregister= new Date() < eventDeadline;
  // console.log(eventDeadline);
  // console.log(new Date());
  // console.log(canUnregister);
  // const eventDeadline = new Date(event.deadline);
  const now = new Date();

  const canUnregister = now < eventDeadline;

  const isLeader = team.teamLeader === user._id;
  useEffect(() => {}, [team.teamLeader]);

  const handleDeleteTeam = async () => {
    const ans = window.confirm("Do you want to delete the team?");
    if (!ans) {
      return;
    }
    setIsProcessing(true);
    await axios.delete("/team", {
      data: { teamCode: team.teamCode },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    onTeamDelete(team.teamCode);
    toast.success("Team deleted successfully.");
    setIsProcessing(false);
  };

  const handleChangeLeader = async () => {
    if (!selectedNewLeader) {
      toast.error("Please select a new leader");
      return;
    }

    setIsProcessing(true);
    try {
      await axios.patch(
        "/team/changeLeader",
        {
          teamCode: team.teamCode,
          newLeader: selectedNewLeader,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Leader changed successfully.");
      team.teamLeader = selectedNewLeader;
      setIsChangeLeaderModalOpen(false);
    } catch (error) {
      toast.error("Failed to change leader");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLeaveTeam = async () => {
    //leave team logic
    const ans = window.confirm("Do you want to leave this team?");
    if (!ans) {
      return;
    }
    const memberId = user._id;
    setIsProcessing(true);
    await axios.delete("/member", {
      data: { userId: memberId, teamId: team._id },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("Team left successfully.");
    setIsProcessing(false);
    window.location.reload();
    return;
  };

  const handleRemoveMember = async (memberId) => {
    const ans = window.confirm("Do you want to delete this member?");
    if (!ans) {
      return;
    }
    setIsProcessing(true);
    await axios.delete("/member", {
      data: { userId: memberId, teamId: team._id },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const updatedMembers = members.filter(
      (member) => member.user._id !== memberId
    );
    setMembers(updatedMembers);
    onMemberUpdate(team.teamCode, updatedMembers);
    toast.success("Member removed successfully.");
    setIsProcessing(false);
  };
  return (
    <div>
      {!all && isChangeLeaderModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-black">
            <h2 className="text-xl font-bold mb-4">Change Team Leader</h2>
            <select
              className="w-full p-2 border rounded mb-4"
              value={selectedNewLeader}
              onChange={(e) => setSelectedNewLeader(e.target.value)}
            >
              <option value="">Select New Leader</option>
              {members.map((member) => {
                // Exclude current leader and current user from selection
                if (
                  member.user._id !== user._id &&
                  member.user._id !== team.teamLeader
                ) {
                  return (
                    <option key={member.user._id} value={member.user._id}>
                      {member.user.name}
                    </option>
                  );
                }
                return null;
              })}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsChangeLeaderModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-400 transition-all cursor-pointer duration-500"
              >
                Cancel
              </button>
              <button
                onClick={handleChangeLeader}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer transition-all duration-500"
                disabled={!selectedNewLeader || isProcessing}
              >
                Change Leader
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative team-card text-[#AA3608] font-bree text-ellipsis">
        <img src="/Teams/Scroll.webp" className="w-full" />
        <div className="absolute inset-0 h-full flex flex-col justify-end items-center">
          <div className="w-[80%] flex-col flex justify-start items-center h-[90%] mt-[35px]">
            <h2 className="font-alegreya font-bold truncate w-[140px] text-center">
              {team.teamName}
            </h2>
            <div className="RemText">
              <p>Event : {eventName}</p>
             {team.event.maxMembers > 1 ? (
              <div>
              <p>Code : {team.teamCode}</p>
              {/* <p>Space Remaining : {team.event.maxMembers - members.length}</p> */}
             </div>
            ) : null}
              {/* <p>Space Remaining : {team.event.maxMembers - members.length}</p> */}
            </div>
            {/* <div className=" w-[70%]">
              {!all &&
              members.length === 1 &&
              team.event.maxMembers - members.length == 0 && team.event.maxMembers > 1 ? (
                <p className="text-center">Invite members by sharing code!!</p>
              team.event.maxMembers - members.length == 0 ? (
                // <p className="text-center">Invite members by sharing code!!</p>
                <div className="h-5"></div>
              ) : (
                <>
                  <h5 className="RemText">Members :</h5>
                  <ul className="memberlist">
                    {members.map((member) => (
                      <li key={member.user._id} className="flex">
                        <div className="flex items-center space-x-2 truncate w-full">
                          {member.user.name}
                        </div>
                        <div>
                          {member.user._id === team.teamLeader && (
                            <span className="ml-1">(L)</span>
                          )}
                        </div>
                        {!all && isLeader && member.user._id !== user._id && (
                          <button
                            className="remove-member-button ml-2 flex font-semibold items-center justify-center text-red-600"
                            onClick={() => handleRemoveMember(member.user._id)}
                          >
                            X
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div> */}

            {!all &&  (
              <div className="w-[70%] Buttons flex justify-around mt-[50px]">
                { true ? ( 
                  // team.teamLeader === user._id
                  <>
                    {/* {members.length > 1 && (
                      <button
                        className="hover:scale-110 transition-all duration-500"
                        onClick={() => setIsChangeLeaderModalOpen(true)}
                        disabled={isProcessing}
                      >
                        <img
                          src="/Teams/ChangeLeaderButton.png"
                          className="h-full"
                        />
                      </button>
                    )} */}

                  {canUnregister ?  <button
                        className="hover:scale-110 transition-all duration-500 relative bottom-[30px]"
                        onClick={handleDeleteTeam}
                        disabled={isProcessing}
                      >
                        <img src="/Teams/UnregisterBtn.webp" className="h-[70px]" />
                      </button>
                      :
                      <p>Thanks for participating!</p>}
                  </>
                ) : (
                  <button
                    className="hover:scale-110 transition-all duration-500"
                    onClick={handleLeaveTeam}
                    disabled={isProcessing}
                  >
                    <img src="/Teams/LeaveTeam.png" className="h-full" />
                  </button>
                )}
              </div>
            )}

            <div className="flex justify-end">
              <span className="Time">
                {events.find((event) => event.id === team.event.eventId).date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
