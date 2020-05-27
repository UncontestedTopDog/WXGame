import GameConfig from '../runtime/gameconfig'
var gameConfig = new GameConfig()

export default class GameBaseView {
  renderTop(ctx) {
    // let grd = ctx.createLinearGradient(gameConfig.width / 2, 0, gameConfig.width / 2, 120)
    // grd.addColorStop(0, '#ABDCFF')
    // grd.addColorStop(1, '#0396FF')
    // ctx.fillStyle = grd
    // ctx.fillRect(0, 0, gameConfig.width, gameConfig.topHeight)
    ctx.fillStyle = "#0396FF"
    ctx.fillRect(0, 0, gameConfig.width, gameConfig.topHeight)
  }

  renderBottom(ctx) {
    // let grd2 = ctx.createLinearGradient(gameConfig.width / 2, gameConfig.height - 100, gameConfig.width / 2, gameConfig.height)
    // grd2.addColorStop(0, '#0396FF')
    // grd2.addColorStop(1, '#ABDCFF')
    // ctx.fillStyle = grd2
    ctx.fillStyle = "#0396FF"
    ctx.fillRect(0, gameConfig.height - gameConfig.bottomHeight, gameConfig.width, gameConfig.height)
  }
}