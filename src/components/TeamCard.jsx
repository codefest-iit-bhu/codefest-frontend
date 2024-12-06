import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeamCard.css";

const TeamCard = ({ team, onTeamDelete, onMemberUpdate }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [members, setMembers] = useState(team.members);

  useEffect(() => {
    // Fetch current user ID
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("/user/me");
        setCurrentUserId(response.data._id);
      } catch (err) {
        console.error("Failed to fetch current user:", err);
      }
    };
    fetchCurrentUser();
  }, []);

  const isLeader = team.teamLeader === currentUserId;

  const handleDeleteTeam = async () => {
    // if (!isLeader) return;
    setIsProcessing(true);
    try {
      const response = await axios.delete("/team", {
        data: { teamCode: team.teamCode },
      });
      if (response.data.success) {
        onTeamDelete(team.teamCode);
        setMessage("Team deleted successfully.");
      } else {
        setMessage(response.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete the team.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChangeLeader = async (newLeaderId) => {
    setIsProcessing(true);
    try {
      const response = await axios.post("/team/changeLeader", {
        teamCode: team.teamCode,
        newLeader: newLeaderId,
      });
      if (response.data.success) {
        setMessage("Leader changed successfully.");
        setMembers(
          members.map((member) =>
            member._id === newLeaderId
              ? { ...member, isLeader: true }
              : { ...member, isLeader: false }
          )
        );
      } else {
        setMessage(response.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to change leader.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveMember = async (memberId) => {
    setIsProcessing(true);
    try {
      const response = await axios.delete("/member", {
        data: { userId: memberId, teamId: team._id },
      });
      if (response.data.status === "success") {
        const updatedMembers = members.filter((member) => member._id !== memberId);
        setMembers(updatedMembers);
        onMemberUpdate(team.teamCode, updatedMembers);
        setMessage("Member removed successfully.");
      } else {
        setMessage(response.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to remove member.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="team-card">
      {/* {isLeader && ( */}
        <button
          className="delete-team-button"
          onClick={handleDeleteTeam}
          disabled={isProcessing}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      {/* )} */}
      <h3 className="team-name">{team.teamName}</h3>
      <p>
        Code: <span className="highlight">{team.teamCode}</span>
      </p>
      <p>
        Space Remaining:{" "}
        <span className="highlight">{team.maxMembers - members.length}</span>
      </p>
      <p>Members:</p>
      <ul className="member-list">
        {members.map((member) => (
          <li key={member._id} className="member-item">
            {member.name}
            {isLeader && member._id !== currentUserId && (
              <button
                className="remove-member-button"
                onClick={() => handleRemoveMember(member._id)}
              >
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>
      {/* {isLeader && (
        <> */}
          <p>Change Leader:</p>
          <select
            className="change-leader-dropdown"
            onChange={(e) => handleChangeLeader(e.target.value)}
            disabled={isProcessing}
          >
            <option value="">--Select Member--</option>
            {members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name}
              </option>
            ))}
          </select>
        {/* </>
      )} */}
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default TeamCard;
