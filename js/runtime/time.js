import GameConfig from '../runtime/gameconfig'
var gameConfig = new GameConfig()

var passTime = 0
var startTime = 0
var performance = wx.getPerformance()
// var image = new Image()
const START = 'images/start.png'
const PAUSE = 'images/pause.png'
var keep = true
let time = new Image()
time.src = 'images/time.png'

export default class Time {
  constructor() {
    this.image = new Image()
    this.image.src = START
  }

  renderTime(ctx, x, y) {
    ctx.drawImage(time, gameConfig.timeX, gameConfig.timeY,
      gameConfig.timeSize, gameConfig.timeSize)
    ctx.fillStyle = "#ffffff"
    ctx.font      = "30px Arial"
    ctx.fillText(parseInt(this.getTime()), gameConfig.timeTxtX ,
     gameConfig.timeTxtY )
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

  renderBtn(ctx) {
    ctx.drawImage(this.image, gameConfig.timeBtnX , gameConfig.timeBtnY , gameConfig.timeBtnSize, gameConfig.timeBtnSize)
    this.btnArea = {
      startX: gameConfig.timeBtnX,
      startY: gameConfig.timeBtnY,
      endX  : gameConfig.timeBtnX + gameConfig.timeBtnSize,
      endY  : gameConfig.timeBtnY + gameConfig.timeBtnSize
    }
  }
}

