/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const TeamRegistrationModal = ({ isOpen, onClose, event }) => {
  const [teamName, setTeamName] = useState("");
  const [teamNameStatus, setTeamNameStatus] = useState("");
  const navigate = useNavigate();

  // Debounce utility function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Team name validation
  const validateTeamName = async (name) => {
    if (!name) {
      setTeamNameStatus("");
      return;
    }

    try {
      console.log(teamName);
      const response = await fetch(
        "https://codefest-backend-igxy.onrender.com/api/v1/team/name_available",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );

      const data = await response.json();

      setTeamNameStatus(data.status === "success" ? "available" : "taken");
    } catch (error) {
      console.error("Team name validation error:", error);
      setTeamNameStatus("error");
    }
  };

  // Debounced validation
  const debouncedValidation = useCallback(debounce(validateTeamName, 1000), []);

  // Handle team name input change
  const handleTeamNameChange = (e) => {
    const name = e.target.value;
    setTeamName(name);
    debouncedValidation(name);
  };

  // Handle team registration submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (teamNameStatus !== "available") return;

    try {
      console.log(teamName, event.id);
      const response = await fetch(
        "https://codefest-backend-igxy.onrender.com/api/v1/team/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teamName: teamName,
            eventId: event.id,
          }),
          withCredentials: true,
        }
      );

      const data = await response.json();

      if (data.success) {
        navigate("/myTeams");
      } else {
        // Handle registration failure
        alert(data.message);
      }
    } catch (error) {
      console.error("Team registration error:", error);
      alert("An error occurred during registration");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 w-96 max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          Register Team for {event.name}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Team Name"
            value={teamName}
            onChange={handleTeamNameChange}
            className={`
              w-full px-3 py-2 border rounded-md text-black
              ${teamNameStatus === "taken" ? "border-red-500" : ""}
              ${teamNameStatus === "available" ? "border-green-500" : ""}
            `}
            required
          />

          {teamNameStatus === "taken" && (
            <p className="text-red-500 text-sm">Team name is already taken</p>
          )}

          {teamNameStatus === "available" && (
            <p className="text-green-500 text-sm">Team name is available</p>
          )}

          <button
            type="submit"
            disabled={teamNameStatus !== "available"}
            className={`
              w-full py-2 rounded-md text-black font-semibold
              ${
                teamNameStatus === "available"
                  ? "bg-lime-600 hover:bg-lime-700"
                  : "bg-gray-400 cursor-not-allowed"
              }
            `}
          >
            Create Team
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 rounded-md border border-gray-300 mt-2 bg-red-400 text-black"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamRegistrationModal;
