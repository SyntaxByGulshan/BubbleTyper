import { updateUI } from "./updateUI";
import { checkGameOver } from "./checkGameOver";





export function checkBubble(this:any,  key : string) {
    const typedKey = key.toUpperCase();
    let hit = false;
    this.totalTyped++;

    for (let i = 0; i < this.bubbles.length; i++) {
      if (this.bubbles[i].letter === typedKey) {
        this.bubbles[i].bubble.destroy();
        this.bubbles[i].text.destroy();
        this.bubbles.splice(i, 1);
        this.typedCount++;
        this.score += 10;
        hit = true;
        // this.popSound.play();
        break;
      }
    }

    if (!hit) {
      this.score -= 20;
      this.lifes -= 1;
      updateUI.call(this);
       // this.wrongSound.play();
       // this.wrongSound.play();
      checkGameOver.call(this);
    }

    this.scoreText.setText(`Score: ${this.score}`);
  }