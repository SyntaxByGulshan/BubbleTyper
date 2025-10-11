import { useEffect, useRef } from "react";
import Phaser from "phaser";

import TypingGameScene from "./TypingGameScene";


export default function TypingGame() {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: window.innerWidth-20,
      height: window.innerHeight-80,
      backgroundColor: "#012226",
      physics: { default: "arcade" },
      scene: [TypingGameScene],
      parent: "phaser-container",
      dom: {
        createContainer: true,
      },
      
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return <div id="phaser-container" />;
}
