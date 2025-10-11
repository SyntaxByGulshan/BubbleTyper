import {getHearts} from "./getHearts"
export  function updateUI(this:any) {
    const oldText = this.heartsText.text;
    const newText = getHearts.call(this);

    if (oldText !== newText) {
      // Tween fade out
      this.tweens.add({
        targets: this.heartsText,
        alpha: 0,
        duration: 100,
        yoyo: true,
        onYoyo: () => {
          this.heartsText.setText(newText);
        },
      });
    } else {
      this.heartsText.setText(newText);
    }

    this.scoreText.setText("Score: " + this.score);
  }