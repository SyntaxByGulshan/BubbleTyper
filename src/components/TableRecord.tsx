import { useState } from "react";
import type { BubbleResultType } from "../types/BubbleResultType";

interface TableRecordProps {
  results: BubbleResultType[];
}

export default function TableRecord({ results }: TableRecordProps) {
  const [filterLevel, setFilterLevel] = useState<BubbleResultType["level"] | "all">("all");
  const [sortField, setSortField] = useState<"score" | "speed">("score");

  const filteredResults =
    filterLevel === "all"
      ? results
      : results.filter((r) => r.level === filterLevel);

  const sortedResults = [...filteredResults].sort(
    (a, b) => b[sortField] - a[sortField]
  );

  return (
    <div>
      <div className="flex md:flex-row justify-between items-center gap-4 p-2 text-[#cdeef2]">
        {/* Filter dropdown */}
        <div className="flex items-center gap-2 text-[#6acdd9]">
          <label className="font-semibold">Level:</label>
          <select
            value={filterLevel}
            onChange={(e) =>
              setFilterLevel(e.target.value as BubbleResultType["level"] | "all")
            }
            className="border rounded-lg px-3 py-1 focus:outline-none bg-[#012226]"
          >
            <option value="all">All</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="pro">Pro</option>
          </select>
        </div>

        

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 text-[#6acdd9]">
          <label className="mr-2 font-semibold ">Sort by:</label>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as "score" | "speed")}
            className="border border-gray-300 bg-[#012226] rounded-lg px-3 py-1 focus:outline-none"
          >
            <option value="score">Score</option>
            <option value="speed">Speed</option>
          </select>
        </div>
        {/* Clear Button */}
        <button
          onClick={() => {
            localStorage.removeItem("bubbleResults");
            window.location.reload();
          }}
          className="bg-red-500 hover:bg-red-600  px-4 py-2 rounded-lg shadow"
        >
          Clear Results
        </button>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto shadow rounded-xl">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="">
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
                <tr
                  key={idx}
                  className={`border-t ${idx % 2 === 0 ? "" : ""} hover:bg-[#02444d] hover:text-white`}
                >
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
