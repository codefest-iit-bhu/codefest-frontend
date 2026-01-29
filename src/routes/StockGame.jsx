import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

function StockGame() {
  const { gameId } = useParams();
  const [gameState, setGameState] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [playerGame, setPlayerGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState(null);
  const [units, setUnits] = useState("");
  const [transactionType, setTransactionType] = useState("buy");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [myGames, setMyGames] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (gameId) {
      fetchGameState();
      const interval = setInterval(fetchGameState, 5000); // Refresh every 5 seconds
      return () => clearInterval(interval);
    }
  }, [gameId]);

  useEffect(() => {
    fetchMyGames();
  }, []);

  useEffect(() => {
    if (gameState && gameState.timeRemaining > 0) {
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
      setStocks(res.data.stocks);
      setPlayerGame(res.data.playerGame);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching game state:", error);
      setLoading(false);
    }
  };

  const fetchMyGames = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/stockGame/my-games", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyGames(res.data.games);
    } catch (error) {
      console.error("Error fetching my games:", error);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-2xl font-bold text-white">Loading game...</div>
      </div>
    );
  }

  if (!playerGame) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Stock Trading Game
          </h1>
          <p className="text-gray-600 mb-6">
            Join the game to start trading stocks!
          </p>
          <button
            onClick={joinGame}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
          >
            Join Game
          </button>

          {/* Show game history button */}
          {myGames.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-300">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                {showHistory ? "Hide" : "View"} My Game History (
                {myGames.length})
              </button>
            </div>
          )}
        </div>

        {/* Game History Modal */}
        {showHistory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  My Game History
                </h2>
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                {myGames.map((game) => (
                  <div key={game._id} className="bg-gray-100 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-800">
                          Game: {game.gameConfig?._id?.slice(-8)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Final Score: ${game.finalScore?.toLocaleString() || 0}
                        </p>
                        <p className="text-sm text-gray-600">
                          Status: {game.isActive ? "In Progress" : "Completed"}
                        </p>
                      </div>
                      <Link
                        to={`/stock-game/${game.gameConfig?._id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!gameState?.isActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-2xl text-center mb-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">
              Game Ended
            </h1>
            <p className="text-gray-600 mb-2">Final Score</p>
            <p className="text-4xl font-bold text-green-600">
              ${playerGame.finalScore?.toLocaleString() || getTotalValue()}
            </p>
          </div>

          {/* Transaction History */}
          {playerGame.transactionHistory &&
            playerGame.transactionHistory.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-xl mb-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Transaction History
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left py-2 px-3 text-gray-700">
                          Round
                        </th>
                        <th className="text-left py-2 px-3 text-gray-700">
                          Type
                        </th>
                        <th className="text-left py-2 px-3 text-gray-700">
                          Stock
                        </th>
                        <th className="text-right py-2 px-3 text-gray-700">
                          Units
                        </th>
                        <th className="text-right py-2 px-3 text-gray-700">
                          Price
                        </th>
                        <th className="text-right py-2 px-3 text-gray-700">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {playerGame.transactionHistory.map((tx, idx) => (
                        <tr key={idx} className="border-b border-gray-200">
                          <td className="py-2 px-3 text-gray-800">
                            {tx.round}
                          </td>
                          <td className="py-2 px-3">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                tx.type === "buy"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {tx.type.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-2 px-3 font-semibold text-gray-800">
                            {tx.stock}
                          </td>
                          <td className="py-2 px-3 text-right text-gray-800">
                            {tx.units}
                          </td>
                          <td className="py-2 px-3 text-right text-gray-800">
                            ${tx.price}
                          </td>
                          <td className="py-2 px-3 text-right font-semibold text-gray-800">
                            ${(tx.units * tx.price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          {/* Final Portfolio */}
          {playerGame.portfolio && playerGame.portfolio.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Final Portfolio
              </h2>
              <div className="space-y-2">
                {playerGame.portfolio.map((holding) => (
                  <div
                    key={holding.stock}
                    className="bg-gray-100 rounded p-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold text-gray-800">{holding.stock}</p>
                      <p className="text-sm text-gray-600">
                        {holding.units} units @ ${holding.averagePrice}
                      </p>
                    </div>
                    <p className="font-bold text-gray-800">
                      ${(holding.units * holding.averagePrice).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 shadow-xl">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold">Stock Trading Game</h1>
              <p className="text-purple-200">
                Year {gameState.currentRound} of {gameState.totalRounds - 1}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-purple-200">Time Remaining</p>
              <p className="text-4xl font-bold">{formatTime(timeRemaining)}</p>
            </div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
            >
              My Games
            </button>
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
                            {holding.units} units @ ${holding.averagePrice}
                          </p>
                        </div>
                        {stock && (
                          <div className="text-right">
                            <p className="font-bold">
                              ${(holding.units * stock.currentPrice).toFixed(2)}
                            </p>
                            <p
                              className={`text-sm ${
                                stock.currentPrice > holding.averagePrice
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {(
                                ((stock.currentPrice - holding.averagePrice) /
                                  holding.averagePrice) *
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
            <h2 className="text-2xl font-bold mb-4">Available Stocks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className={`bg-gray-700 rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-600 ${
                    selectedStock?.symbol === stock.symbol
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => setSelectedStock(stock)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{stock.symbol}</h3>
                      <p className="text-sm text-gray-300">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">
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

          {/* Transaction Section */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Make a Transaction</h2>
            {selectedStock ? (
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
                    onChange={(e) => setUnits(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter units"
                    min="1"
                  />
                  {units > 0 && (
                    <p className="text-sm text-gray-400 mt-2">
                      Total: ${(units * selectedStock.currentPrice).toFixed(2)}
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
                Select a stock to start trading
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Game History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">My Game History</h2>
              <button
                onClick={() => setShowHistory(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              {myGames.map((game) => (
                <div key={game._id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">
                        Game: {game.gameConfig?._id?.slice(-8)}
                      </p>
                      <p className="text-sm text-gray-300">
                        Final Score: ${game.finalScore?.toLocaleString() || 0}
                      </p>
                      <p className="text-sm text-gray-300">
                        Status: {game.isActive ? "In Progress" : "Completed"}
                      </p>
                    </div>
                    <Link
                      to={`/stock-game/${game.gameConfig?._id}`}
                      onClick={() => setShowHistory(false)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockGame;
