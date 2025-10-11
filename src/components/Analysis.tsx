import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { BubbleResultType } from "../types/BubbleResultType";

export default function Analysis() {
  const [results, setResults] = useState<BubbleResultType[]>([]);
  const [filterLevel, setFilterLevel] = useState<BubbleResultType["level"] | "all">("all");
  const [sortField, setSortField] = useState<"score" | "speed">("score");

  const [highScore, setHighScore] = useState<number>(0);
  const [topSpeed, setTopSpeed] = useState<number>(0);
  const [totalGames, setTotalGames] = useState<number>(0);

  // Load results from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("typingGameResult");
    if (savedData) {
      const parsed: BubbleResultType[] = JSON.parse(savedData);
      setResults(parsed);
    }
  }, []);

  // Filter results
  const filteredResults =
    filterLevel === "all"
      ? results
      : results.filter((r) => r.level === filterLevel);

  // Sort results
  const sortedResults = [...filteredResults].sort((a, b) => b[sortField] - a[sortField]);

  // Update stats
  useEffect(() => {
    if (filteredResults.length > 0) {
      setHighScore(Math.max(...filteredResults.map((r) => r.score)));
      setTopSpeed(Math.max(...filteredResults.map((r) => r.speed)));
      setTotalGames(filteredResults.length);
    } else {
      setHighScore(0);
      setTopSpeed(0);
      setTotalGames(0);
    }
  }, [filteredResults]);

  // Clear all results
  const handleClearResults = () => {
    if (confirm("Are you sure you want to clear all results?")) {
      localStorage.removeItem("typingGameResult");
      setResults([]);
      setHighScore(0);
      setTopSpeed(0);
      setTotalGames(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-200 to-gray-100 p-6 md:p-12">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        📊 Game Analysis
      </h1>

      {/* Level Filter & Clear Button */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-700">Filter by Level:</label>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value as BubbleResultType["level"] | "all")}
            className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">All</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="pro">Pro</option>
          </select>
        </div>
        <button
          onClick={handleClearResults}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Clear Results
        </button>
      </div>

      {/* Summary Cards with Animation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white shadow-lg rounded-2xl p-6 text-center"
        >
          <p className="text-gray-500">High Score</p>
          <p className="text-3xl font-bold text-green-500">{highScore}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow-lg rounded-2xl p-6 text-center"
        >
          <p className="text-gray-500">Top Speed (WPM)</p>
          <p className="text-3xl font-bold text-blue-500">{topSpeed}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white shadow-lg rounded-2xl p-6 text-center"
        >
          <p className="text-gray-500">Total Games</p>
          <p className="text-3xl font-bold text-purple-500">{totalGames}</p>
        </motion.div>
      </div>

      {/* Sort Options */}
      <div className="flex justify-end mb-4">
        <label className="mr-2 font-semibold text-gray-700">Sort by:</label>
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value as "score" | "speed")}
          className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="score">Score</option>
          <option value="speed">Speed</option>
        </select>
      </div>

      {/* Detailed Results Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl p-4">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left text-gray-700 font-semibold">Date</th>
              <th className="py-2 px-4 text-left text-gray-700 font-semibold">Level</th>
              <th className="py-2 px-4 text-left text-gray-700 font-semibold">Score</th>
              <th className="py-2 px-4 text-left text-gray-700 font-semibold">Speed (WPM)</th>
              <th className="py-2 px-4 text-left text-gray-700 font-semibold">Correct Input</th>
              <th className="py-2 px-4 text-left text-gray-700 font-semibold">Wrong Input</th>
              <th className="py-2 px-4 text-left text-gray-700 font-semibold">Duration (s)</th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No results available.
                </td>
              </tr>
            ) : (
              sortedResults.map((r, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{r.date ? new Date(r.date).toLocaleDateString() : "-"}</td>
                  <td className="py-2 px-4 capitalize">{r.level}</td>
                  <td className="py-2 px-4">{r.score}</td>
                  <td className="py-2 px-4">{r.speed}</td>
                  <td className="py-2 px-4">{r.correctInput}</td>
                  <td className="py-2 px-4">{r.wrongInput}</td>
                  <td className="py-2 px-4">{r.duration}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
