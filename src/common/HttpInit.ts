import { GlobalConfiguration } from '../definition/GlobalConfiguration'
import AuthServiceSuccessJsonConverter from './AuthServiceSuccessJsonConverter'
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
         header: object = {},
         successCode: number = 1,
         codeParamStr: string = 'code',
         successParamStr: string = 'code',
         serverMessageParamStr: string = 'msg',
         isShowLoading: boolean = true,
         callback: (data: any) => void = (object: any) => {
         }) {
        GlobalConfiguration.successParamStr = successParamStr
        GlobalConfiguration.serverMessageParamStr = serverMessageParamStr
        GlobalConfiguration.codeParamStr = codeParamStr
        AuthServiceSuccessJsonConverter.successCode = successCode
        HttpService.init(loginPage, timeout, header, isShowLoading, callback)
    }
}
