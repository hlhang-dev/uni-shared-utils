import { StringToBooleanConverter } from 'ts-dev-common-utils'
import BaseServiceVO from '../beans/http/vo/BaseServiceVO'
import { HttpService } from './HttpService'

export class HttpInit {

  protected static _instance: HttpInit

  public static getInstance() {
    if (!this._instance) {
      this._instance = new HttpInit()
    }
    return this._instance
  }

  init(loginPage: string,
       timeout: number = 30000,
       successParamStr: string = 'code',
       jsonCustomConvert: any = StringToBooleanConverter,
       header: object = {},
       isShowLoading: boolean = true) {
    BaseServiceVO.successParamStr = successParamStr
    BaseServiceVO.converter = jsonCustomConvert
    HttpService.init(loginPage, timeout, header, isShowLoading)
  }
}
