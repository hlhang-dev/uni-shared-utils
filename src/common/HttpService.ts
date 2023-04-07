import { TokenManagement } from '../management/TokenManagement'
import ApiUnifiedVO from '../beans/http/vo/ApiUnifiedVO'
import HttpStatusCode from '../definition/http/HttpStatusEnum'
import { Lang } from '../definition/Lang'
import { ShowNoticeManagement } from '../management/ShowNoticeManagement'
import { LoginManagement } from '../management/LoginManagement'
import { UniAppManagement } from '../management/UniAppManagement'
import { PageManagement } from '../management/PageManagement'
import MyResponseCodeEnum from '../definition/http/MyResponseCodeEnum'

export class HttpService {
  private static SERVER_API_TIMEOUT: number = 0

  private static ANTI_SHAKE_COUNTER = 0

  private static LOGIN_PAGE = ''

  private static IS_SHOW_LOADING = false

  private static HEADER = {}

  public static init(loginPage: string, timeout: number, header: object = {},isShowLoading: boolean) {
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
  }

  public static doRequest(
      url: string,
      method: string,
      data: object = {},
      headers?: object,
      showLoading = true,
  ): Promise<ApiUnifiedVO> {
    return new Promise<ApiUnifiedVO>((resolve, reject) => {
      UniAppManagement.wxRequest(url, method, data, HttpService.SERVER_API_TIMEOUT, (responseCodeEnum: MyResponseCodeEnum, result?: ApiUnifiedVO) => {
        switch (responseCodeEnum) {
          case MyResponseCodeEnum.SUCCESS:
            if (result) {
              HttpService.onHttpCodeChange(result.statusCode,result.data.msg)
              resolve(result)
            }
            break
          case MyResponseCodeEnum.FAILED:
            ShowNoticeManagement.showNormalNotice(Lang.PLEASE_CONTACT_THE_ADMINISTRATOR)
            reject()
            break
        }
      }, headers, this.IS_SHOW_LOADING ? showLoading: false,HttpService.HEADER)
    })
  }

  private static onHttpCodeChange(statusCode: HttpStatusCode,msg: string) {
    switch (statusCode) {
      case HttpStatusCode.NO_PERMISSION:
        HttpService.onNoPermission()
        break
      case HttpStatusCode.FAILED:
        ShowNoticeManagement.showNormalNotice(msg || Lang.PLEASE_CONTACT_THE_ADMINISTRATOR)
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
      const title: string = LoginManagement.getInstance().isAccountLogin() ? Lang.LOGIN_BE_OVERDUE_NOTICE: Lang.LOGIN_NOTICE
      const content: string = LoginManagement.getInstance().isAccountLogin() ? Lang.LOGIN_BE_OVERDUE: Lang.NOT_LOGGED_IN
      UniAppManagement.doShowModal(title, content, false, HttpService.onLoginBeOverdueCallback)
    }
  }

  private static onLoginBeOverdueCallback () {
    PageManagement.navigateToPage(HttpService.LOGIN_PAGE, undefined, HttpService.onMoveToLoginPageSuccess)
  }

  private static onMoveToLoginPageSuccess() {
    HttpService.resetExpiredCounter()
  }

  private static resetExpiredCounter() {
    HttpService.ANTI_SHAKE_COUNTER = 0
  }
}
