import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gamepad2 } from 'lucide-react';

export type LevelType = "beginner" | "intermediate" | "pro";

export default function LevelSelector() {
  const [level, setLevel] = useState<LevelType>(
    (localStorage.getItem("level") as LevelType) || "beginner"
  );

  // Save to localStorage whenever level changes
  useEffect(() => {
    localStorage.setItem("level", level);
  }, [level]);

  return (
    <motion.div
      className="flex flex-col items-center space-y-3 p-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h2
        className="md:text-xl font-semibold text-[#6acdd9] flex gap-2"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
      >
        <Gamepad2/> <span>Select Difficulty</span> 
      </motion.h2>

      <div className="flex gap-4 flex-wrap justify-center">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLevel("beginner")}
          className={`md:px-4 md:py-2 py-1 px-2 rounded-lg md:font-semibold transition-all duration-200 
            ${
              level === "beginner"
                ? "bg-green-500 text-[#cdeef2] shadow-lg scale-105"
                : "bg-[#cdf2de] text-[#012226] hover:bg-[#9bdde6]"
            }`}
        >
          Beginner
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLevel("intermediate")}
          className={`md:px-4 md:py-2 px-2 py-1 rounded-lg md:font-semibold transition-all duration-200 
            ${
              level === "intermediate"
                ? "bg-yellow-500 text-[#cdeef2] shadow-lg scale-105"
                : "bg-[#cdeef2] text-[#012226] hover:bg-[#9bdde6]"
            }`}
        >
          Intermediate
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLevel("pro")}
          className={`md:px-4 md:py-2 p-1 px-2 py-1 rounded-lg md:font-semibold transition-all duration-200 
            ${
              level === "pro"
                ? "bg-red-500 text-[#cdeef2] shadow-lg scale-105"
                : "bg-[#cdeef2] text-[#012226] hover:bg-[#9bdde6]"
            }`}
        >
          Pro
        </motion.button>
      </div>
    </motion.div>
  );
}
