import WpmChart from "./WpmChart";
import ScoreChart from "./ScoreChart";
import type { BubbleResultType } from "../types/BubbleResultType";

interface PerformanceDashboardProps {
  resultsData: BubbleResultType[];
}
export default function PerformanceDashboard({
  resultsData,
}: PerformanceDashboardProps) {

  
  return (
    <div className=" pt-6 flex flex-col gap-10 items-center text-[#cdeef2] bg-[#012226]">
      <div className="w-full flex gap-8 flex-col md:flex-row">
        <WpmChart
          data={resultsData}
        />
        <ScoreChart
          data={resultsData}
        />
      </div>
    </div>
  );
}
