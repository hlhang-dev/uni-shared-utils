import { TokenManagement } from '../management/TokenManagement'
import ApiUnifiedVO from '../beans/http/vo/ApiUnifiedVO'
import HttpStatusCode from '../definition/http/HttpStatusEnum'
import { LangKey } from '../definition/LangKey'
import { LangManagement } from '../management/LangManagement'
import { ShowNoticeManagement } from '../management/ShowNoticeManagement'
import { LoginManagement } from '../management/LoginManagement'
import { ChunkedRequestTask, UniAppManagement } from '../management/UniAppManagement'
import { PageManagement } from '../management/PageManagement'
import MyResponseCodeEnum from '../definition/http/MyResponseCodeEnum'
import { ShowModelCodeEnum } from '../definition/http/ShowModelCodeEnum'

export type HttpRequestPromise = Promise<ApiUnifiedVO> & {
  requestTask: ChunkedRequestTask
}

export class HttpService {
  private static SERVER_API_TIMEOUT: number = 0

  private static ANTI_SHAKE_COUNTER = 0

  private static LOGIN_PAGE = ''

  private static  CANCEL_BACK_PAGE = ''

  private static  FORCE_LOGIN = false

  private static IS_SHOW_LOADING = false

  private static HEADER = {}

  private static callback: (data: object) => void

  public static init(loginPage: string, timeout: number, header: object = {},isShowLoading: boolean,forceLogin: boolean,cancelBackPage: string,callback: (data: object) => void) {
    console.log( '%c\n' +
        '%c _   _ _   _                             _            _____      _ _   %c\n' +
        '%c | | | | | | |                           (_)          |_   _|    (_) |  %c\n' +
        '%c | |_| | |_| |_ _ __  ___  ___ _ ____   ___  ___ ___    | | _ __  _| |_ %c\n' +
        '%c |  _  | __| __| \'_ \\/ __|/ _ \\ \'__\\ \\ / / |/ __/ _ \\   | || \'_ \\| | %c__|\n' +
        '%c | | | | |_| |_| |_) \\__ \\  __/ |   \\ V /| | (_|  __/  _| || | | | | |_ %c\n' +
        '%c \\_| |_/\\__|\\__| .__/|___/\\___|_|    \\_/ |_|\\___\\___|  %c\\___/_| |_|_|\\__|\n' +
        '%c              | |                                                      %c\n' +
        '%c              |_|                                                      %c\n' +
        '   ','color:#ff0000','color:#ff0000','color:#ff3b00','color:#ff7500','color:#ff7800','color:#FD7B00','color:#FFAD00','color: #FEDA00','color:#D0FD00','color:#93FF00','color:#80FF00','color:#1AFF00','color:#00FF2E','color:#00FF3B','color:#00FFB1','color:#00F2F9','color:#00E0F9')
    this.SERVER_API_TIMEOUT = timeout
    this.LOGIN_PAGE = loginPage
    this.IS_SHOW_LOADING = isShowLoading
    this.HEADER  = header
    this.FORCE_LOGIN = forceLogin
    this.CANCEL_BACK_PAGE = cancelBackPage
    this.callback = callback
  }

  public static doRequest(
      url: string,
      method: string,
      data: object = {},
      headers?: object,
      showLoading = true,
      enableChunked?: boolean,
      showErrorNotice = true
  ): HttpRequestPromise {
    HttpService.callback(data)
    let requestTask: ChunkedRequestTask
    const promise = new Promise<ApiUnifiedVO>((resolve, reject) => {
      requestTask = UniAppManagement.wxRequest(url, method, data, HttpService.SERVER_API_TIMEOUT, (responseCodeEnum: MyResponseCodeEnum, result?: ApiUnifiedVO, error?: UniNamespace.GeneralCallbackResult) => {
        switch (responseCodeEnum) {
          case MyResponseCodeEnum.SUCCESS:
            if (result) {
              HttpService.onHttpCodeChange(result.data.msg,result.data.code, showErrorNotice)
              resolve(result)
            }
            break
          case MyResponseCodeEnum.FAILED:
            if (showErrorNotice && !HttpService.isAbortError(error)) {
              ShowNoticeManagement.showNormalNotice(LangManagement.getInstance().t(LangKey.PLEASE_CONTACT_THE_ADMINISTRATOR))
            }
            reject(error)
            break
        }
      }, headers, this.IS_SHOW_LOADING ? showLoading: false,HttpService.HEADER, enableChunked)
    })
    return Object.assign(promise, {requestTask: requestTask!})
  }

  private static isAbortError(error?: UniNamespace.GeneralCallbackResult) {
    return error?.errMsg?.toLowerCase().includes('abort') === true
  }

  private static onHttpCodeChange(msg: string, code: string, showErrorNotice: boolean) {
    switch (code) {
      case HttpStatusCode.NO_PERMISSION:
        HttpService.onNoPermission()
        break
      case HttpStatusCode.FAILED:
        if (showErrorNotice) {
          ShowNoticeManagement.showNormalNotice(msg || LangManagement.getInstance().t(LangKey.PLEASE_CONTACT_THE_ADMINISTRATOR))
        }
        break
      default:
        break
    }
  }

  private static isCanShowExpiredLoginModel() {
    return HttpService.ANTI_SHAKE_COUNTER === 1
  }


  private static onNoPermission() {
    HttpService.ANTI_SHAKE_COUNTER += 1
    TokenManagement.getInstance().removeAccountToken()
    if (HttpService.isCanShowExpiredLoginModel()) {
      const langMgr = LangManagement.getInstance()
      const title: string = LoginManagement.getInstance().isAccountLogin() ? langMgr.t(LangKey.LOGIN_BE_OVERDUE_NOTICE): langMgr.t(LangKey.LOGIN_NOTICE)
      const content: string = LoginManagement.getInstance().isAccountLogin() ? langMgr.t(LangKey.LOGIN_BE_OVERDUE): langMgr.t(LangKey.NOT_LOGGED_IN)
      UniAppManagement.doShowModal(title, content, !HttpService.FORCE_LOGIN, HttpService.onLoginBeOverdueCallback)
    }
  }

  private static onLoginBeOverdueCallback (code: ShowModelCodeEnum) {
      switch (code) {
          case ShowModelCodeEnum.SUCCESS:
          case ShowModelCodeEnum.FAILED:
              PageManagement.navigateToPage(HttpService.LOGIN_PAGE, undefined, HttpService.onMoveToLoginPageSuccess)
              break
          case ShowModelCodeEnum.CANCEL:
              PageManagement.navigateToPage(HttpService.CANCEL_BACK_PAGE, undefined, HttpService.onMoveToLoginPageSuccess)
              break
      }
  }

  private static onMoveToLoginPageSuccess() {
    HttpService.resetExpiredCounter()
  }

  private static resetExpiredCounter() {
    HttpService.ANTI_SHAKE_COUNTER = 0
  }
}
