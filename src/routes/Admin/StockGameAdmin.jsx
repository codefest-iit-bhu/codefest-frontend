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

  // Form state for creating game
  const [formData, setFormData] = useState({
    initialBalance: 100000,
    roundDuration: 30, // 30 seconds for testing
    totalRounds: 10,
    scheduledStartTime: "",
    stocks: Array(10)
      .fill(null)
      .map((_, i) => ({
        name: "",
        symbol: "",
        initialPrice: 100,
        percentChanges: Array(10).fill(0),
      })),
  });

  useEffect(() => {
    fetchActiveGames();
    fetchAllGames();
  }, []);

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

  const fetchLeaderboard = async (gameId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/stockGame/leaderboard/${gameId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaderboard(res.data.leaderboard);
      setSelectedGameId(gameId);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      toast.error("Failed to fetch leaderboard");
    }
  };

  const handleStockChange = (index, field, value) => {
    const newStocks = [...formData.stocks];
    newStocks[index][field] = value;
    setFormData({ ...formData, stocks: newStocks });
  };

  const handlePercentChange = (stockIndex, changeIndex, value) => {
    const newStocks = [...formData.stocks];
    newStocks[stockIndex].percentChanges[changeIndex] = parseFloat(value) || 0;
    setFormData({ ...formData, stocks: newStocks });
  };

  const createGame = async () => {
    try {
      const token = localStorage.getItem("token");

      // Validate scheduled start time if provided
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

      if (formData.scheduledStartTime) {
        toast.success(
          `Game created! Will start automatically at ${new Date(formData.scheduledStartTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`
        );
      } else {
        toast.success("Game created successfully!");
      }

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
      toast.error("Failed to start game");
    }
  };

  const advanceRound = async (gameId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `/stockGame/advance/${gameId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(res.data.message);
      fetchActiveGames();
      fetchAllGames();
    } catch (error) {
      console.error("Error advancing round:", error);
      toast.error("Failed to advance round");
    }
  };

  const loadSampleData = () => {
    setFormData({
      initialBalance: 100000,
      roundDuration: 30,
      totalRounds: 10,
      scheduledStartTime: "",
      stocks: [
        {
          name: "Tech Corp",
          symbol: "TECH",
          initialPrice: 150,
          percentChanges: [5, -3, 8, 2, -5, 10, 3, -2, 6, 4],
        },
        {
          name: "Finance Inc",
          symbol: "FIN",
          initialPrice: 200,
          percentChanges: [3, 4, -2, 5, 8, -3, 2, 6, -4, 7],
        },
        {
          name: "Energy Co",
          symbol: "ENRG",
          initialPrice: 80,
          percentChanges: [10, -5, 12, -8, 15, 5, -10, 8, 3, 6],
        },
        {
          name: "Health Plus",
          symbol: "HLTH",
          initialPrice: 120,
          percentChanges: [2, 6, -1, 4, 3, 8, -2, 5, 7, 2],
        },
        {
          name: "Retail Giant",
          symbol: "RETL",
          initialPrice: 95,
          percentChanges: [-2, 5, 3, -4, 8, 6, -3, 4, 9, 2],
        },
        {
          name: "Auto Motors",
          symbol: "AUTO",
          initialPrice: 175,
          percentChanges: [4, -6, 7, 5, -3, 10, 2, -4, 8, 3],
        },
        {
          name: "Food Chain",
          symbol: "FOOD",
          initialPrice: 110,
          percentChanges: [3, 4, 2, -3, 6, 5, 4, -2, 7, 3],
        },
        {
          name: "Travel Air",
          symbol: "TRVL",
          initialPrice: 130,
          percentChanges: [-5, 10, -3, 8, 12, -6, 5, 9, -4, 6],
        },
        {
          name: "Media Net",
          symbol: "MDIA",
          initialPrice: 145,
          percentChanges: [6, 3, -4, 7, 5, 8, -2, 4, 6, 9],
        },
        {
          name: "Pharma Lab",
          symbol: "PHRM",
          initialPrice: 220,
          percentChanges: [8, -2, 5, 6, -4, 9, 3, 7, -3, 10],
        },
      ],
    });
    toast.success("Sample data loaded!");
  };

  const formatDateTimeLocal = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const offset = d.getTimezoneOffset();
    const localDate = new Date(d.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
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
                  Scheduled Start (IST) - Optional
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
                      Percent Changes (10 years)
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {stock.percentChanges.map((change, changeIndex) => (
                        <input
                          key={changeIndex}
                          type="number"
                          step="0.1"
                          value={change}
                          onChange={(e) =>
                            handlePercentChange(
                              index,
                              changeIndex,
                              e.target.value
                            )
                          }
                          className="bg-gray-600 rounded px-2 py-1 text-sm"
                          placeholder={`Y${changeIndex}`}
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

        {/* Active Games */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Active Games</h2>
          {games.length === 0 ? (
            <p className="text-gray-400">No active games</p>
          ) : (
            <div className="space-y-4">
              {games.map((game) => (
                <div key={game._id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">Game ID: {game._id}</p>
                      <p className="text-sm text-gray-300">
                        Round {game.currentRound} of {game.totalRounds - 1}
                      </p>
                      <p className="text-sm text-gray-300">
                        Status:{" "}
                        {game.isActive
                          ? "Active"
                          : game.scheduledStartTime &&
                              new Date(game.scheduledStartTime) > new Date()
                            ? "Scheduled"
                            : game.currentRound >= game.totalRounds - 1
                              ? "Finished"
                              : "Inactive"}
                      </p>
                      {game.scheduledStartTime &&
                        !game.isActive &&
                        new Date(game.scheduledStartTime) > new Date() && (
                          <p className="text-sm text-yellow-400">
                            Starts:{" "}
                            {new Date(game.scheduledStartTime).toLocaleString(
                              "en-IN",
                              { timeZone: "Asia/Kolkata" }
                            )}
                          </p>
                        )}
                      {game.scheduledStartTime &&
                        !game.isActive &&
                        new Date(game.scheduledStartTime) <= new Date() && (
                          <p className="text-sm text-red-400">
                            Should have started - Click "Start Now"
                          </p>
                        )}
                    </div>
                    <div className="flex gap-2">
                      {!game.isActive && (
                        <button
                          onClick={() => startGame(game._id)}
                          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                        >
                          Start Now
                        </button>
                      )}
                      {game.isActive && (
                        <button
                          onClick={() => advanceRound(game._id)}
                          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                        >
                          Next Round
                        </button>
                      )}
                      <button
                        onClick={() => fetchLeaderboard(game._id)}
                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
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

        {/* All Games (Including Finished) */}
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
                      <th className="text-left py-3 px-4">Round</th>
                      <th className="text-left py-3 px-4">Created</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allGames.map((game) => (
                      <tr key={game._id} className="border-b border-gray-700">
                        <td className="py-3 px-4 text-sm">{game._id}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              game.isActive ? "bg-green-600" : "bg-gray-600"
                            }`}
                          >
                            {game.isActive ? "Active" : "Finished"}
                          </span>
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
                            View Leaderboard
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

        {/* Leaderboard */}
        {selectedGameId && leaderboard.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Leaderboard</h2>
              <button
                onClick={() => {
                  setLeaderboard([]);
                  setSelectedGameId(null);
                }}
                className="text-gray-400 hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4">Rank</th>
                    <th className="text-left py-3 px-4">Player</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-right py-3 px-4">Final Score</th>
                    <th className="text-right py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((player, index) => (
                    <tr key={player._id} className="border-b border-gray-700">
                      <td className="py-3 px-4">
                        <span
                          className={`font-bold ${
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
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {player.user?.name || "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        {player.user?.email || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-right font-bold">
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
