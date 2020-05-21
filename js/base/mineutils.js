import GameConfig from '../runtime/gameconfig'
import Mine from '../mine/mine'

export default class MineUtils {
  constructor() {
    this.gameconfig = new GameConfig()
  }

  isInGame(x, y) {
    if (x < 0 || x >= this.gameconfig.xTotal ||
      y < 0 || y >= this.gameconfig.yTotal) {
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
    for (var x = 0; x < this.gameconfig.xTotal; x++) {
      mines[x] = new Array();
      for (var y = 0; y < this.gameconfig.yTotal; y++) {
        mines[x][y] = new Mine(this.gameconfig.startX + x * this.gameconfig.size,
          this.gameconfig.startY + y * this.gameconfig.size);
      }
    }
    return mines
  }

  generateMine(mines) {
    var i = 0
    while (i < this.gameconfig.mineTotal) {
      var ranX = this.randomNum(this.gameconfig.xTotal - 1)
      var ranY = this.randomNum(this.gameconfig.yTotal - 1)
      if (!mines[ranX][ranY].isMine) {
        mines[ranX][ranY].isMine = true
        i++
      }
    }
    for (var x = 0; x < this.gameconfig.xTotal; x++) {
      for (var y = 0; y < this.gameconfig.yTotal; y++) {
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
    for (var x = 0; x < this.gameconfig.xTotal; x++) {
      for (var y = 0; y < this.gameconfig.yTotal; y++) {
        if (!mines[x][y].reveal) {
          revael++
        }
        if (revael > this.gameconfig.mineTotal) {
          return false
        }
      }
    }
    return true
  }

  flagNum(mines) {
    var flag = 0
    for (var x = 0; x < this.gameconfig.xTotal; x++) {
      for (var y = 0; y < this.gameconfig.yTotal; y++) {
        if (mines[x][y].state == 1) {
          flag++
        }
      }
    }
    return flag
  }

  isPointInArea(area, x, y) {
    if (area != null && x >= area.startX && x <= area.endX
      && y >= area.startY && y <= area.endY) {
      return true
    }
    return false
  }





}


