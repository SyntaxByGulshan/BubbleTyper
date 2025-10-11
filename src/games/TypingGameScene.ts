
import type { LevelType } from "../components/LevalSelector";
import Phaser from "phaser";
import { spawnBubble } from "./utils/spawnBubble";
import {getHearts} from "./utils/getHearts"
import { updateUI } from "./utils/updateUI";
import { checkGameOver } from "./utils/checkGameOver";
import { startIncreasingSpeed } from "./utils/startIncreasingSpeed";
import { checkBubble } from "./utils/checkBubble";
interface Bubble {
  letter: string;
  bubble: Phaser.GameObjects.Arc;
  text: Phaser.GameObjects.Text;
}
export default class TypingGameScene extends Phaser.Scene{
  private bubbles: Bubble[] = [];
  private score: number = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private speed: number = 1;
  private speedEvent?: Phaser.Time.TimerEvent;
  private typedCount: number = 0;
  private totalTyped: number = 0;
  private startTime: number=0;
  private lifes: number = 3;
  private level:LevelType  = localStorage.getItem('level') as LevelType ;
  private heartsText!: Phaser.GameObjects.Text;
    
    preload(){

    }
    create(){
    // initilize variables
    this.lifes = 3;
    this.score = 0;
    this.startTime = this.time.now;
    this.typedCount = 0;
    this.totalTyped = 0;
   this.level = localStorage.getItem('level') as LevelType;
    if(this.level==='beginner'){
        this.speed=0.5;
    }else if(this.level==='intermediate'){
        this.speed=1; 
    }else if(this.level==='pro'){
        this.speed=1.5;
    }
    else{
        this.speed=0.5;
    }
    // add text to the game screen
    this.scoreText = this.add.text(20, 20, "Score: 0", {
      fontSize: "20px",
      color: "#fff",
    });
    this.heartsText = this.add
      .text(
        (this.sys.game.config.width as number) - 20, // shifted to right
        20,
        getHearts.call(this),
        {
          fontSize: "24px",
          color: "#ff4d4d",
        }
      )
      .setOrigin(1, 0);

    // add bubble on screen after a duration
    this.time.addEvent({
      delay: 1000,
      callback: spawnBubble.call(this),
      callbackScope: this,
      loop: true,
    });

    // keyboard input
    this.input.keyboard!.on("keydown", (event: KeyboardEvent) => {
      checkBubble.call(this,event.key);
    });

    // speed increases
    startIncreasingSpeed.call(this);
    }
    update() {
         this.bubbles.forEach((b, index) => {
      b.bubble.y -= this.speed;
      b.text.y -= this.speed;

      if (b.bubble.y < -10) {
        b.bubble.destroy();
        b.text.destroy();
        this.bubbles.splice(index, 1);

        this.score -= 30;
        this.lifes -= 1;
        updateUI.call(this)
        checkGameOver.call(this);
      }
    });
    }
}