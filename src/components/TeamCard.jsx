import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance.js";
import toast from "react-hot-toast";
import events from "../store/events.js";
import "./TeamCard.css";

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

  // Memoized event data
  const currentEvent = events.find((event) => event.id === team.event.eventId);
  const eventName = currentEvent?.name || "Unknown Event";
  const eventDeadline = new Date(currentEvent?.deadline);
  const eventDate = currentEvent?.date || "";

  const now = new Date();
  const canUnregister = now < eventDeadline;
  const isLeader = team.teamLeader === user._id;
  const isTeamEvent = team.event.maxMembers > 1;
  const spaceRemaining = team.event.maxMembers - members.length;

  useEffect(() => {
    setMembers(team.members);
  }, [team.members]);

  const handleDeleteTeam = async () => {
    if (!window.confirm("Do you want to delete the team?")) return;

    setIsProcessing(true);
    try {
      await axios.delete("/team", {
        data: { teamCode: team.teamCode },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      onTeamDelete(team.teamCode);
      toast.success("Team deleted successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete team");
    } finally {
      setIsProcessing(false);
    }
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
      setSelectedNewLeader("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change leader");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLeaveTeam = async () => {
    if (!window.confirm("Do you want to leave this team?")) return;

    setIsProcessing(true);
    try {
      await axios.delete("/member", {
        data: { userId: user._id, teamId: team._id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Team left successfully.");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to leave team");
      setIsProcessing(false);
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (!window.confirm("Do you want to remove this member?")) return;

    setIsProcessing(true);
    try {
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
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove member");
    } finally {
      setIsProcessing(false);
    }
  };

  const eligibleMembers = members.filter(
    (member) =>
      member.user._id !== user._id && member.user._id !== team.teamLeader
  );

  return (
    <div>
      {/* Change Leader Modal */}
      {!all && isChangeLeaderModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => {
            setIsChangeLeaderModalOpen(false);
            setSelectedNewLeader("");
          }}
        >
          <div
            className="relative w-full max-w-[450px] px-4"
            onClick={(e) => e.stopPropagation()}
            style={{ zIndex: 100 }}
          >
            <div className="bg-[rgba(42,42,39,0.88)] rounded-[20px] px-4 py-4 shadow-inner border border-[#D4AF37]/40 relative">
              <button
                type="button"
                onClick={() => {
                  setIsChangeLeaderModalOpen(false);
                  setSelectedNewLeader("");
                }}
                className="absolute top-3 right-3 text-[#D4AF37] hover:text-red-500 text-2xl font-bold transition-colors duration-200"
                aria-label="Close modal"
              >
                ×
              </button>

              <div className="flex justify-center mb-6">
                <div className="inline-flex flex-col items-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#D4AF37] font-bree">
                    CHANGE LEADER
                  </h2>
                  <div className="mt-1 h-[2px] w-[56px] bg-[#BFA76A] rounded-full" />
                  <span className="text-base text-[#BFAF6F] mt-2">
                    Select a new team leader
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <select
                  className="w-full p-3 border border-[#D4AF37]/40 rounded-[12px] bg-[#3A3A36] text-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] font-bree disabled:opacity-50"
                  value={selectedNewLeader}
                  onChange={(e) => setSelectedNewLeader(e.target.value)}
                  disabled={isProcessing}
                >
                  <option value="" className="bg-[#3A3A36] text-[#D4AF37]">
                    Select New Leader
                  </option>
                  {eligibleMembers.map((member) => (
                    <option
                      key={member.user._id}
                      value={member.user._id}
                      className="bg-[#3A3A36] text-[#D4AF37]"
                    >
                      {member.user.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleChangeLeader}
                  disabled={!selectedNewLeader || isProcessing}
                  className="w-full py-3 rounded-[20px] font-bree text-lg text-black bg-[#D4AF37] hover:bg-[#c9a634] transition-colors font-semibold flex items-center justify-center mt-2 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Change Leader"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsChangeLeaderModalOpen(false);
                    setSelectedNewLeader("");
                  }}
                  className="w-full py-3 rounded-[20px] border border-[#D4AF37]/40 mt-2 bg-[#3A3A36] text-[#D4AF37] font-bree font-semibold hover:bg-[#2F2F2C] transition-colors disabled:opacity-50"
                  disabled={isProcessing}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Card */}
      <div className="relative team-card text-[#AA3608] font-bree">
        <img
          src="/Teams/Scroll.webp"
          className="w-full"
          alt="Team card background"
        />
        <div className="absolute inset-0 h-full flex flex-col justify-end items-center">
          <div className="w-[80%] flex flex-col justify-start items-center h-[90%] mt-[35px]">
            {/* Team Name */}
            <h2 className="font-alegreya font-bold truncate w-[100px] text-center">
              {team.teamName}
            </h2>

            {/* Team Info */}
            <div className="RemText text-center">
              <p>Event: {eventName}</p>
              {isTeamEvent && <p>Code: {team.teamCode}</p>}
              <p>Space Remaining: {spaceRemaining}</p>
            </div>

            {/* Members List */}
            <div className="w-[50%]">
              {isTeamEvent ? (
                <>
                  <h5 className="RemText">Members:</h5>
                  <ul className="memberlist">
                    {members.map((member) => (
                      <li
                        key={member.user._id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-1 truncate">
                          <span className="truncate">{member.user.name}</span>
                          {member.user._id === team.teamLeader && (
                            <span className="text-xs">(L)</span>
                          )}
                        </div>
                        {!all && isLeader && member.user._id !== user._id && (
                          <button
                            className="ml-2 font-semibold text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
                            onClick={() => handleRemoveMember(member.user._id)}
                            disabled={isProcessing}
                            aria-label={`Remove ${member.user.name}`}
                          >
                            X
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="h-5" />
              )}
            </div>

            {/* Action Buttons */}
            {!all && (
              <div className="w-[70%] flex items-center justify-center gap-4">
                {isLeader ? (
                  <>
                    {members.length > 1 && (
                      <button
                        className="hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setIsChangeLeaderModalOpen(true)}
                        disabled={isProcessing}
                        aria-label="Change team leader"
                      >
                        <img
                          src="/Teams/ChangeLeaderButton.webp"
                          className="w-[100px] h-auto"
                          alt="Change Leader"
                        />
                      </button>
                    )}
{/* 
                    {canUnregister ? ( */}
                      <button
                        className="hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleDeleteTeam}
                        disabled={isProcessing}
                        aria-label="Delete team"
                      >
                        <img
                          src="/Teams/DeleteTeam.webp"
                          className="w-[100px]"
                          alt="Delete Team"
                        />
                      </button>
                    {/* ) : (
                      <p className="text-sm text-center">
                        Thanks for participating!
                      </p>
                    )} */}
                  </>
                ) : (
                  <button
                    className="hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleLeaveTeam}
                    disabled={isProcessing}
                    aria-label="Leave team"
                  >
                    <img
                      src="/Teams/LeaveTeam.webp"
                      className="w-[100px]"
                      alt="Leave Team"
                    />
                  </button>
                )}
              </div>
            )}

            {/* Event Date */}
            {/* <div className="flex justify-end w-full">
              <span className="Time">{eventDate}</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
