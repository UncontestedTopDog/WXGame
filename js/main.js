import GameInfo from './runtime/gameinfo'
import GameConfig from './base/gameconfig'
import GameUtils from './base/gameutils'
import Button from './base/button'
import Time from './runtime/time'

let ctx = canvas.getContext('2d')

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.gameconfig = new GameConfig()
    this.gameutils = new GameUtils()
    this.display = new Button('images/button_display.png')
    this.makeTag = new Button('images/button_unselected_make_flag.png')
    this.touchHandler = this.touchEventHandler.bind(this)
    this.aniId = 0
    this.initEvent()
    this.restart()
  }
  restart() {
    this.finish = false
    this.flag = false
    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )
    this.bindLoop = this.loop.bind(this)
    this.gameinfo = new GameInfo()
    this.time = new Time()
    this.time.start()
    this.mines = this.gameutils.initMine()
    this.mines = this.gameutils.generateMine(this.mines)
    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(
      this.bindLoop, canvas)
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#123321"
    ctx.fillRect(0, 0, this.gameconfig.width, this.gameconfig.height)
    this.renderAllMine()
    this.display.show(ctx, 20 , this.gameconfig.height-100 , 120 , 50)
    this.makeTag.show(ctx, this.gameconfig.width - 140, this.gameconfig.height - 100, 120, 50)
    this.gameinfo.renderGameScore(ctx, this.gameutils.flagNum(this.mines))
    this.time.renderTime(ctx)
    this.time.renderBtn(ctx, this.gameconfig.width - 100 , 100 , 50 , 50)
    if (this.gameutils.isWin(this.mines)) {
      this.finish = true
      this.gameinfo.renderGameOver(ctx, 0)
      canvas.addEventListener('touchstart', this.touchHandler)
    } else {
      if (this.finish) {
        this.gameinfo.renderGameOver(ctx, 0)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }
  }

  renderAllMine() {
    for (var x = 0; x < this.gameconfig.xTotal; x++) {
      for (var y = 0; y < this.gameconfig.yTotal; y++) {
        this.mines[x][y].drawToCanvas(ctx)
      }
    }
  }

  // 实现游戏帧循环
  loop() {
    this.render()
    this.aniId = window.requestAnimationFrame(
      this.bindLoop, canvas)
  }

  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      if (this.finish) {
        return
      }
      e.preventDefault()
      let touchX = e.touches[0].clientX
      let touchY = e.touches[0].clientY
      let x = parseInt(touchX / this.gameconfig.size)
      let y = parseInt((touchY - this.gameconfig.startY) / this.gameconfig.size)
      if (!this.gameutils.isInGame(x, y)) {
        return
      }
      if (this.mines[x][y].reveal)
        return
      if (this.flag) {
        this.mines[x][y].setState()
      } else {
        if (this.mines[x][y].state == 1) {
          return
        }
        if (this.mines[x][y].isMine) {
          this.mines[x][y].show()
          this.finish = true
          return
        }
        this.mines[x][y].show()
        if (this.mines[x][y].isNoMineAround()) {
          this.gameutils.showAroundMine(this.mines, x, y)
        }
      }       
    }).bind(this))

    canvas.addEventListener('touchstart', ((e) => {
      if (this.finish) {
        return
      }
      e.preventDefault()
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      let displayArea = this.display.btnArea
      let makeTagArea = this.makeTag.btnArea

      if (displayArea != null && x >= displayArea.startX
        && x <= displayArea.endX
        && y >= displayArea.startY
        && y <= displayArea.endY) {
        this.flag = false
        this.display.setImage('images/button_display.png')
        this.makeTag.setImage('images/button_unselected_make_flag.png')
      } else if (makeTagArea != null && x >= makeTagArea.startX
        && x <= makeTagArea.endX
        && y >= makeTagArea.startY
        && y <= makeTagArea.endY) {
        this.flag = true
        this.display.setImage('images/button_unselected_display.png')
        this.makeTag.setImage('images/button_make_flag.png')
      }
    }).bind(this))

    canvas.addEventListener('touchstart', ((e) => {
      if (this.finish) {
        return
      }
      e.preventDefault()
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      let timeArea = this.time.btnArea

      if (timeArea != null && x >= timeArea.startX
        && x <= timeArea.endX
        && y >= timeArea.startY
        && y <= timeArea.endY) {
          console.log('!!!!!!!!!!!!!')
          this.time.keep()
      }
    }).bind(this))
  }

  touchEventHandler(e) {
    if (!this.finish) {
      return
    }
    e.preventDefault()

   let x = e.touches[0].clientX
   let y = e.touches[0].clientY

   let area = this.gameinfo.btnArea

   if (area != null &&   x >= area.startX
       && x <= area.endX
       && y >= area.startY
       && y <= area.endY  )
     this.restart()
 }
}
