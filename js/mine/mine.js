import GameConfig from '../base/gameconfig'

// 玩家相关常量设置
const INITIAL = 'images/initial.png'
const FLAG = 'images/flag.png'
const QUESTION = 'images/question.png'
const EXPLODE = 'images/explode.png'

const imgs = new Array('images/mine_zero.png','images/mine_one.png','images/mine_two.png','images/mine_three.png','images/mine_four.png','images/mine_five.png','images/mine_six.png','images/mine_seven.png','images/mine_eight.png')


export default class Mine {
  constructor(x, y) {
    this.gameconfig = new GameConfig()
    // 玩家默认处于屏幕底部居中位置
    this.x = x
    this.y = y
    this.img = new Image()
    this.img.src = INITIAL
    this.width  = this.gameconfig.size
    this.height = this.gameconfig.size
    this.mineNum = 0
    this.isMine = false
    this.reveal = false
    this.isFlag = false
  }

   /**
   * 将精灵图绘制在canvas上
   */
  drawToCanvas(ctx) {
    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  show() {
    this.reveal = true
    if (this.isMine) {
      this.img.src = EXPLODE
    } else if (this.mineNum >= 0){
      this.img.src = imgs[this.mineNum]
    } else {
      this.img.src = INITIAL
    }
  }

  setFlag() {
    if (!this.isFlag) {
      this.isFlag = !this.isFlag
      this.img.src = FLAG
    } else {
      this.isFlag = !this.isFlag
      this.img.src = INITIAL
    }
  }

  isNoMineAround() {
    if (this.mineNum == 0) {
      return true
    }
    return false
  }

}
