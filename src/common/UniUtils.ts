import { TokenManagement } from '../management/TokenManagement'
import { GlobalConfiguration } from '../definition/GlobalConfiguration'

class UniUtils {
  public static buildTokenHeader(token = TokenManagement.getInstance().getAccountToken()): Record<string, string> {
    if (!token) {
      return {}
    }
    return {
      [GlobalConfiguration.tokenHeaderName]: GlobalConfiguration.tokenHeaderPrefix + token
    }
  }

  public static buildHeader(headers?: object, globalHeaders?: object): object {
    return {
      ...UniUtils.buildTokenHeader(),
      ...globalHeaders,
      ...headers
    }
  }

  public static getDomHeight(domClass: string, vueInstance: any) {
    return new Promise<number>((resolve, reject) => {
      let height = 0
      let info = uni.createSelectorQuery().in(vueInstance).select('.' + domClass);
      info.boundingClientRect((data: any) => {
        height = data.height
        resolve(height)
      }).exec()
    })

  }

  public static getDomWidth(domClass: string, vueInstance: any) {
    return new Promise<number>((resolve, reject) => {
      let width = 0
      let info = uni.createSelectorQuery().in(vueInstance).select('.' + domClass);
      info.boundingClientRect((data: any) => {
        width = data.width
        resolve(width)
      }).exec()
    })

  }
}

export {
  UniUtils
}
