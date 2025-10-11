export function spawnBubble(this:any) {
    return ()=>{
         let letter = "";
 console.log(this)
  if (this.level === 'beginner') {
    // Only uppercase letters A-Z
    letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  } 
  else if (this.level ==='intermediate') {
    // Uppercase letters A-Z + digits 0-9
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    letter = chars[Math.floor(Math.random() * chars.length)];
  } 
  else if (this.level === "pro") {
    // Uppercase  + digits + special chars
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/";
    letter = chars[Math.floor(Math.random() * chars.length)];
  } 
  else  {
    // fallback: easy
    letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }

  const radius = 30;
  const gameWidth = this.sys.game.config.width as number;
  const x = Phaser.Math.Between(radius, gameWidth - radius);

  const bubble = this.add.circle(x, 600, radius, 0x66ccff);
  const text = this.add.text(x - 10, 590, letter, {
    fontSize: "24px",
    color: "#000",
  });

  this.bubbles.push({ letter, bubble, text });
    }
 
  }