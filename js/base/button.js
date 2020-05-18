export default class Button {
  constructor(src) {
    this.atlas = new Image()
    this.atlas.src = src
  }

  show(ctx, x, y, width, height) {
    ctx.drawImage(this.atlas, x, y, width, height)
    this.btnArea = {
      startX: x,
      startY: y,
      endX  : x + width,
      endY  : y + height
    }
  }

  setImage(src) {
    this.atlas.src = src
  }
}

