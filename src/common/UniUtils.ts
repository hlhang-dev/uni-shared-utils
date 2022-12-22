import { TokenManagement } from '../management/TokenManagement'
import TokenConstant from '../definition/token/TokenConstant'

class UniUtils {
  public static buildHeader(headers?: object,globalHeaders?: object): Object {
    const result: any = {}

    const token = TokenManagement.getInstance().getAccountToken()
    if (token) {
      result[TokenConstant.ACCOUNT_AUTH_TOKEN_HEADER] = TokenConstant.ACCOUNT_AUTH_TOKEN_PREFIX + token
    }

    if (globalHeaders) {
      for (const key of Object.keys(globalHeaders)) {
        if (globalHeaders.hasOwnProperty(key)) {
          // @ts-ignore
          result[key] = globalHeaders[key]
        }
      }
    }

    if (headers) {
      for (const key of Object.keys(headers)) {
        if (headers.hasOwnProperty(key)) {
          // @ts-ignore
          result[key] = headers[key]
        }
      }
    }
    return result
  }
}

export {
  UniUtils
}
