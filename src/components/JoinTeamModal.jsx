import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";
import InputWithIcon from "./InputWithIcon";
import { Hash } from "lucide-react";

const JoinTeamModal = ({ isOpen, onClose }) => {
  const [teamCode, setTeamCode] = useState("");
  const [error, setError] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setError("");

    if (!teamCode.trim()) {
      setError("Please enter a team code");
      return;
    }

    setButtonLoading(true);

    try {
      await axios.post(
        "/member/join",
        { teamCode: teamCode.trim() },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Successfully joined team");
      setButtonLoading(false);
      navigate("/myTeams");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to join team. Please check the code."
      );
      setButtonLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <form
        onSubmit={handleJoin}
        className="relative w-full max-w-[450px] px-4"
        onClick={(e) => e.stopPropagation()}
        style={{ zIndex: 100 }}
      >
        <div className="bg-[rgba(42,42,39,0.88)] rounded-[20px] px-4 py-4 shadow-inner border border-[#D4AF37]/40 relative">
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
                JOIN TEAM
              </h2>
              <div className="mt-1 h-[2px] w-[56px] bg-[#BFA76A] rounded-full" />
              <span className="text-base text-[#BFAF6F] mt-2">
                Enter your team code
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <InputWithIcon
              icon={<Hash className="w-4 h-4 text-[#D4AF37]" />}
              placeholder="Team Code"
              name="teamCode"
              value={teamCode}
              onChange={(e) => {
                setTeamCode(e.target.value);
                setError("");
              }}
              autoFocus
              maxLength={20}
              disabled={buttonLoading}
            />

            {error && (
              <p className="text-red-500 text-sm text-center font-medium animate-pulse">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!teamCode.trim() || buttonLoading}
              className="w-full py-3 rounded-[20px] font-bree text-lg text-black bg-[#D4AF37] hover:bg-[#c9a634] transition-colors font-semibold flex items-center justify-center mt-2 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
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
                "Join Team"
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-[20px] border border-[#D4AF37]/40 mt-2 bg-[#3A3A36] text-[#D4AF37] font-bree font-semibold hover:bg-[#2F2F2C] transition-colors disabled:opacity-50"
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

export default JoinTeamModal;
