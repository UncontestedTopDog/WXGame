import GameConfig from '../runtime/gameconfig'
var gameConfig = new GameConfig()
const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

let atlas = new Image()
atlas.src = 'images/Common.png'

let mine = new Image()
mine.src = 'images/mine-set.png'

var passTime = 0
var startTime = 0
var performance = wx.getPerformance()

export default class GameInfo {
  renderFlagNum(ctx, flagNum, x, y) {
    ctx.drawImage(mine, gameConfig.flagX, gameConfig.flagY, gameConfig.flagSize, gameConfig.flagSize)
    ctx.fillStyle = "#ffffff"
    ctx.font      = "30px Arial"
    ctx.fillText(flagNum, gameConfig.flagTxtX ,
     gameConfig.flagTxtY )
  }

  renderTime(ctx) {
    if (startTime == 0) {
      startTime = performance.now()
    }
    ctx.fillStyle = "#ffffff"
    ctx.font      = "30px Arial"
    var time = (performance.now() - startTime) / 1000
    ctx.fillText(parseInt(time),20,55)
  }

  renderGameOver(ctx,txt, time) {
    ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300)

    ctx.fillStyle = "#ffffff"
    ctx.font    = "20px Arial"

    ctx.fillText(
      txt,
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 50
    )

    ctx.fillText(
      '时长: ' + time,
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 130
    )

    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60,
      screenHeight / 2 - 100 + 180,
      120, 40
    )

    ctx.fillText(
      '重新开始',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 205
    )

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnArea = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 100 + 180,
      endX  : screenWidth / 2  + 50,
      endY  : screenHeight / 2 - 100 + 255
    }
  }
}

