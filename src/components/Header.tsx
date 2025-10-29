import { motion } from "framer-motion";

interface HeaderProps {
  gameStart: boolean;
  setGameStart: (val: boolean) => void;
  showAnalysis: boolean;
  setShowAnalysis: (val: boolean) => void;
}

export default function Header({
  gameStart,
  setGameStart,
  setShowAnalysis,
  showAnalysis,
}: HeaderProps) {
  // Function to get glow color for active button
  return (
    <motion.header
      className="flex justify-between items-center bg-[#02444d] py-2 px-4 "
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      {/* Logo */}
      <motion.h1
        className="text-[#cdeef2] text-center font-extrabold p-1  "
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
      >
        BubbleTyper
      </motion.h1>
      
      {/* Conditional Buttons */}
      {gameStart ? (
        <motion.button
          onClick={() => setGameStart(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ repeat: 2, repeatType: "mirror", duration: 1.2 }}
          className=" text-[#012226] bg-[#6acdd9]  hover:bg-red-500 hover:text-[#b4e6ec]  px-2 py-1 text-center rounded-md p-1 font-bold"
        >
          Exit
        </motion.button>
      ) : showAnalysis ? (
        <motion.button
          onClick={() => setShowAnalysis(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ repeat: 2, repeatType: "mirror", duration: 1.2 }}
          className="text-[#012226] bg-[#6acdd9] hover:bg-[#1fb3c6]   px-2 py-1 text-center rounded-md p-1 font-bold"
        >
          Home
        </motion.button>
      ) : (
        <motion.button
          onClick={() => setShowAnalysis(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          
          transition={{ repeat: 2, repeatType: "mirror", duration: 1.2 }}
          className="text-[#012226] bg-[#6acdd9] hover:bg-[#1fb3c6]  px-2 py-1 text-center rounded-md p-1 font-bold"
        >
          Dashboard
        </motion.button>
      )}
    </motion.header>
  );
}
