import React, { useState, useEffect } from "react";
import "./TeamCard.css";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";
import events from "../store/events.js";


const TeamCard = ({ team, onTeamDelete, onMemberUpdate, user }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [members, setMembers] = useState(team.members);
  const eventName = events.find((event) => event.id === team.event.eventId).name;

  const isLeader = team.teamLeader === user._id;
  useEffect(() => {

  }, [team.teamLeader])

  const handleDeleteTeam = async () => {
    setIsProcessing(true);
    await axios.delete(
      "/team",
      {
        data: { teamCode: team.teamCode },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    onTeamDelete(team.teamCode);
    toast.success("Team deleted successfully.");
    setIsProcessing(false);
  };

  const handleChangeLeader = async (newLeaderId) => {
    setIsProcessing(true);
    await axios.patch(
      "/team/changeLeader",
      {
        teamCode: team.teamCode,
        newLeader: newLeaderId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success("Leader changed successfully.");
    team.teamLeader = newLeaderId;
    setIsProcessing(false);
  };

  const handleRemoveMember = async (memberId) => {
    setIsProcessing(true);
    await axios.delete("/member",
      {
        data: { userId: memberId, teamId: team._id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const updatedMembers = members.filter(
      (member) => member.user._id !== memberId
    );
    setMembers(updatedMembers);
    onMemberUpdate(team.teamCode, updatedMembers);
    toast.success("Member removed successfully.");
    setIsProcessing(false);
  };

  return (
    <div className="team-card" id={team.teamName}>
      {/* {isLeader && ( */}
      {
        team.teamLeader === user._id &&
        <button
          className="delete-team-button"
          onClick={handleDeleteTeam}
          disabled={isProcessing}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      }
      {/* )} */}
      <h3 className="team-name">{team.teamName}</h3>
      <p>Event Name: <span className="font-bold">{eventName}</span> </p>
      <p>
        Code: <span className="highlight">{team.teamCode}</span>
      </p>
      <p>
        Space Remaining:{" "}
        <span className="highlight">{team.event.maxMembers - members.length}</span>
      </p>
      <p>Members:</p>
      <ul className="member-list">
        {members.map((member) => (
          <li key={member.user._id} className="member-item text-black">
            {member.user.name}
            {
              (member.user._id === team.teamLeader && <span> (L)</span>)
            }
            {isLeader && member.user._id !== user._id && (
              <button
                className="remove-member-button"
                onClick={() => handleRemoveMember(member.user._id)}
              >
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>
      {/* {isLeader && (
        <> */}
      {
        team.teamLeader === user._id &&
        <>
          <p>Change Leader:</p>
          <select
            className="change-leader-dropdown"
            onChange={(e) => handleChangeLeader(e.target.value)}
            disabled={isProcessing}
          >
            <option value="">--Select Member--</option>
            {members.map((member) => {
              if (member.user._id === user._id || member.user._id === team.teamLeader) return;
              return <option key={member.user._id} value={member.user._id}>
                {member.user.name}
              </option>
            })}
          </select>
        </>
      }
      {/* </>
      )} */}
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default TeamCard;
