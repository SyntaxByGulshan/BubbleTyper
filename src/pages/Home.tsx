import { useState } from "react";
import Header from "../components/Header";
import Analysis from "../components/Analysis";
import { useGameStats } from "../customHook/useGameStats";
import LevelSelector from "../components/LevalSelector";
import TypingGame from "../games/TypingGame";
import StartButton from "../components/StartButton";
export default function Home() {
  const [gameStart, setGameStart] = useState<true | false>(false);
  const [showAnalysis, setShowAnalysis] = useState<true | false>(false);
  const { highScore, topSpeed, totalGames } = useGameStats();
  return (
    <div className="flex flex-col md:w-screen h-screen text-[#cdeef2] bg-[#012226]">
      {/* Header Section */}
      <Header
        gameStart={gameStart}
        setGameStart={setGameStart}
        setShowAnalysis={setShowAnalysis}
        showAnalysis={showAnalysis}
      />

      {/* Main Content */}
      {gameStart ? (
        <div className="mx-auto my-auto">
          <TypingGame />
        </div>
      ) : showAnalysis ? (
        <Analysis />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center bg-cover bg-center bg-[url('/keybordbackground.jpg')]"
        
        >
         <div className="w-full h-full flex flex-col justify-center items-center backdrop-blur-md bg-[#012226]/60 ">
           <h1 className="text-4xl font-bold  px-6 py-3 rounded-2xl text-center">
            Boost Your Typing Speed While Having Fun!
          </h1>
          <p className="text-xl text-[#b4e6ec] mb-8 max-w-2xl text-center">
            Improve your typing speed while having fun! Select a difficulty
            level and start typing the letters and characters before they reach
            the top.
          </p>
          <div className="flex gap-6 text-md justify-center flex-wrap">
            <p>
              Total Games: <span className="font-semibold text-teal-300">{totalGames}</span>
            </p>
            <p>
              High Score:{" "}
              <span className="font-semibold text-green-400">{highScore}</span>
            </p>
            <p>
              Top Speed:{" "}
              <span className="font-semibold text-blue-400">
                {topSpeed} WPM
              </span>
            </p>
          </div>

          <LevelSelector />
          <StartButton onStart={()=>setGameStart(true)}/>
         </div>
        </div>
      )}
    </div>
  );
}
