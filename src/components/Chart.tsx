
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Result {
  date: string;
  wpm: number;
  score: number;
}

const data: Result[] = [
  { date: "10:10 AM", wpm: 45, score: 120 },
  { date: "10:15 AM", wpm: 52, score: 140 },
  { date: "10:20 AM", wpm: 60, score: 155 },
  { date: "10:25 AM", wpm: 58, score: 148 },
  { date: "10:30 AM", wpm: 63, score: 162 },
];

export default function PerformanceCharts() {
  return (
    <div className=" bg-gray-100 p-6 flex flex-col gap-10 items-center">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Game Performance Over Time
      </h1>

      <div className="flex  gap-2">
        {/* 🔹 WPM vs Time */}
      <div className="flex-1/2 bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4 text-center text-indigo-600">
          Speed (WPM) Over Time
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: "WPM", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="wpm" fill="#6366F1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🔹 Score vs Time */}
      <div className="flex-1/2 h-80 bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4 text-center text-green-600">
          Score Over Time
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: "Score", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#22C55E" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      </div>
    </div>
  );
}
