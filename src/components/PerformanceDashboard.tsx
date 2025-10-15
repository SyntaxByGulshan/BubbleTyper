
import WpmChart from "./WpmChart";
import ScoreChart from "./ScoreChart";
import type { BubbleResultType } from "../types/BubbleResultType";

// const resultsData = [
//   { date: "10:10 AM", wpm: 45, score: 120 },
//   { date: "10:15 AM", wpm: 52, score: 140 },
//   { date: "10:20 AM", wpm: 60, score: 155 },
//   { date: "10:25 AM", wpm: 58, score: 148 },
//   { date: "10:30 AM", wpm: 63, score: 162 },
// ];
interface PerformanceDashboardProps{
  resultsData:BubbleResultType[];
}
export default function PerformanceDashboard({resultsData}:PerformanceDashboardProps) {
  return (
    <div className=" pt-6 flex flex-col gap-10 items-center text-[#cdeef2] bg-[#012226]">
        <div className="w-full flex gap-8 flex-col md:flex-row">
            <WpmChart data={resultsData.map(({ date, speed }) => ({ date, speed }))} />
            <ScoreChart data={resultsData.map(({ date, score }) => ({ date, score }))} />
        </div>
    </div>
  );
}
