
import type { BubbleResultType } from "../types/BubbleResultType";

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

interface ScoreChartProps {
  data: BubbleResultType[];
}

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-green-100 border border-green-500 rounded-lg p-2 shadow text-sm">
        <p className="font-semibold text-green-700">Date: {item.date}</p>
        <p className="text-green-800">Score: {item.score}</p>
      </div>
    );
  }
  return null;
};

export default function ScoreChart({ data }:ScoreChartProps) {
  //  Show only first 5 records
  const chartData = data.slice(0, 5).map((item) => ({
    ...item
   
  })).reverse();
  return (
    <div className="md:w-full h-80 rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4 text-center text-green-600">
        Score Over Attempts
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="attempt" label={{ position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: "Score", angle: -90, position: "insideLeft" }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="score" fill="#22C55E" radius={[6, 6, 0, 0]} name="Score" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
