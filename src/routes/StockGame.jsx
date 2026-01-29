import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
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

  useEffect(() => {
    if (gameId) {
      fetchGameState();
      const interval = setInterval(fetchGameState, 5000); // Refresh every 5 seconds
      return () => clearInterval(interval);
    }
  }, [gameId]);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold">Loading game...</div>
      </div>
    );
  }

  if (!playerGame) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
          <h1 className="text-3xl font-bold mb-4">Stock Trading Game</h1>
          <p className="text-gray-600 mb-6">
            Join the game to start trading stocks!
          </p>
          <button
            onClick={joinGame}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Join Game
          </button>
        </div>
      </div>
    );
  }

  if (!gameState?.isActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
          <h1 className="text-3xl font-bold mb-4">Game Ended</h1>
          <p className="text-gray-600 mb-2">Final Score</p>
          <p className="text-4xl font-bold text-green-600">
            ${playerGame.finalScore?.toLocaleString() || getTotalValue()}
          </p>
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
    </div>
  );
}

export default StockGame;
