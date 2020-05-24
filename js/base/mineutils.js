import GameConfig from '../runtime/gameconfig'
import Mine from '../mine/mine'
var gameConfig = new GameConfig()

export default class MineUtils {
  constructor() {
  }

  isInGame(x, y) {
    if (x < 0 || x >= gameConfig.xTotal ||
      y < 0 || y >= gameConfig.yTotal) {
      return false
    }
    return true
  }

  randomNum(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      default:
        return 0;
    }
  }

  initMine() {
    var mines = new Array()
    for (var x = 0; x < gameConfig.xTotal; x++) {
      mines[x] = new Array();
      for (var y = 0; y < gameConfig.yTotal; y++) {
        mines[x][y] = new Mine(gameConfig.startX + x * gameConfig.size,
          gameConfig.startY + y * gameConfig.size);
      }
    }
    return mines
  }

  generateMine(mines) {
    var i = 0
    while (i < gameConfig.mineTotal) {
      var ranX = this.randomNum(gameConfig.xTotal - 1)
      var ranY = this.randomNum(gameConfig.yTotal - 1)
      if (!mines[ranX][ranY].isMine) {
        mines[ranX][ranY].isMine = true
        i++
      }
    }
    for (var x = 0; x < gameConfig.xTotal; x++) {
      for (var y = 0; y < gameConfig.yTotal; y++) {
        this.calculateAround(mines, x, y)
      }
    }
    return mines
  }

  calculateAround(mines, x, y) {
    var mineNum = 0
    if (mines[x][y].isMine) {
      return
    }
    for (var i = x - 1; i <= x + 1; i++) {
      for (var j = y - 1; j <= y + 1; j++) {
        if (this.isMine(mines, i, j)) {
          mineNum++
        }
      }
    }
    mines[x][y].mineNum = mineNum
  }

  isMine(mines, x, y) {
    if (!this.isInGame(x, y))
      return false
    if (mines[x][y].isMine) {
      return true
    } else {
      return false
    }
  }

  showMine(mines, x, y) {
    if (!this.isInGame(x, y)) {
      return
    }
    if (mines[x][y].isNoMineAround()) {
      if (!mines[x][y].reveal) {
        mines[x][y].show()
        this.showAroundMine(mines, x, y)
        return
      }
      mines[x][y].show()
    }
    mines[x][y].show()
  }

  showAroundMine(mines, x, y) {
    this.showMine(mines, x - 1, y - 1)
    this.showMine(mines, x - 1, y)
    this.showMine(mines, x - 1, y + 1)
    this.showMine(mines, x + 1, y - 1)
    this.showMine(mines, x + 1, y)
    this.showMine(mines, x + 1, y + 1)
    this.showMine(mines, x, y - 1)
    this.showMine(mines, x, y + 1)
  }

  isWin(mines) {
    var revael = 0
    for (var x = 0; x < gameConfig.xTotal; x++) {
      for (var y = 0; y < gameConfig.yTotal; y++) {
        if (!mines[x][y].reveal) {
          revael++
        }
        if (revael > gameConfig.mineTotal) {
          return false
        }
      }
    }
    return true
  }

  flagNum(mines) {
    var flag = 0
    for (var x = 0; x < gameConfig.xTotal; x++) {
      for (var y = 0; y < gameConfig.yTotal; y++) {
        if (mines[x][y].state == 1) {
          flag++
        }
      }
    }
    return gameConfig.mineTotal - flag
  }

  isPointInArea(area, x, y) {
    if (area != null && x >= area.startX && x <= area.endX
      && y >= area.startY && y <= area.endY) {
      return true
    }
    return false
  }

  allMineShow(mines) {
    for (var x = 0; x < gameConfig.xTotal; x++) {
      for (var y = 0; y < gameConfig.yTotal; y++) {
        if (mines[x][y].isMine) {
          mines[x][y].show()
        }
      }
    }
    return mines
  }





}


