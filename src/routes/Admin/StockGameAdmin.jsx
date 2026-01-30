import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import toast from "react-hot-toast";

function StockGameAdmin() {
  const [games, setGames] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAllGames, setShowAllGames] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [selectedGameStatus, setSelectedGameStatus] = useState(null);

  // Form state for creating game
  const [formData, setFormData] = useState({
    initialBalance: 100000,
    roundDuration: 30,
    totalRounds: 13,
    scheduledStartTime: "",
    stocks: Array(10)
      .fill(null)
      .map((_, i) => ({
        name: "",
        symbol: "",
        initialPrice: 100,
        finalPrices: Array(13).fill(100),
      })),
  });

  useEffect(() => {
    fetchActiveGames();
    fetchAllGames();
    // const interval = setInterval(() => {
    //   fetchActiveGames();
    //   fetchAllGames();
    //   if (selectedGameId) {
    //     fetchLeaderboard(selectedGameId, true);
    //   }
    // }, 3000);
    //return () => clearInterval(interval);
  }, [selectedGameId]);

  const fetchActiveGames = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/stockGame/active", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGames(res.data.games);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const fetchAllGames = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/stockGame/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllGames(res.data.games);
    } catch (error) {
      console.error("Error fetching all games:", error);
    }
  };

  const fetchLeaderboard = async (gameId, silent = false) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/stockGame/leaderboard/${gameId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaderboard(res.data.leaderboard);
      setSelectedGameId(gameId);
      setSelectedGameStatus(res.data.gameStatus);
      if (!silent) {
        toast.success("Leaderboard loaded");
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      if (!silent) {
        toast.error("Failed to fetch leaderboard");
      }
    }
  };

  const handleStockChange = (index, field, value) => {
    const newStocks = [...formData.stocks];
    newStocks[index][field] = value;
    setFormData({ ...formData, stocks: newStocks });
  };

  const handleFinalPriceChange = (stockIndex, priceIndex, value) => {
    const newStocks = [...formData.stocks];
    newStocks[stockIndex].finalPrices[priceIndex] = parseFloat(value) || 0;
    setFormData({ ...formData, stocks: newStocks });
  };

  const createGame = async () => {
    try {
      const token = localStorage.getItem("token");

      if (formData.scheduledStartTime) {
        const scheduledTime = new Date(formData.scheduledStartTime);
        if (scheduledTime <= new Date()) {
          toast.error("Scheduled start time must be in the future");
          return;
        }
      }

      await axios.post("/stockGame/config", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(
        `Game created! Scheduled for ${new Date(formData.scheduledStartTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`
      );

      setShowCreateForm(false);
      fetchActiveGames();
      fetchAllGames();
    } catch (error) {
      console.error("Error creating game:", error);
      toast.error(error.response?.data?.error || "Failed to create game");
    }
  };

  const startGame = async (gameId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/stockGame/start/${gameId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Game started!");
      fetchActiveGames();
      fetchAllGames();
    } catch (error) {
      console.error("Error starting game:", error);
      toast.error(error.response?.data?.error || "Failed to start game");
    }
  };

  const endRound = async (gameId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `/stockGame/end-round/${gameId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(res.data.message);
      fetchActiveGames();
      fetchAllGames();
      if (selectedGameId === gameId) {
        fetchLeaderboard(gameId, true);
      }
    } catch (error) {
      console.error("Error ending round:", error);
      toast.error(error.response?.data?.error || "Failed to end round");
    }
  };

  const startNextRound = async (gameId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `/stockGame/start-next-round/${gameId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(res.data.message);
      fetchActiveGames();
      fetchAllGames();
      if (selectedGameId === gameId) {
        fetchLeaderboard(gameId, true);
      }
    } catch (error) {
      console.error("Error starting next round:", error);
      toast.error(error.response?.data?.error || "Failed to start next round");
    }
  };

  const loadSampleData = () => {
    setFormData({
      initialBalance: 100000,
      roundDuration: 30,
      totalRounds: 13,
      scheduledStartTime: "",
      stocks: [
        {
          name: "Tech Corp",
          symbol: "TECH",
          initialPrice: 150,
          finalPrices: [
            157.5, 152.78, 165, 168.3, 159.89, 175.87, 181.15, 177.52, 188.17,
            195.7, 203.49, 198.15, 211.32,
          ],
        },
        {
          name: "Finance Inc",
          symbol: "FIN",
          initialPrice: 200,
          finalPrices: [
            206, 214.24, 209.95, 220.45, 238.09, 230.94, 235.56, 249.69, 239.7,
            256.48, 268.31, 273.89, 287.45,
          ],
        },
        {
          name: "Energy Co",
          symbol: "ENRG",
          initialPrice: 80,
          finalPrices: [
            88, 83.6, 93.63, 86.14, 99.06, 103.97, 93.57, 101.05, 104.08,
            110.32, 116.84, 108.21, 120.45,
          ],
        },
        {
          name: "Health Plus",
          symbol: "HLTH",
          initialPrice: 120,
          finalPrices: [
            122.4, 129.74, 128.44, 133.58, 137.59, 148.6, 145.62, 152.9, 163.6,
            166.87, 175.21, 181.97, 189.34,
          ],
        },
        {
          name: "Retail Giant",
          symbol: "RETL",
          initialPrice: 95,
          finalPrices: [
            93.1, 97.76, 100.69, 96.66, 104.39, 110.66, 107.34, 111.63, 121.68,
            124.31, 130.53, 127.41, 135.89,
          ],
        },
        {
          name: "Auto Motors",
          symbol: "AUTO",
          initialPrice: 175,
          finalPrices: [
            182, 171.08, 182.85, 192, 186.24, 204.86, 208.96, 200.6, 216.65,
            223.15, 234.31, 227.84, 245.67,
          ],
        },
        {
          name: "Food Chain",
          symbol: "FOOD",
          initialPrice: 110,
          finalPrices: [
            113.3, 117.83, 120.19, 116.58, 123.58, 129.76, 134.95, 132.25,
            141.41, 145.65, 152.93, 149.29, 158.45,
          ],
        },
        {
          name: "Travel Air",
          symbol: "TRVL",
          initialPrice: 130,
          finalPrices: [
            123.5, 135.85, 131.77, 142.31, 159.39, 149.83, 157.32, 171.48,
            164.62, 174.5, 183.23, 178.15, 191.87,
          ],
        },
        {
          name: "Media Net",
          symbol: "MDIA",
          initialPrice: 145,
          finalPrices: [
            153.7, 158.11, 151.78, 162.4, 170.52, 184.16, 180.48, 187.7, 198.96,
            216.87, 228.71, 235.49, 251.23,
          ],
        },
        {
          name: "Pharma Lab",
          symbol: "PHRM",
          initialPrice: 220,
          finalPrices: [
            237.6, 232.85, 244.49, 259.16, 248.79, 271.18, 279.52, 299.08,
            290.11, 319.12, 335.57, 327.39, 351.28,
          ],
        },
      ],
    });
    toast.success("Sample data loaded!");
  };

  const getStatusBadge = (game) => {
    if (game.status === "finished") {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-600">
          Finished
        </span>
      );
    }
    if (game.status === "active") {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 animate-pulse">
          LIVE
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-600">
        Scheduled
      </span>
    );
  };

  const getRoundStatusBadge = (game) => {
    if (game.status !== "active") return null;

    if (game.roundStatus === "active") {
      return (
        <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-500 text-white">
          🔵 Trading Active
        </span>
      );
    } else if (game.roundStatus === "ended") {
      return (
        <span className="px-2 py-1 rounded text-xs font-semibold bg-orange-500 text-white">
          ⏸️ Round Ended
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 rounded text-xs font-semibold bg-purple-500 text-white">
          ⏳ Waiting
        </span>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Stock Game Admin Panel</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAllGames(!showAllGames)}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold"
            >
              {showAllGames ? "Hide All Games" : "View All Games"}
            </button>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
            >
              {showCreateForm ? "Hide Form" : "Create New Game"}
            </button>
          </div>
        </div>

        {/* Create Game Form */}
        {showCreateForm && (
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Create New Game</h2>
              <button
                onClick={loadSampleData}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
              >
                Load Sample Data
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm mb-2">Initial Balance</label>
                <input
                  type="number"
                  value={formData.initialBalance}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      initialBalance: parseInt(e.target.value),
                    })
                  }
                  className="w-full bg-gray-700 rounded px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">
                  Round Duration (seconds)
                </label>
                <input
                  type="number"
                  value={formData.roundDuration}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      roundDuration: parseInt(e.target.value),
                    })
                  }
                  className="w-full bg-gray-700 rounded px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Total Rounds</label>
                <input
                  type="number"
                  value={formData.totalRounds}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      totalRounds: parseInt(e.target.value),
                    })
                  }
                  className="w-full bg-gray-700 rounded px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">
                  Scheduled Start (IST) - Required
                </label>
                <input
                  type="datetime-local"
                  value={formData.scheduledStartTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      scheduledStartTime: e.target.value,
                    })
                  }
                  className="w-full bg-gray-700 rounded px-4 py-2"
                  required
                />
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4">Stocks Configuration</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {formData.stocks.map((stock, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-bold mb-3">Stock {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="Name"
                      value={stock.name}
                      onChange={(e) =>
                        handleStockChange(index, "name", e.target.value)
                      }
                      className="bg-gray-600 rounded px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Symbol"
                      value={stock.symbol}
                      onChange={(e) =>
                        handleStockChange(index, "symbol", e.target.value)
                      }
                      className="bg-gray-600 rounded px-3 py-2"
                    />
                    <input
                      type="number"
                      placeholder="Initial Price"
                      value={stock.initialPrice}
                      onChange={(e) =>
                        handleStockChange(
                          index,
                          "initialPrice",
                          parseFloat(e.target.value)
                        )
                      }
                      className="bg-gray-600 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">
                      Final Prices (13 rounds)
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {stock.finalPrices.map((price, priceIndex) => (
                        <input
                          key={priceIndex}
                          type="number"
                          step="0.01"
                          value={price}
                          onChange={(e) =>
                            handleFinalPriceChange(
                              index,
                              priceIndex,
                              e.target.value
                            )
                          }
                          className="bg-gray-600 rounded px-2 py-1 text-sm"
                          placeholder={`R${priceIndex + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={createGame}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold"
            >
              Create Game
            </button>
          </div>
        )}

        {/* Active/Scheduled Games */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Active & Scheduled Games</h2>
          {games.length === 0 ? (
            <p className="text-gray-400">No active or scheduled games</p>
          ) : (
            <div className="space-y-4">
              {games.map((game) => (
                <div
                  key={game._id}
                  className="bg-gray-700 rounded-lg p-4 border-l-4 border-blue-500"
                >
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-bold text-lg">
                          Game #{game._id.slice(-8)}
                        </p>
                        {getStatusBadge(game)}
                        {getRoundStatusBadge(game)}
                      </div>
                      <div className="text-sm text-gray-300 space-y-1">
                        {game.status === "scheduled" && (
                          <p className="text-yellow-400">
                            📅 Starts:{" "}
                            {new Date(game.scheduledStartTime).toLocaleString(
                              "en-IN",
                              { timeZone: "Asia/Kolkata" }
                            )}
                          </p>
                        )}
                        {game.status === "active" && (
                          <p>
                            🎮 Round {game.currentRound + 1} of{" "}
                            {game.totalRounds}
                          </p>
                        )}
                        <p>
                          ⏱️ {game.roundDuration}s per round | 💰 $
                          {game.initialBalance.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {game.status === "scheduled" &&
                        new Date(game.scheduledStartTime) <= new Date() && (
                          <button
                            onClick={() => startGame(game._id)}
                            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold"
                          >
                            Start Game
                          </button>
                        )}
                      {game.status === "active" &&
                        game.roundStatus === "active" && (
                          <button
                            onClick={() => endRound(game._id)}
                            className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-semibold"
                          >
                            End Round
                          </button>
                        )}
                      {game.status === "active" &&
                        game.roundStatus === "ended" && (
                          <button
                            onClick={() => startNextRound(game._id)}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold"
                          >
                            {game.currentRound >= game.totalRounds - 1
                              ? "End Game"
                              : "Start Next Round"}
                          </button>
                        )}
                      <button
                        onClick={() => fetchLeaderboard(game._id)}
                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold"
                      >
                        Leaderboard
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* All Games Table */}
        {showAllGames && (
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">All Games</h2>
            {allGames.length === 0 ? (
              <p className="text-gray-400">No games found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4">Game ID</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Round Status</th>
                      <th className="text-left py-3 px-4">Round</th>
                      <th className="text-left py-3 px-4">Created</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allGames.map((game) => (
                      <tr key={game._id} className="border-b border-gray-700">
                        <td className="py-3 px-4 text-sm">
                          #{game._id.slice(-8)}
                        </td>
                        <td className="py-3 px-4">{getStatusBadge(game)}</td>
                        <td className="py-3 px-4">
                          {getRoundStatusBadge(game)}
                        </td>
                        <td className="py-3 px-4">
                          {game.currentRound} / {game.totalRounds - 1}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {new Date(game.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => fetchLeaderboard(game._id)}
                            className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-sm"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Live Leaderboard */}
        {selectedGameId && leaderboard.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedGameStatus === "active"
                    ? "Live Leaderboard 🔴"
                    : "Final Leaderboard"}
                </h2>
                <p className="text-sm text-gray-400">
                  {selectedGameStatus === "active"
                    ? "Updates every 3 seconds"
                    : "Game has ended"}
                </p>
              </div>
              <button
                onClick={() => {
                  setLeaderboard([]);
                  setSelectedGameId(null);
                }}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕ Close
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4">Rank</th>
                    <th className="text-left py-3 px-4">Player</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-right py-3 px-4">Score</th>
                    <th className="text-right py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((player, index) => (
                    <tr
                      key={player._id}
                      className="border-b border-gray-700 hover:bg-gray-700"
                    >
                      <td className="py-3 px-4">
                        <span
                          className={`font-bold text-lg ${
                            index === 0
                              ? "text-yellow-400"
                              : index === 1
                                ? "text-gray-300"
                                : index === 2
                                  ? "text-orange-400"
                                  : ""
                          }`}
                        >
                          {index + 1}
                          {index === 0 && " 🏆"}
                          {index === 1 && " 🥈"}
                          {index === 2 && " 🥉"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {player.user?.name || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400">
                        {player.user?.email || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-green-400 text-lg">
                        ${player.finalScore?.toLocaleString() || 0}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            player.isActive ? "bg-green-600" : "bg-gray-600"
                          }`}
                        >
                          {player.isActive ? "Playing" : "Finished"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StockGameAdmin;
