import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Winzo_AddCard from "../components/WinzoAddModel";

const Winzo_Referral = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get("/ca/leaderboard");
        const data = response.data;
        let currentRank = 1;
        let board = [];
        for (let i = 0; i < data.length; i++) {
          let rank;
          if (i > 0 && data[i].points === data[i - 1].points) {
            rank = currentRank;
          } else {
            rank = i + 1;
          }
          currentRank = rank;
          board.push({ ...data[i], rank });
        }
        setLeaderboard(board);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-[#140B29] flex flex-col items-center w-full min-h-[100vh] p-4">
        <h1 className="font-bold font-mono text-4xl py-3">Winzo Referral</h1>

        <p className="font-mono mt-5">
          <span className="font-bold text-l text-lime-400">Point System: </span>
          +  &#8377;10 for each participant's Winzo Referral
        </p>
        <p className="font-mono mt-5">
          <span className="font-bold text-l text-red-500">UNFAIR means</span>{" "}
          (registering through fake emails etc) to get points will lead to{" "}
          <span className="font-bold text-l text-red-500">
            rejection of your CA position.
          </span>
        </p>

        <button
          className="bg-lime-600 text-white p-3 font-bold rounded-lg hover:bg-lime-700 transition-colors mt-4"
          onClick={() => setIsCardOpen(true)}
        >
          Click here to Add Referee
        </button>

        {isCardOpen && (
          <Winzo_AddCard isOpen={isCardOpen} onClose={() => setIsCardOpen(false)} />
        )}

        {loading ? (
          <Loader />
        ) : (
          <table className="table-auto border border-gray-300 px-6 w-full md:px-0 md:w-3/4 mt-4">
            <thead>
              <tr className="text-left font-semibold">
                <th className="px-4 py-2 border-b">#</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Username</th>
                <th className="px-4 py-2 border-b">Email Address</th>
                <th className="px-4 py-2 border-b">Verification Status</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-[#1a0e35]" : "bg-[#160b2f]"
                  } font-mono`}
                >
                  <td className="px-4 py-2 border-b text-sm">{entry.srno}</td>
                  <td className="px-4 py-2 border-b text-sm">{entry.name}</td>
                  <td className="px-4 py-2 border-b text-sm">{entry.username}</td>
                  <td className="px-4 py-2 border-b text-sm">{entry.email}</td>
                  <td className="px-4 py-2 border-b text-sm">
                    {entry.verification_status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
};

export default Winzo_Referral;
