export class ScrollAdjuster {
  scrollTop: number;
  scrollLeft: number;
  screenWidth: number;
  screenHeight: number;
  padding: number;

  constructor({
    scrollTop,
    scrollLeft,
    screenWidth,
    screenHeight,
    padding
  }: {
    scrollTop: number;
    scrollLeft: number;
    screenWidth: number;
    screenHeight: number;
    padding: number;
  }) {
    this.scrollTop = scrollTop;
    this.scrollLeft = scrollLeft;
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.padding = padding;
  }

  getMovingDistance(target: {
    x: number;
    y: number;
    width: number;
    height: number;
  }): { top: number; left: number } {
    const distance = { top: 0, left: 0 };
    const { x, y, width, height } = target;

    // protruding right
    if (x + width > this.scrollLeft + this.screenWidth - this.padding) {
      distance.left =
        x + width - (this.scrollLeft + this.screenWidth - this.padding);
    }
    // protruding left
    else if (x < this.scrollLeft + this.padding) {
      distance.left = Math.max(
        -this.scrollLeft,
        x - (this.scrollLeft + this.padding)
      );
    }

    // protruding bottom
    if (y + height > this.scrollTop + this.screenHeight - this.padding) {
      distance.top =
        y + height - (this.scrollTop + this.screenHeight - this.padding);
    }
    // protruding top
    else if (y < this.scrollTop + this.padding) {
      distance.top = Math.max(
        -this.scrollTop,
        y - (this.scrollTop + this.padding)
      );
    }

    return distance;
  }
}
