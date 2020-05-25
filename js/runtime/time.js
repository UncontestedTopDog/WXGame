import GameConfig from '../runtime/gameconfig'
var gameConfig = new GameConfig()

var passTime = 0
var startTime = 0
var performance = wx.getPerformance()
// var image = new Image()
const START = 'images/start.png'
const PAUSE = 'images/pause.png'

let time = new Image()
time.src = 'images/time.png'

export default class Time {
  constructor() {
    this.image = new Image()
    this.image.src = START
    this.keep = true
  }

  renderTime(ctx, x, y) {
    ctx.drawImage(time, gameConfig.timeX, gameConfig.timeY,
      gameConfig.timeSize, gameConfig.timeSize * 1.18)
    ctx.fillStyle = "#ffffff"
    ctx.font      = "25px Arial"
    ctx.fillText(parseInt(this.getTime())/100, gameConfig.timeTxtX ,
     gameConfig.timeTxtY )
  }

  start() {
    this.image.src = PAUSE
    passTime = 0
    startTime = performance.now()
    this.keep = true
  }

  pause() {
    this.image.src = START
    passTime += performance.now() - startTime
    this.keep = false
  }

  resume() {
    this.image.src = PAUSE
    startTime = performance.now()
    this.keep = true
  }

  stop() {
    if (!this.keep)
    return 
    this.image.src = START
    passTime += performance.now() - startTime
    this.keep = false
  }
  
  getTime() {
    if (this.keep) {
      return (passTime + (performance.now() - startTime)) / 10
    } else {
      return passTime / 10
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

