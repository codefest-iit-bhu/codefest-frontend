/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars

import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";
import InputWithIcon from "./InputWithIcon";
import { User } from "lucide-react";

const TeamRegistrationModal = ({ isOpen, onClose, event }) => {
  const [teamName, setTeamName] = useState("");
  const [teamNameStatus, setTeamNameStatus] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [checkingName, setCheckingName] = useState(false);
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
      setCheckingName(false);
      return;
    }
    setCheckingName(true);
    try {
      const response = await axios.post(
        "/team/name_available",
        { name, eventId: event.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { data } = response;
      setTeamNameStatus(data.status === "success" ? "available" : "taken");
    } catch {
      setTeamNameStatus("");
    } finally {
      setCheckingName(false);
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
    setButtonLoading(true);

    await axios.post(
      "/team/create",
      {
        teamName: teamName,
        eventId: event.id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    toast.success("Team registered successfully");
    setButtonLoading(false);
    return navigate("/myTeams");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-[450px] px-4"
        onClick={(e) => e.stopPropagation()}
        style={{ zIndex: 100 }}
      >
        <div
          className="bg-[rgba(42,42,39,0.88)] rounded-[20px] px-4 py-4 shadow-inner border border-[#D4AF37]/40 relative"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 text-[#D4AF37] hover:text-red-500 text-2xl font-bold transition-colors duration-200"
            aria-label="Close modal"
          >
            ×
          </button>
          <div className="flex justify-center mb-6">
            <div className="inline-flex flex-col items-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#D4AF37] font-bree">
                REGISTER TEAM
              </h2>
              <div className="mt-1 h-[2px] w-[56px] bg-[#BFA76A] rounded-full" />
              <span className="text-base text-[#BFAF6F] mt-2">for {event.name}</span>
            </div>
          </div>
          <div className="space-y-4">
            <InputWithIcon
              icon={<User className="w-4 h-4 text-[#D4AF37]" />}
              rightIcon={
                checkingName ? (
                  <svg className="animate-spin h-4 w-4 text-[#D4AF37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null
              }
              placeholder="Team Name"
              name="teamName"
              value={teamName}
              onChange={handleTeamNameChange}
              autoFocus
              maxLength={32}
              disabled={buttonLoading}
            />

            {teamNameStatus === "taken" && (
              <p className="text-red-500 text-sm text-center font-medium animate-pulse">Team name is already taken</p>
            )}

            {teamNameStatus === "available" && (
              <p className="text-green-400 text-sm text-center font-medium">Team name is available</p>
            )}

            <button
              type="submit"
              disabled={teamNameStatus !== "available" || buttonLoading}
              className="w-full py-3 rounded-[20px] font-bree text-lg text-black bg-[#D4AF37] hover:bg-[#c9a634] transition-colors font-semibold flex items-center justify-center mt-2 disabled:bg-gray-400 disabled:text-gray-200"
            >
              {buttonLoading ? (
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
                "Create Team"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-[20px] border border-[#D4AF37]/40 mt-2 bg-[#3A3A36] text-[#D4AF37] font-bree font-semibold hover:bg-[#2F2F2C] transition-colors"
              disabled={buttonLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TeamRegistrationModal;
