import { updateUI } from "./updateUI";
import { checkGameOver } from "./checkGameOver";

export function checkBubble(this: any, key: string) {
  const typedKey = key.toUpperCase();
  let hit = false;
  this.totalTyped++;

  for (let i = 0; i < this.bubbles.length; i++) {
    const bubbleData = this.bubbles[i];

    if (bubbleData.letter === typedKey) {
      hit = true;
      this.popSound.play();
      // Blast animation: scale up + fade out
      this.tweens.add({
        targets: [bubbleData.bubble, bubbleData.text],
        scale: 1.5,       // grow a bit
        alpha: 0,         // fade out
        duration: 300,    // 0.3 seconds
        ease: "Power1",
        onComplete: () => {
          // Destroy objects after animation
          bubbleData.bubble.destroy();
          bubbleData.text.destroy();
          
          // Remove from bubbles array
          this.bubbles.splice(i, 1);
        }
      });

      //  Update stats
      this.typedCount++;
      this.score += 10;

      // Optional: play pop sound
      // this.popSound.play();

      break; // stop loop after first hit
    }
  }

  if (!hit) {
    this.wrongSound.play();
    this.score -= 10;
    checkGameOver.call(this);
  }

  this.scoreText.setText(`Score: ${this.score}`);
}
