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

    /** 配置请求与上传使用的令牌头。传入空前缀时发送原始令牌。 */
    configureTokenHeader(name: string, prefix: string = ''): void {
        GlobalConfiguration.tokenHeaderName = name
        GlobalConfiguration.tokenHeaderPrefix = prefix
    }

    init(loginPage: string,
         timeout: number = 30000,
         header: object = {},
         successCode: number = 200,
         codeParamStr: string = 'code',
         successParamStr: string = 'code',
         serverMessageParamStr: string = 'msg',
         isShowLoading: boolean = true,
         forceLogin: boolean = true,
         cancelBackPage: string = '',
         callback: (data: any) => void = (object: any) => {
         }) {
        GlobalConfiguration.successParamStr = successParamStr
        GlobalConfiguration.serverMessageParamStr = serverMessageParamStr
        GlobalConfiguration.codeParamStr = codeParamStr
        AuthServiceSuccessJsonConverter.successCode = successCode
        HttpService.init(loginPage, timeout, header, isShowLoading,forceLogin,cancelBackPage ,callback)
    }
}
