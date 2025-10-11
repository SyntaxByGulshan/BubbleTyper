
import { motion } from "framer-motion";

interface StartButtonProps {
  onStart: () => void;
}

export default function StartButton({ onStart }: StartButtonProps) {
  return (
    <motion.button
      onClick={onStart}
      whileHover={{
        scale: 1.1,
        boxShadow: "0px 0px 12px rgba(56, 178, 172, 0.8)",
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0, rotate: -15 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 10,
        duration: 0.4,
      }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 px-8 py-3 font-extrabold text-[#012226] shadow-lg hover:from-teal-500 hover:to-cyan-600"
    >
      <span className="relative z-10 tracking-wider text-lg"> Start Game</span>

      {/* Glowing effect animation */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
      />
    </motion.button>
  );
}
