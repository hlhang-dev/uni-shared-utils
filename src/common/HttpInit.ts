import { HttpService } from './HttpService'

export class HttpInit {

  protected static _instance: HttpInit

  public static getInstance() {
    if (!this._instance) {
      this._instance = new HttpInit()
    }
    return this._instance
  }

  init(loginPage: string, timeout: number = 30000, header: object = {}, isShowLoading: boolean = true) {
    HttpService.init(loginPage, timeout, header, isShowLoading)
  }
}
