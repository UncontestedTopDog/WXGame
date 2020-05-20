const MINETOTAL = 50
const XTOTAL = 16
const YTOTAL = 16
const SCREENWIDTH    = window.innerWidth
const SCREENHEIGHT   = window.innerHeight

export default class GameConfig {
  constructor() {
    this.mineTotal = MINETOTAL
    this.xTotal = XTOTAL
    this.yTotal = YTOTAL
    this.size = SCREENWIDTH / this.xTotal
    this.startY = (SCREENHEIGHT - this.size * this.yTotal) / 2
    this.width  = SCREENWIDTH
    this.height = SCREENHEIGHT
  }
}