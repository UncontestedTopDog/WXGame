let interstitialAd = wx.createInterstitialAd({ adUnitId: 'xxxx' })

export default class Advertisement {
  constructor() {
  }

  show() {
    interstitialAd.show()
  }

}

