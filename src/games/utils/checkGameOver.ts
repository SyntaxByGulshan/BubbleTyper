

import type { BubbleResultType } from "../../types/BubbleResultType";
import { getResults } from "./getResults";
export function checkGameOver(this:any) {
    if (this.lifes <= 0) {
      const { wpm, accuracy } = getResults.call(this);
      const centerX = (this.sys.game.config.width as number) / 2;
      const centerY = (this.sys.game.config.height as number) / 2;   
    // this.bgMusic.stop();       
    this.gameOver.play();

      this.time.removeAllEvents();
      if (this.speedEvent) this.speedEvent.remove();

      this.bubbles.forEach((b:any) => {
        b.bubble.destroy();
        b.text.destroy();
      });
      this.bubbles = [];

          const savedData:BubbleResultType[] = JSON.parse(localStorage.getItem("typingGameResult")||"[]")
          console.log(savedData)
          
       const newResult: BubbleResultType = {
           attempt:savedData.length+1,
            date: new Date().toLocaleString(),
            level: this.level,
            score: this.score,
            speed: wpm,
            wrongInput: this.totalTyped - this.typedCount,
            correctInput: this.typedCount,
            duration:(Date.now() - this.startTime)/1000 
           }; 
    
     if (savedData.length) {
          
                    
           localStorage.setItem("typingGameResult", JSON.stringify([newResult,...savedData]));
        }else{
               localStorage.setItem("typingGameResult", JSON.stringify([newResult]));
        }
      
      const popup = this.add.dom(centerX, centerY).createFromHTML(`
        <div class="bg-gray-900 bg-opacity-90 rounded-2xl shadow-2xl p-6 w-96 text-center text-white space-y-4 animate-fadeIn">
          <h1 class="text-4xl font-extrabold text-red-500">GAME OVER</h1>
          <p class="text-xl">Speed: <span class="text-green-400">${wpm} WPM</span></p>
          <p class="text-xl">Accuracy: <span class="text-blue-400">${accuracy}%</span></p>
          <button id="restartBtn" class="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition">
            RESTART
          </button>
        </div>
      `);

      popup.addListener("click");
      popup.on("click", (event: any) => {
        if (event.target.id === "restartBtn") {
          popup.destroy();
          this.scene.restart();
        }
      });
    }
  }