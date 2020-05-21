const MINETOTAL = 10
const XTOTAL = 9
const YTOTAL = 9
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
    this.timeBtnX = this.width / 30
    this.timeBtnY = this.startY /2  - this.width / 15
    this.timeBtnSize = 2 * this.width / 15
    this.timeX = this.width * 7 / 30
    this.timeY = this.startY /2  - this.width / 15
    this.timeSize = 2 * this.width / 15
    this.timeTxtX = this.width * 13 / 30
    this.timeTxtY = this.startY / 2 + 15
    this.flagX = this.width * 19 / 30
    this.flagY = this.startY /2  - this.width / 15
    this.flagSize = 2 * this.width / 15
    this.flagTxtX = this.width * 26 / 30
    this.flagTxtY = this.startY / 2 + 15
  }
}
