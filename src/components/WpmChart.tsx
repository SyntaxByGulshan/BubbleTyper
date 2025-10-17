
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



interface WpmChartProps {
  data: BubbleResultType[];
}

// ✅ Custom Tooltip Component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-indigo-100 border border-indigo-500 rounded-lg p-2 shadow text-sm">
        <p className="font-semibold text-indigo-700">Date: {item.date}</p>
        <p className="text-indigo-800">WPM: {item.speed}</p>
        <p className="text-indigo-800">Score: {item.score}</p>
      </div>
    );
  }
  return null;
};

export default function WpmChart({ data }: WpmChartProps) {
  //  Take only first 5 records
  const chartData = data.slice(0, 5).map((item, index) => ({
    ...item,
    index: index + 1, // For X-axis numbering
  }));

  return (
    <div className="md:w-full h-80 rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4 text-center text-indigo-600">
        Speed (WPM) Over Time
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          {/* X-Axis shows index numbers */}
          <XAxis dataKey="index" label={{  position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: "WPM", angle: -90, position: "insideLeft" }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="speed" fill="#6366F1" radius={[6, 6, 0, 0]} name="Typing Speed (WPM)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
