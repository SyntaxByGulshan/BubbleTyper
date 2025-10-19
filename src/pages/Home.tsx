import { useState ,useEffect} from "react";
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
 const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // ✅ Update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Define a minimum width for supported screens
  const isScreenSupported = screenWidth >= 768; // example: min width 768px


  return (
    <div className="flex flex-col  h-screen text-[#cdeef2] bg-[#012226] overflow-y-scroll no-scrollbar">
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
        <div className="flex flex-1 flex-col  bg-cover bg-center bg-[url('/keyboardbackground.jpg')]"
        
        >
         <div className="w-full h-full flex flex-col md:justify-center pt-12 items-center backdrop-blur-md bg-[#012226]/60">
           <h1 className="md:text-4xl text-2xl font-bold  px-6 py-3 rounded-2xl text-center m-4">
            Boost Your Typing Speed While Having Fun!
          </h1>
          <p className="md:text-xl text-sm text-[#b4e6ec] md:mb-8 mb-6 max-w-2xl text-center mx-4">
            Improve your typing speed while having fun! Select a difficulty
            level and start typing the letters and characters before they reach
            the top.
          </p>
          <div className="flex gap-6 md:text-md justify-center flex-wrap text-sm">
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
           {isScreenSupported ? (
              <StartButton onStart={() => setGameStart(true)} />
            ) : (
              <div className="text-red-400     bg-red-950 px-4 py-2 rounded-xl mx-6 my-4 text-center">
                Screen not supported — please use a larger device.
              </div>
            )}
         </div>
        </div>
      )}
    </div>
  );
}
