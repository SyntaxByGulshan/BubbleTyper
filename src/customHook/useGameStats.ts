
import type { BubbleResultType } from "../types/BubbleResultType";

export function useGameStats() {
    const savedData = localStorage.getItem("typingGameResult");
    if (savedData) {
      const results: BubbleResultType[] = JSON.parse(savedData);
      if (results.length > 0) {
       const highScore= Math.max(...results.map((r) => r.score));
        const topSpeed= Math.max(...results.map((r) => r.speed));
           const totalGames= results.length;
           return { highScore, topSpeed, totalGames };
      }
    }
  return { highScore: 0, topSpeed: 0, totalGames: 0 };
}
