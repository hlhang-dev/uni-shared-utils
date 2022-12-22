import TokenConstant from '../definition/token/TokenConstant'
import { UniErrorMsgEnum } from '../definition/msg/UniErrorMsgEnum'
import { UniAppManagement } from './UniAppManagement'

export class LoginManagement {
  private static _instance: LoginManagement


  public static getInstance() {
    if (!this._instance) {
      this._instance = new LoginManagement()
    }
    return this._instance
  }


  isAccountLogin() {
    return !!UniAppManagement.getStorageSync(TokenConstant.ACCOUNT_AUTH_TOKEN_LABEL)
  }

  isAccountLoginBeOverdue(code: number) {
    return this.isAccountLogin() && code === 401
  }

  getWxCode(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      uni.login({
        success: res => {
          if (res.errMsg === UniErrorMsgEnum.LOGIN_OK) {
            resolve(res.code)
          } else {
            reject(res.errMsg)
          }
        },
        fail: res => reject(res.errMsg)
      })
    })
  }

  checkWxLoginSession(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      uni.checkSession({
        success: res => {
          if (res.errMsg === UniErrorMsgEnum.CHECK_SESSION_OK) {
            resolve(true)
          } else {
            resolve(false)
          }
        },
        fail: () => resolve(false)
      })
    })
  }
}
