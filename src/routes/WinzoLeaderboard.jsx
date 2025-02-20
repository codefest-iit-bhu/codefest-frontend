import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

const WinzoLeaderboard = () => {
    const [leaderboard, setLeaderborad] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await axios.get("/winzo/leaderboard", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
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
                setLeaderborad(board);
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
                <h1 className="font-bold font-mono text-4xl py-3">Winzo Leaderboard</h1>

                <section className="font-mono">
                    <h3 className="text-xl text-lime-400 mb-2">Prizes for CAs</h3>
                    <p>Each point corresponds to &#8377;1</p>
                </section>
                <p className="font-mono mt-5 ">
                    <span className="font-bold text-l text-lime-400">Point System: </span>
                    +10 for each referred player (only if the username of the referred player is in the leaderboard of winzo)
                </p>
                <p className="font-mono mt-5 ">
                    <span className="font-bold text-l text-red-500">UNFAIR means</span> to get points will lead to <span className="font-bold text-l text-red-500">rejection of your CA position.</span>
                </p>

                {loading ? (
                    <Loader />
                ) : (
                    <table className="table-auto border border-gray-300 px-6 w-full md:px-0 md:w-3/4 mt-4">
                        <thead>
                            <tr className="text-left font-semibold">
                                <th className="px-4 py-2 border-b">Rank</th>
                                <th className="px-4 py-2 border-b">Name</th>
                                <th className="px-4 py-2 border-b">Institute</th>
                                <th className="px-4 py-2 border-b">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((entry, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className={`${index % 2 === 0 ? "bg-[#1a0e35]" : "bg-[#160b2f]"} font-mono`}
                                    >
                                        <td className="px-4 py-2 border-b text-sm">{entry.rank}</td>
                                        <td className="px-4 py-2 border-b text-sm">{entry.name}</td>
                                        <td className="px-4 py-2 border-b text-sm">
                                            {entry.institute}
                                        </td>
                                        <td className="px-4 py-2 border-b text-sm">
                                            {entry.points}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </main >
        </>
    );
};

export default WinzoLeaderboard;
