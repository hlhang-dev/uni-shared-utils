import { BrowserUtils } from 'ts-dev-common-utils'


export class PageManagement {
    public static tabBarPath: string[] = []

    public static redirectPage<T>(page: string, params?: object) {
      PageManagement.checkTabBarPath(page)
        uni.redirectTo({
            url: page + BrowserUtils.objToUrlParam(params)
        })
    }

    public static reLaunchPage (page: string, params?: object) {
      uni.reLaunch({
        url: page + BrowserUtils.objToUrlParam(params)
      })
    }

    private static isPathInTabBar (path: string) {
      let isPathIsTabBarItem = false
      if (PageManagement.tabBarPath.includes(path)) {
        isPathIsTabBarItem = true
      }
      return isPathIsTabBarItem
    }

    private static checkTabBarPath (path: string) {
      if (PageManagement.isPathInTabBar(path)) {
        PageManagement.switchTab(path)
      }
    }


    public static navigateToPage<T>(page: string, params?: object, callback?: () => void) {
      PageManagement.checkTabBarPath(page)
      uni.navigateTo({
            url: page + BrowserUtils.objToUrlParam(params),
            success: () => {
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

    public static switchTab<T>(page: string) {
        uni.switchTab({
            url: page
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

