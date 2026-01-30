import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function GamesList() {
  const [scheduledGames, setScheduledGames] = useState([]);
  const [activeGames, setActiveGames] = useState([]);
  const [finishedGames, setFinishedGames] = useState([]);
  const [myGames, setMyGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames();
    const interval = setInterval(fetchGames, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchGames = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch all games
      const activeRes = await axios.get("/stockGame/active", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fetch my games
      const myGamesRes = await axios.get("/stockGame/my-games", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allGames = activeRes.data.games;
      // console.log(myGamesRes.data.games);
      // console.log(allGames)
      const myGameIds = myGamesRes.data.games.map((g) => g.gameConfig?._id);

      // Categorize games
      const scheduled = allGames.filter((g) => g?.status === "scheduled");
      const active = allGames.filter((g) => g?.status === "active");

      // Get finished games from myGames
      const finished = myGamesRes.data.games.filter(
        (g) => g.gameConfig?.status === "finished"
      );

      setScheduledGames(scheduled);
      setActiveGames(active);
      setFinishedGames(finished);
      setMyGames(myGameIds);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching games:", error);
      toast.error("Failed to load games");
      setLoading(false);
    }
  };

  const getTimeUntilStart = (scheduledTime) => {
    const now = new Date();
    const start = new Date(scheduledTime);
    const diff = start - now;

    if (diff <= 0) return "Starting soon...";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `Starts in ${hours}h ${minutes}m`;
    }
    return `Starts in ${minutes}m`;
  };

  const hasJoinedGame = (gameId) => {
    return myGames.includes(gameId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-2xl font-bold text-white">Loading games...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Stock Trading Games
        </h1>

        {/* Scheduled Games */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-yellow-600 w-2 h-8 mr-3"></div>
            <h2 className="text-2xl font-bold">Scheduled Games</h2>
          </div>
          {scheduledGames.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
              No scheduled games at the moment
            </div>
          ) : (
            <div className="space-y-4">
              {scheduledGames.map((game) => (
                <div
                  key={game._id}
                  className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors"
                >
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">
                        Game #{game._id.slice(-8)}
                      </h3>
                      <div className="text-sm text-gray-300 space-y-1">
                        <p>
                          📅 Scheduled:{" "}
                          {new Date(game.scheduledStartTime).toLocaleString(
                            "en-IN",
                            { timeZone: "Asia/Kolkata" }
                          )}
                        </p>
                        <p>
                          ⏱️ {game.totalRounds} rounds × {game.roundDuration}s
                          each
                        </p>
                        <p>
                          💰 Initial Balance: $
                          {game.initialBalance.toLocaleString()}
                        </p>
                        <p className="text-yellow-400 font-semibold">
                          {getTimeUntilStart(game.scheduledStartTime)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {hasJoinedGame(game._id) ? (
                        <span className="bg-gray-600 px-6 py-2 rounded-lg text-gray-300">
                          Registered
                        </span>
                      ) : (
                        <span className="bg-gray-700 px-6 py-2 rounded-lg text-gray-400">
                          Can join when it starts
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Games */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-green-600 w-2 h-8 mr-3"></div>
            <h2 className="text-2xl font-bold">Active Games</h2>
          </div>
          {activeGames.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
              No active games at the moment
            </div>
          ) : (
            <div className="space-y-4">
              {activeGames.map((game) => (
                <div
                  key={game._id}
                  className="bg-gray-800 rounded-lg p-6 border-l-4 border-green-500 hover:bg-gray-750 transition-colors"
                >
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">
                          Game #{game._id.slice(-8)}
                        </h3>
                        <span className="bg-green-600 px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                          LIVE
                        </span>
                      </div>
                      <div className="text-sm text-gray-300 space-y-1">
                        <p>
                          🎮 Round {game.currentRound} of {game.totalRounds - 1}
                        </p>
                        <p>⏱️ {game.roundDuration}s per round</p>
                        <p>
                          💰 Initial Balance: $
                          {game.initialBalance.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {hasJoinedGame(game._id) ? (
                        <Link
                          to={`/stock-game/${game._id}`}
                          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition-colors"
                        >
                          Continue Playing
                        </Link>
                      ) : (
                        <Link
                          to={`/stock-game/${game._id}`}
                          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold transition-colors"
                        >
                          Join Now
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Finished Games */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-gray-600 w-2 h-8 mr-3"></div>
            <h2 className="text-2xl font-bold">My Finished Games</h2>
          </div>
          {finishedGames.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
              You haven't completed any games yet
            </div>
          ) : (
            <div className="space-y-4">
              {finishedGames.map((playerGame) => (
                <div
                  key={playerGame._id}
                  className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors"
                >
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">
                        Game #{playerGame.gameConfig._id.slice(-8)}
                      </h3>
                      <div className="text-sm text-gray-300 space-y-1">
                        <p>✅ Completed</p>
                        <p>
                          🏆 Final Score:{" "}
                          <span className="text-green-400 font-bold">
                            ${playerGame.finalScore?.toLocaleString() || 0}
                          </span>
                        </p>
                        <p>
                          📊 {playerGame.transactionHistory?.length || 0}{" "}
                          transactions
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Link
                        to={`/stock-game/${playerGame.gameConfig._id}`}
                        className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-semibold transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GamesList;
