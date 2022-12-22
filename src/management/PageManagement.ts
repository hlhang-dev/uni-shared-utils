import { BrowserUtils } from 'ts-dev-common-utils'


export class PageManagement {
  public static redirectPage<T>(page: string, params?: object) {
    uni.redirectTo({
      url: page + BrowserUtils.objToUrlParam(params)
    })
  }


  public static navigateToPage<T>(page: string, params?: object,callback?: () => void) {
    uni.navigateTo({
      url: page + BrowserUtils.objToUrlParam(params),
      success: (result) => {
        if (callback) {
          callback()
        }
      }
    })
  }

  public static navigateBack(layers: number = 1) {
    uni.navigateBack({
      delta: layers
    })
  }

  public static switchTabPage<T>(page: string, params?: object) {
    uni.switchTab({
      url: page + BrowserUtils.objToUrlParam(params)
    })
  }

  public static getUpperLevelPageRoute(): string {
    const router = getCurrentPages()
    return '/' + router[router.length - 2].route
  }

  public static getUpperLevelPage() {
    const router = getCurrentPages()
    return router[router.length - 2]
  }

}

