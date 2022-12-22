export class LoadingManagement {
  private static _instance: LoadingManagement

  private static loadingCounter: number = 0


  public static getInstance() {
    if (!LoadingManagement._instance) {
      LoadingManagement._instance = new LoadingManagement()
    }
    return LoadingManagement._instance
  }

  show() {
    if (LoadingManagement.loadingCounter === 0) {
      uni.showLoading({
        title: '加载中',
        mask: true
      })
    }
    LoadingManagement.loadingCounter++
  }

  hide() {
    LoadingManagement.loadingCounter--
    if (LoadingManagement.loadingCounter <= 0) {
      LoadingManagement.loadingCounter = 0
      uni.hideLoading()
    }
  }
}
