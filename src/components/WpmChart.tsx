
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
  data: { date: string; speed: number }[];
}

export default function WpmChart({ data }: WpmChartProps) {
  return (
    <div className="md:w-full h-80  rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4 text-center text-indigo-600">
        Speed (WPM) Over Time
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis />
          <YAxis label={{ value: "WPM", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="speed" fill="#6366F1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
