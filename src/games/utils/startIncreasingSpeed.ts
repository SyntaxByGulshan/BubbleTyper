 export function startIncreasingSpeed(this:any) {
    this.speedEvent = this.time.addEvent({
      delay: 10000,
      loop: true,
      callback: () => {
        this.speed += 0.1;
      },
    });
  } 