import GameOver from './runtime/gameover'
import GameConfig from './runtime/gameconfig'
import GameBaseView from './runtime/gamebaseview'
import MineUtils from './base/mineutils'
import Button from './base/button'
import Time from './runtime/time'
import Music from './runtime/music'

let ctx = canvas.getContext('2d')
var gameConfig = new GameConfig()
var gameOver = new GameOver()
var gameBaseView = new GameBaseView()
var mineUtils = new MineUtils()
var displayBtn = new Button('images/button_display.png')
var makeTagBtn = new Button('images/button_unselected_make_flag.png')
var time = new Time()
var music = new Music()

var firstFrame = true
var end = false
var pattern = 0 //0 挖雷， 1 插旗

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.finishHandler = this.finishEventHandler.bind(this)
    this.gameHandler = this.gameEventHandler.bind(this)
    this.btnHandler = this.btnEventHandler.bind(this)
    this.timeHandler = this.timeEventHandler.bind(this)
    this.keepHandler = this.keepEventHandler.bind(this)
    this.aniId = 0
    this.restart()
  }
  restart() {
    firstFrame = true
    end = false
    pattern = 0
    time.start()
    this.mines = mineUtils.initMine()
    this.mines = mineUtils.generateMine(this.mines)
    this.bindLoop = this.loop.bind(this)
    window.cancelAnimationFrame(this.aniId)
    this.aniId = window.requestAnimationFrame(
      this.bindLoop, canvas)
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#81FFEF"
    ctx.fillRect(0, 0, gameConfig.width, gameConfig.height)
    gameBaseView.renderTop(ctx)
    gameBaseView.renderBottom(ctx)
    // let grd = ctx.createLinearGradient(gameConfig.width/2, 0, gameConfig.width/2, 120)
    // grd.addColorStop(0, '#ABDCFF')
    // grd.addColorStop(1, '#0396FF')
    // ctx.fillStyle = grd
    // ctx.fillRect(0, 0, gameConfig.width, 120)

    // let grd2 = ctx.createLinearGradient(gameConfig.width/2, gameConfig.height - 100, gameConfig.width/2, gameConfig.height)
    // grd2.addColorStop(0, '#0396FF')
    // grd2.addColorStop(1, '#ABDCFF')
    // ctx.fillStyle = grd2
    // ctx.fillRect(0, gameConfig.height - 100, gameConfig.width, gameConfig.height)
    // ctx.fillStyle = '#ABDCFF'
    // ctx.fillRect(0, 0, gameConfig.width, 99)
    // ctx.fillStyle = '#123456'
    // ctx.beginPath()
    // ctx.moveTo(0,100)
    // ctx.lineTo(gameConfig.width, 100)
    // ctx.stroke()

    // ctx.fillStyle = '#ABDCFF'
    // ctx.fillRect(0, gameConfig.height - 100, gameConfig.width, gameConfig.height)

    this.renderAllMine()
    displayBtn.show(ctx, 20, gameConfig.height - 80 , 120 , 50)
    makeTagBtn.show(ctx, gameConfig.width - 140, gameConfig.height - 80, 120, 50)
    gameOver.renderFlagNum(ctx, mineUtils.flagNum(this.mines), 50 , 125)
    time.renderTime(ctx, 50, 55)
    // time.renderBtn(ctx, gameConfig.width - 105, gameConfig.height - 150 , 50 , 50)
    time.renderBtn(ctx)
    if (firstFrame) {
      canvas.addEventListener('touchstart', this.gameHandler)
      canvas.addEventListener('touchstart', this.btnHandler)
      canvas.addEventListener('touchstart', this.timeHandler)
      canvas.removeEventListener('touchstart', this.finishHandler)
      firstFrame = false
    }
    if (mineUtils.isWin(this.mines)) {
      end = true
      time.stop()
      gameOver.renderGameOver(ctx, '游戏胜利', parseInt(time.getTime())/100)
      canvas.addEventListener('touchstart', this.finishHandler)
      canvas.removeEventListener('touchstart', this.gameHandler)
      canvas.removeEventListener('touchstart', this.btnHandler)
      canvas.removeEventListener('touchstart', this.timeHandler)
    } else {
      if (end) {
        time.stop()
        gameOver.renderGameOver(ctx, '游戏失败', parseInt(time.getTime())/100)
        canvas.addEventListener('touchstart', this.finishHandler)
        canvas.removeEventListener('touchstart', this.gameHandler)
        canvas.removeEventListener('touchstart', this.btnHandler)
        canvas.removeEventListener('touchstart', this.timeHandler)
      } else {
        if (!time.keep) {
          gameOver.renderGamePause(ctx)
          canvas.addEventListener('touchstart', this.keepHandler)
        } else {
          canvas.removeEventListener('touchstart', this.keepHandler)
        }
      }
    }
  }

  renderAllMine() {
    for (var x = 0; x < gameConfig.xTotal; x++) {
      for (var y = 0; y < gameConfig.yTotal; y++) {
        this.mines[x][y].drawToCanvas(ctx)
      }
    }
  }

  loop() {
    this.render()
    this.aniId = window.requestAnimationFrame(
      this.bindLoop, canvas)
  }

  finishEventHandler(e) {
    if (!end) {
      return
    }
    e.preventDefault()
    if (mineUtils.isPointInArea(gameOver.btnArea,
      e.touches[0].clientX, e.touches[0].clientY)) {
        this.restart()
    }
 }

 timeEventHandler(e) {
   if (end) {
     return
   }
   e.preventDefault()
   if (mineUtils.isPointInArea(time.btnArea, 
        e.touches[0].clientX, e.touches[0].clientY)) {
     if(time.keep) {
       time.pause()
     } else {
       time.resume()
     }
   }
 }

 btnEventHandler(e) {
   if (end) {
     return
   }
   e.preventDefault()
   let x = e.touches[0].clientX
   let y = e.touches[0].clientY
   if (mineUtils.isPointInArea(displayBtn.btnArea,x,y)) {
     pattern = 0
     displayBtn.setImage('images/button_display.png')
     makeTagBtn.setImage('images/button_unselected_make_flag.png')
   } else if (mineUtils.isPointInArea(makeTagBtn.btnArea, x, y)) {
     pattern = 1
     displayBtn.setImage('images/button_unselected_display.png')
     makeTagBtn.setImage('images/button_make_flag.png')
   }
 }

 keepEventHandler(e) {
  if (end) {
    return
  }
  e.preventDefault()
  if (mineUtils.isPointInArea(gameOver.keepArea,
    e.touches[0].clientX,e.touches[0].clientY)) {
    time.resume()
  }
}

 gameEventHandler(e) {
   if (end || !time.keep) {
     return
   }
   e.preventDefault()
   let touchX = e.touches[0].clientX
   let touchY = e.touches[0].clientY
   let x = parseInt((touchX - gameConfig.startX) / gameConfig.size)
   let y = parseInt((touchY - gameConfig.startY) / gameConfig.size)
   if (!mineUtils.isInGame(x, y)) {
     return
   }
   if (this.mines[x][y].reveal) {
     return
   }
   if (pattern == 1) {
    if (this.mines[x][y].state == 0) {
      if (mineUtils.flagNum(this.mines) == 0) {
        return
      }
    }
     this.mines[x][y].setState()
   } else {
     if (this.mines[x][y].state == 1) {
       return
     }
     if (this.mines[x][y].isMine) {
       this.mines[x][y].show()
       end = true
       this.mines = mineUtils.allMineShow(this.mines)
       music.playExplosion()
       return
     }
     this.mines[x][y].show()
     if (this.mines[x][y].isNoMineAround()) {
       mineUtils.showAroundMine(this.mines, x, y)
     }
   } 
 }
}
