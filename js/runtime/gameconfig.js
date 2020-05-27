const MINETOTAL = 20
const XTOTAL = 9
const YTOTAL = 12
const SCREENWIDTH    = window.innerWidth
const SCREENHEIGHT   = window.innerHeight

export default class GameConfig {
  constructor() {
    this.mineTotal = MINETOTAL
    this.xTotal = XTOTAL
    this.yTotal = YTOTAL
    // this.size = SCREENHEIGHT / this.yTotal
    this.size = SCREENWIDTH / this.xTotal
    this.startX = (SCREENWIDTH - this.size * this.xTotal) / 2
    this.startY = (SCREENHEIGHT - this.size * this.yTotal) / 2
    this.width  = SCREENWIDTH
    this.height = SCREENHEIGHT
    // this.timeBtnX = this.width / 30
    // this.timeBtnY = this.startY /2  - this.width / 15
    // this.timeBtnSize = 2 * this.width / 15
    this.timeBtnX = 30
    this.timeBtnY = 70
    this.timeBtnSize = 40

    // this.timeX = this.width * 7 / 30
    // this.timeY = this.startY /2  - this.width / 15
    // this.timeSize = 2 * this.width / 15
    this.timeX = 120
    this.timeY = 65
    this.timeSize = 40

    // this.timeTxtX = this.width * 13 / 30
    // this.timeTxtY = this.startY / 2 + 15
    this.timeTxtX = 170
    this.timeTxtY = 100

    // this.flagX = this.width * 19 / 30
    // this.flagY = this.startY /2  - this.width / 15
    // this.flagSize = 2 * this.width / 15
    this.flagX = this.width - 110
    this.flagY = 70
    this.flagSize = 40

    // this.flagTxtX = this.width * 26 / 30
    // this.flagTxtY = this.startY / 2 + 15
    this.flagTxtX = this.width - 60
    this.flagTxtY = 100

    this.topHeight = 120
    this.bottomHeight = 100
  }
}
