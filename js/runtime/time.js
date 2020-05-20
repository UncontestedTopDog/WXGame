var passTime = 0
var startTime = 0
var performance = wx.getPerformance()
// var image = new Image()
const START = 'images/start.png'
const PAUSE = 'images/pause.png'
var keep = true

export default class Time {
  constructor() {
    this.image = new Image()
    this.image.src = START
  }
  renderTime(ctx) {
    if (startTime == 0) {
      startTime = performance.now()
    }
    ctx.fillStyle = "#ffffff"
    ctx.font      = "30px Arial"
    ctx.fillText(parseInt(this.getTime()),20,55)
  }

  start() {
    this.image.src = PAUSE
    passTime = 0
    startTime = performance.now()
    keep = true
  }

  keep() {
    if (keep) {
      this.pause()
    } else {
      this.resume()
    }
    keep = !keep
  }

  pause() {
    this.image.src = START
    passTime += performance.now() - startTime
  }

  resume() {
    this.image.src = PAUSE
    startTime = performance.now()
  }

  getTime() {
    if (keep) {
      return (passTime + (performance.now() - startTime)) / 1000
    } else {
      return passTime / 1000
    }
  }

  renderBtn(ctx, x, y, width, height) {
    ctx.drawImage(this.image, x, y, width, height)
    this.btnArea = {
      startX: x,
      startY: y,
      endX  : x + width,
      endY  : y + height
    }
  }
}

