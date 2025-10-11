 export function getHearts(this:any) {
    const fullHeart = "\u2764\uFE0F";
    const emptyHeart = "\u{1F90D}";
    return fullHeart.repeat(this.lifes) + emptyHeart.repeat(3 - this.lifes);
  }