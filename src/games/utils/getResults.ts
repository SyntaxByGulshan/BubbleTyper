 export function getResults(this:any) {
    const elapsedMinutes = (this.time.now - this.startTime) / 1000 / 60;
    const cpm = elapsedMinutes > 0 ? this.typedCount / elapsedMinutes : 0;
    const wpm = Math.round(cpm / 5);
    const accuracy =
      this.totalTyped > 0
        ? Math.round((this.typedCount / this.totalTyped) * 100)
        : 0;
    return { wpm, accuracy };
  }