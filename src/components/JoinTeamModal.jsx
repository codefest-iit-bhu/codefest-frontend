import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinTeamModal = ({ isOpen, onClose }) => {
  const [teamCode, setTeamCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoin = async () => {
    try {
      // Reset previous errors
      setError("");

      // Make API call to join team using fetch
      const response = await fetch("/member/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamCode }),
      });

      const data = await response.json();
      //setError("Failed to join team");

      // If successful, redirect to /myTeams
      if (data.success) {
        navigate("/myTeams");
      } else {
        // Set error message from backend
        setError(data.message || "Failed to join team");
      }
    } catch (err) {
      // Handle network errors
      setError("Failed to join team");

      //setError(data.message || "Failed to join team");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          x
        </button>

        <h2 className="text-2xl font-bold mb-4 text-lime-600">Join Team</h2>

        <div className="mb-4">
          <label
            htmlFor="teamCode"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Team Code
          </label>
          <input
            type="text"
            id="teamCode"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
            className=" text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            placeholder="Enter team code"
          />
        </div>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleJoin}
            className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinTeamModal;
