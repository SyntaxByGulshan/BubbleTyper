import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { BubbleResultType } from "../types/BubbleResultType";

import PerformanceDashboard from "./PerformanceDashboard";
import TableRecord from "./TableRecord";
export default function Analysis() {
  const [results, setResults] = useState<BubbleResultType[]>([]);
   const [highScore, setHighScore] = useState<number>(0);
  const [topSpeed, setTopSpeed] = useState<number>(0);
  const [totalGames, setTotalGames] = useState<number>(0);
  const [openRecord,setOpenRecord]=useState<boolean>(false);
  // Load results from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("typingGameResult");
    if (savedData) {
      const parsed: BubbleResultType[] = JSON.parse(savedData);
      setResults(parsed);
    }
  }, []);


  // Update stats
  useEffect(() => {
    if (results.length > 0) {
      setHighScore(Math.max(...results.map((r) => r.score)));
      setTopSpeed(Math.max(...results.map((r) => r.speed)));
      setTotalGames(results.length);
    } else {
      setHighScore(0);
      setTopSpeed(0);
      setTotalGames(0);
    }
  }, [results]);

  
  return (
    <div className=" w-full p-4 md:p-12  bg-[#012226] ">
      <h1 className="text-4xl font-extrabold  mb-8 text-center">
         Progress Analysis
      </h1>

      {/* Summary Cards with Animation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className=" shadow-lg rounded-xl p-6 text-center border-2 border-[#02444d]"
        >
          <p >High Score</p>
          <p className="text-3xl font-bold">{highScore}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className=" shadow-lg rounded-xl p-6 text-center border-2 border-[#02444d]"
        >
          <p>Top Speed (WPM)</p>
          <p className="text-3xl font-bold">{topSpeed}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className=" shadow-lg rounded-xl p-6 text-center border-2 border-[#02444d]"
        >
          <p>Total Games</p>
          <p className="text-3xl font-bold">{totalGames}</p>
        </motion.div>
      </div>
      <div className="flex border-t-2 border-[#02444d] rounded-xl">
        <button 
        onClick={()=>setOpenRecord(false)}
        className={`flex-1/2  p-2 rounded-l-xl rounded-b-xl  ${openRecord ? "bg-[#02444d] hover:bg-[#098092] " : "bg-gradient-to-b from-[#033239] to-[#012226]" }`}>
          Progress
        </button>
        <button 
        onClick={()=>setOpenRecord(true)}
        className={`flex-1/2  p-2 rounded-r-xl rounded-b-xl  ${!openRecord ? "bg-[#02444d] hover:bg-[#086e7e]":"bg-gradient-to-b from-[#033239] to-[#012226]" }`}>
          Record
        </button>
      </div>
      <div>
        {openRecord?<TableRecord results={results}/>:<PerformanceDashboard resultsData={results}/>}
      </div>
    </div>
  );
}
