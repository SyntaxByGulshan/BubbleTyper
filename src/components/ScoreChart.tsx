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
  data: { date: string; score: number }[];
}

export default function ScoreChart({ data }: ScoreChartProps) {
  return (
    <div className=" md:w-full h-80   rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4 text-center text-green-600">
        Score Over Time
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis />
          <YAxis label={{ value: "Score", angle: -90, position: "insideLeft" }} />
          <Tooltip  />
          <Legend />
          <Bar dataKey="score" fill="#22C55E" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
