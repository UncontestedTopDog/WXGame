import GameConfig from '../runtime/gameconfig'

// 玩家相关常量设置
const INITIAL = 'images/initial.png'
const FLAG = 'images/flag.png'
const QUESTION = 'images/question.png'
const EXPLODE = 'images/mines/mine_expl.png'

const imgs = new Array('images/mines/mine_zero.png','images/mines/mine_one.png','images/mines/mine_two.png','images/mines/mine_three.png','images/mines/mine_four.png','images/mines/mine_five.png','images/mines/mine_six.png','images/mines/mine_seven.png','images/mines/mine_eight.png')


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
    this.state = 0    //0 正常， 1 插旗， 2疑问
  }

   /**
   * 将精灵图绘制在canvas上
   */
  drawToCanvas(ctx) {
    ctx.drawImage(
      this.img,
      this.x+1,
      this.y+1,
      this.width-2,
      this.height-2
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

  setState() {
    this.state++
    this.state = this.state % 3
    console.log(this.state)
    if (this.state == 0) {
      this.img.src = INITIAL
    } else if (this.state == 1) {
      this.img.src = FLAG
    } else {
      this.img.src = QUESTION
    }
  }

  isNoMineAround() {
    if (this.mineNum == 0) {
      return true
    }
    return false
  }

}
