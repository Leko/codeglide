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

    // 右にはみ出ている
    if (x + width > this.scrollLeft + this.screenWidth - this.padding) {
      distance.left =
        x + width - (this.scrollLeft + this.screenWidth - this.padding);
    }
    // 左にはみ出ている
    else if (x < this.scrollLeft + this.padding) {
      distance.left = this.scrollLeft + this.padding - x;
    }

    // 下にはみ出ている
    console.log(y + height, this.scrollTop + this.screenHeight - this.padding);
    if (y + height > this.scrollTop + this.screenHeight - this.padding) {
      distance.top =
        y + height - (this.scrollTop + this.screenHeight - this.padding);
    }
    // 上にはみ出ている
    else if (y < this.scrollTop + this.padding) {
      distance.top = this.scrollTop + this.padding - y;
    }

    return distance;
  }
}
