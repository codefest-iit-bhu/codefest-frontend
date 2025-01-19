/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";

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

    const response = await axios.post(
      "/team/name_available",
      { name, eventId: event.id },
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    const { data } = response;

    setTeamNameStatus(data.status === "success" ? "available" : "taken");
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

    await axios.post(
      "/team/create",
      {
        teamName: teamName,
        eventId: event.id,
      },
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    toast.success("Team registered successfully")
    return navigate("/myTeams");
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
              ${teamNameStatus === "available"
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
