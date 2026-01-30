import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function StockGame() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [gameState, setGameState] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [playerGame, setPlayerGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState(null);
  const [units, setUnits] = useState("");
  const [transactionType, setTransactionType] = useState("buy");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (gameId) {
      fetchGameState();
      fetchLeaderboard();
    
      // const interval = setInterval(() => {
      //   fetchGameState();
      //   fetchLeaderboard();
      // }, 5000); // Refresh every 5 seconds
      // return () => clearInterval(interval);
    }
  }, [gameId]);

  useEffect(() => {
    if (
      gameState &&
      gameState.roundStatus === "active" &&
      gameState.timeRemaining > 0
    ) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState) {
      setTimeRemaining(gameState.timeRemaining);
    }
  }, [gameState?.timeRemaining]);

  const fetchGameState = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/stockGame/state/${gameId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGameState(res.data.gameConfig);

      // Calculate percent changes from prices
      const stocksWithChanges = res.data.stocks.map((stock) => {
        const percentChange =
          ((stock.currentPrice - stock.previousPrice) / stock.previousPrice) *
          100;
        return {
          ...stock,
          change: parseFloat(percentChange.toFixed(2)),
        };
      });

      setStocks(stocksWithChanges);
      setPlayerGame(res.data.playerGame);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching game state:", error);
      setLoading(false);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/stockGame/leaderboard/${gameId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaderboard(res.data.leaderboard);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  const joinGame = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/stockGame/join/${gameId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Joined game successfully!");
      fetchGameState();
    } catch (error) {
      console.error("Error joining game:", error);
      toast.error(error.response?.data?.error || "Failed to join game");
    }
  };

  const handleTransaction = async () => {
    if (!selectedStock || !units || units <= 0) {
      toast.error("Please select a stock and enter valid units");
      return;
    }

    if (gameState.roundStatus !== "active") {
      toast.error("Trading is not available right now");
      return;
    }

    if (timeRemaining <= 0) {
      toast.error("Time expired for this round");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const endpoint =
        transactionType === "buy"
          ? `/stockGame/buy/${gameId}`
          : `/stockGame/sell/${gameId}`;

      await axios.post(
        endpoint,
        {
          stockSymbol: selectedStock.symbol,
          units: parseInt(units),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(
        `${transactionType === "buy" ? "Bought" : "Sold"} ${units} units of ${
          selectedStock.symbol
        } successfully!`
      );
      setUnits("");
      setSelectedStock(null);
      fetchGameState();
      fetchLeaderboard();
    } catch (error) {
      console.error("Error in transaction:", error);
      toast.error(error.response?.data?.error || "Transaction failed");
    }
  };

  const getPortfolioValue = () => {
    if (!playerGame || !stocks) return 0;
    let portfolioValue = 0;
    playerGame.portfolio.forEach((holding) => {
      const stock = stocks.find((s) => s.symbol === holding.stock);
      if (stock) {
        portfolioValue += holding.units * stock.currentPrice;
      }
    });
    return portfolioValue.toFixed(2);
  };

  const getTotalValue = () => {
    if (!playerGame) return 0;
    return (
      parseFloat(playerGame.balance) + parseFloat(getPortfolioValue())
    ).toFixed(2);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getMyRank = () => {
    const myIndex = leaderboard.findIndex(
      (player) => player.user?._id === playerGame?.user
    );
    return myIndex !== -1 ? myIndex + 1 : "-";
  };

  const getRoundStatusMessage = () => {
    if (!gameState) return "";

    if (gameState.roundStatus === "ended") {
      return "Round has ended. Waiting for admin to start next round...";
    } else if (gameState.roundStatus === "waiting") {
      return "Waiting for round to begin...";
    }
    return "";
  };

  const canTrade = () => {
    return gameState?.roundStatus === "active" && timeRemaining > 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-2xl font-bold text-white">Loading game...</div>
      </div>
    );
  }

  // Game not joined yet
  if (!playerGame) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 p-6">
        <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Stock Trading Game
          </h1>

          {gameState?.status === "scheduled" && (
            <>
              <p className="text-gray-600 mb-2">
                Game is scheduled to start at:
              </p>
              <p className="text-xl font-bold text-blue-600 mb-6">
                {new Date(gameState.scheduledStartTime).toLocaleString(
                  "en-IN",
                  {
                    timeZone: "Asia/Kolkata",
                  }
                )}
              </p>
              <p className="text-gray-500 text-sm">
                You cannot join yet. Please wait for the scheduled time.
              </p>
            </>
          )}

          {gameState?.status === "active" && (
            <>
              <p className="text-gray-600 mb-6">
                The game is active! Join now to start trading stocks.
              </p>
              <button
                onClick={joinGame}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Join Game
              </button>
            </>
          )}

          {gameState?.status === "finished" && (
            <>
              <p className="text-gray-600 mb-6">This game has finished.</p>
              <button
                onClick={() => setShowLeaderboard(true)}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                View Leaderboard
              </button>
            </>
          )}
        </div>

        {/* Leaderboard Modal */}
        {showLeaderboard && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Final Leaderboard
                </h2>
                <button
                  onClick={() => setShowLeaderboard(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>
              <LeaderboardTable leaderboard={leaderboard} />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Active or Finished game - same UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 ">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6 flex justify-center">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 shadow-xl">
          <div className="flex justify-center items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold">Stock Trading Game</h1>
              <p className="text-purple-200">
                Round {Math.min(gameState.currentRound + 1,13)} of {gameState.totalRounds}
              </p>
              {gameState.status === "finished" ? (
                <p className="text-yellow-300 font-bold mt-1">🏁 Game Ended</p>
              ) : (
                gameState.roundStatus && (
                  <p className="text-sm text-purple-200 mt-1">
                    {gameState.roundStatus === "active" && "🔵 Trading Active"}
                    {gameState.roundStatus === "ended" && "⏸️ Round Ended"}
                    {gameState.roundStatus === "waiting" && "⏳ Waiting"}
                  </p>
                )
              )}
            </div>

            {gameState.status === "finished" ? (
              <div className="text-center">
                <p className="text-sm text-purple-200">Your Final Score</p>
                <p className="text-4xl font-bold text-yellow-300">
                  ${playerGame.finalScore?.toLocaleString() || getTotalValue()}
                </p>
                <button
                  onClick={() => navigate("/games")}
                  className="mt-3 bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100"
                >
                  Back to Games List
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-purple-200">
                  {gameState.roundStatus === "active"
                    ? "Time Remaining"
                    : "Round Status"}
                </p>
                {gameState.roundStatus === "active" ? (
                  <>
                    <p
                      className={`text-4xl font-bold ${
                        timeRemaining <= 10 ? "text-red-300 animate-pulse" : ""
                      }`}
                    >
                      {formatTime(timeRemaining)}
                    </p>
                    {timeRemaining <= 0 && (
                      <p className="text-sm text-red-300 mt-1">
                        Waiting for admin to end round...
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-xl font-bold text-yellow-300 mt-2">
                    {getRoundStatusMessage()}
                  </p>
                )}
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-purple-200">Your Rank</p>
              <p className="text-2xl font-bold"># {getMyRank()}</p>
              <button
                onClick={() => setShowLeaderboard(true)}
                className="mt-2 bg-white text-purple-600 px-4 py-1 rounded text-sm font-semibold hover:bg-gray-100"
              >
                View Leaderboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Section */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg p-6 shadow-xl mb-6">
            <h2 className="text-2xl font-bold mb-4">Your Portfolio</h2>
            <div className="space-y-3">
              <div className="bg-green-600 rounded-lg p-4">
                <p className="text-sm text-green-100">Cash Balance</p>
                <p className="text-2xl font-bold">
                  ${playerGame.balance.toLocaleString()}
                </p>
              </div>
              <div className="bg-blue-600 rounded-lg p-4">
                <p className="text-sm text-blue-100">Portfolio Value</p>
                <p className="text-2xl font-bold">
                  ${parseFloat(getPortfolioValue()).toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-600 rounded-lg p-4">
                <p className="text-sm text-purple-100">Total Value</p>
                <p className="text-2xl font-bold">
                  ${parseFloat(getTotalValue()).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Holdings */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Your Holdings</h2>
            {playerGame.portfolio.length === 0 ? (
              <p className="text-gray-400">No stocks owned yet</p>
            ) : (
              <div className="space-y-2">
                {playerGame.portfolio.map((holding) => {
                  const stock = stocks.find((s) => s.symbol === holding.stock);
                  return (
                    <div
                      key={holding.stock}
                      className="bg-gray-700 rounded p-3"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold">{holding.stock}</p>
                          <p className="text-sm text-gray-300">
                            {holding.units} units
                          </p>
                        </div>
                        {stock && (
                          <div className="text-right">
                            <p className="font-bold">
                              ${(holding.units * stock.currentPrice).toFixed(2)}
                            </p>
                            <p
                              className={`text-sm ${
                                stock.currentPrice > holding.purchasePrice
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {(
                                ((stock.currentPrice - holding.purchasePrice) /
                                  holding.purchasePrice) *
                                100
                              ).toFixed(2)}
                              %
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Stocks Section */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg p-6 shadow-xl mb-6">
            <h2 className="text-2xl font-bold mb-4">
              {gameState.status === "finished"
                ? "Final Stock Prices"
                : "Available Stocks"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {stocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className={`bg-gray-700 rounded-lg p-4 ${
                    gameState.status !== "finished" && canTrade()
                      ? "cursor-pointer transition-all hover:bg-gray-600"
                      : "opacity-75"
                  } ${
                    selectedStock?.symbol === stock.symbol &&
                    gameState.status !== "finished"
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                  onClick={() =>
                    gameState.status !== "finished" &&
                    canTrade() &&
                    setSelectedStock(stock)
                  }
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-m md:text-xl font-bold">{stock.symbol}</h3>
                      <p className="text-sm text-gray-300">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-l md:text-2xl font-bold">
                        ${stock.currentPrice.toFixed(2)}
                      </p>
                      <p
                        className={`text-sm ${
                          stock.change >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {stock.change >= 0 ? "+" : ""}
                        {stock.change.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction Section or Transaction History */}
          {gameState.status === "finished" ? (
            // Transaction History for finished game
            playerGame.transactionHistory &&
            playerGame.transactionHistory.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2 px-3">Round</th>
                        <th className="text-left py-2 px-3">Type</th>
                        <th className="text-left py-2 px-3">Stock</th>
                        <th className="text-right py-2 px-3">Units</th>
                        <th className="text-right py-2 px-3">Price</th>
                        <th className="text-right py-2 px-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {playerGame.transactionHistory.map((tx, idx) => (
                        <tr key={idx} className="border-b border-gray-700">
                          <td className="py-2 px-3">{tx.round + 1}</td>
                          <td className="py-2 px-3">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                tx.type === "buy"
                                  ? "bg-green-600"
                                  : "bg-red-600"
                              }`}
                            >
                              {tx.type.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-2 px-3 font-semibold">
                            {tx.stock}
                          </td>
                          <td className="py-2 px-3 text-right">{tx.units}</td>
                          <td className="py-2 px-3 text-right">${tx.price}</td>
                          <td className="py-2 px-3 text-right font-semibold">
                            ${(tx.units * tx.price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          ) : (
            // Transaction Section for active game
            <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Make a Transaction</h2>
              {!canTrade() && (
                <div className="bg-yellow-600 text-white p-3 rounded-lg mb-4 text-center">
                  {getRoundStatusMessage() ||
                    "Trading is currently unavailable"}
                </div>
              )}
              {selectedStock && canTrade() ? (
                <div>
                  <div className="mb-4 bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-300">Selected Stock</p>
                    <p className="text-2xl font-bold">
                      {selectedStock.symbol} - $
                      {selectedStock.currentPrice.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex gap-4 mb-4">
                    <button
                      onClick={() => setTransactionType("buy")}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                        transactionType === "buy"
                          ? "bg-green-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => setTransactionType("sell")}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                        transactionType === "sell"
                          ? "bg-red-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      Sell
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-gray-300 mb-2">
                      Number of Units
                    </label>

                    <input
                      type="number"
                      value={units}
                      onChange={(e) => {
                        const value = e.target.value;

                        // Allow empty for backspace
                        if (value === "") {
                          setUnits("");
                          return;
                        }

                        // Allow ONLY positive integers (>= 1)
                        if (/^[1-9]\d*$/.test(value)) {
                          setUnits(Number(value));
                        }
                      }}
                      onWheel={(e) => e.target.blur()}
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "."].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      min="1"
                      step="1"
                      inputMode="numeric"
                      pattern="[1-9][0-9]*"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter units"
                    />

                    {units >= 1 && (
                      <p className="text-sm text-gray-400 mt-2">
                        Total: $
                        {(units * selectedStock.currentPrice).toFixed(2)}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleTransaction}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      transactionType === "buy"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    } text-white`}
                  >
                    {transactionType === "buy" ? "Buy" : "Sell"} {units || 0}{" "}
                    units
                  </button>
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  {!canTrade()
                    ? getRoundStatusMessage() ||
                      "Trading is currently unavailable"
                    : "Select a stock to start trading"}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {gameState.status === "finished"
                  ? "Final Leaderboard"
                  : "Live Leaderboard"}
              </h2>
              <button
                onClick={() => setShowLeaderboard(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>
            <LeaderboardTable
              leaderboard={leaderboard}
              currentUserId={playerGame?.user}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Leaderboard Table Component
function LeaderboardTable({ leaderboard, currentUserId }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="text-left py-3 px-4">Rank</th>
            <th className="text-left py-3 px-4">Player</th>
            <th className="text-left py-3 px-4">Email</th>
            <th className="text-right py-3 px-4">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr
              key={player._id}
              className={`border-b border-gray-600 ${
                player.user?._id === currentUserId
                  ? "bg-blue-900 bg-opacity-30"
                  : ""
              }`}
            >
              <td className="py-3 px-4">
                <span
                  className={`font-bold ${
                    index === 0
                      ? "text-yellow-400 text-xl"
                      : index === 1
                        ? "text-gray-300 text-lg"
                        : index === 2
                          ? "text-orange-400 text-lg"
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
                {player.user?._id === currentUserId && (
                  <span className="text-blue-400 font-bold">(You) </span>
                )}
                {player.user?.name || "N/A"}
              </td>
              <td className="py-3 px-4 text-sm text-gray-400">
                {player.user?.email || "N/A"}
              </td>
              <td className="py-3 px-4 text-right font-bold text-green-400">
                ${player.finalScore?.toLocaleString() || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockGame;
