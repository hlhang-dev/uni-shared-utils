import {StatusNavHeightVO} from '../beans/wx/StatusNavHeightVO'
import {ChooseAddressRes, ChooseLocationSuccess, GetLocationSuccess} from '../definition/wechat/WxOpenType'
import {LoadingManagement} from './LoadingManagement'
import MyResponseCodeEnum from '../definition/http/MyResponseCodeEnum'
import ApiUnifiedVO from '../beans/http/vo/ApiUnifiedVO'
import {UniUtils} from '../common/UniUtils'
import ShowModelCodeEnum from '../definition/http/ShowModelCodeEnum'
import {Lang} from '../definition/Lang'
import {UniProviderServiceEnum} from '../definition/coomon/UniProviderServiceEnum'
import {UniPaymentProviderEnum} from '../definition/coomon/UniPaymentProviderEnum'
import {JsApiPaymentDTO} from '../beans/payment/JsApiPaymentDTO'
import {UniErrorMsgEnum} from '../definition/msg/UniErrorMsgEnum'
import {RequestPaymentCode} from '../definition/coomon/RequestPaymentCode'
import {MyJsonConverter} from 'ts-dev-common-utils'
import {ShowNoticeManagement} from './ShowNoticeManagement'

export class UniAppManagement {
    public static wxRequest<T>(url: string, method: string, data: object, timeout: number, callback: (requestCode: MyResponseCodeEnum, result?: ApiUnifiedVO) => void, headers: object = {}, showLoading: boolean = true, globalHeaders: object = {}) {
        if (showLoading) {
            LoadingManagement.getInstance().show()
        }
        uni.request({
            url: url,
            method: <'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'>method,
            header: UniUtils.buildHeader(headers, globalHeaders),
            data: data,
            sslVerify: false,
            timeout: timeout,
            success: (res) => {
                if (UniAppManagement.isApp()) {
                    res.data = JSON.parse(JSON.stringify(res.data))
                    res.header = JSON.parse(JSON.stringify(res.header))
                }
                const result = MyJsonConverter.getInstance().deserializeObject(res, ApiUnifiedVO)
                callback(MyResponseCodeEnum.SUCCESS, result)
            },
            fail: () => {
                callback(MyResponseCodeEnum.FAILED)
            },
            complete: () => {
                if (showLoading) {
                    LoadingManagement.getInstance().hide()
                }
                callback(MyResponseCodeEnum.COMPLETE)
            }
        })
    }

    public static hideSystemTabBar(animation: boolean = false) {
        uni.hideTabBar({
            animation: animation
        })
    }

    public static isApp() {
        let isApp = false
        const platform = uni.getSystemInfoSync().platform
        switch (platform) {
            case 'android':
            case 'ios':
                isApp = true
                break
        }
        return isApp
    }

    public static addToPhoneContact(firstName: string, phone: string) {
        uni.addPhoneContact({
            firstName: firstName,
            mobilePhoneNumber: phone
        })
    }

    public static showActionSheet(itemList: string[], callback: (success: boolean, index: number) => void, title: string = '') {
        uni.showActionSheet({
            itemList: itemList,
            title: title,
            success: (result) => {
                callback(true, result.tapIndex)
            },
            fail: (error) => {
                callback(false, -1)
            }
        })
    }

    public static pageScrollTo(scrollTop: number = 0, selector: string = '', duration: number = 300) {
        uni.pageScrollTo({
            scrollTop: scrollTop,
            selector: selector,
            duration: duration
        })
    }

    public static showShareMenu(menus: UniApp.ShowShareMenuOptionsMenu[] = ['shareAppMessage', 'shareTimeline'], callback?: (success: boolean) => void) {
        uni.showShareMenu({
            menus: menus,
            success: () => {
                if (callback) {
                    callback(true)
                }
            },
            fail: () => {
                if (callback) {
                    callback(false)
                }
            }
        })
    }

    public static async doOpenSetting(withSubscriptions: boolean) {
        uni.openSetting({
            withSubscriptions: withSubscriptions
        })
    }

    public static async getSetting(withSubscriptions: boolean, callback: (success: boolean, result: UniNamespace.GetSettingSuccessResult) => void) {
        uni.getSetting({
            withSubscriptions: withSubscriptions,
            success: (result: UniNamespace.GetSettingSuccessResult) => {
                callback(true, result)
            },
            fail: (error) => {
                callback(false, error)
            }
        })
    }

    public static setClipboardData(data: string, isShowTips: boolean = true) {
        uni.setClipboardData({
            data: data,
            success: () => {
                if (isShowTips) {
                    ShowNoticeManagement.showNormalNotice('复制成功')
                }
            }
        })
    }

    public static chooseImage(callback?: (success: boolean, result: UniApp.ChooseImageSuccessCallbackResult) => void,
                              count: number = 9,
                              sizeType: string | string [] = ['original', 'compressed'],
                              sourceType: string [] = ['album', 'camera'],
                              crop?: UniApp.ChooseImageCropOptions,
    ) {
        uni.chooseImage({
            count: count,
            sourceType: sourceType,
            crop: crop,
            success: (result) => {
                if (callback) callback(true, result)
            },
            fail: (error) => {
                if (callback) callback(false, error)
            }
        })
    }

    public static moveToOtherMiniProgram(appId: string,
                                         envVersion: 'release' | 'develop' | 'trial' = 'trial',
                                         path: string = '',
                                         extraData: any = {},
                                         callback?: (success: boolean) => void) {
        uni.navigateToMiniProgram({
            appId: appId,
            path: path,
            extraData: extraData,
            success: () => {
                if (callback) callback(true)
            },
            fail: () => {
                if (callback) callback(false)
            }
        })
    }

    public static getEncryptionWenRunData(): Promise<UniApp.GetWeRunDataSuccessCallbackResult> {
        return new Promise((resolve, reject) => {
            uni.getWeRunData({
                success: (weRunResult: UniApp.GetWeRunDataSuccessCallbackResult) => {
                    resolve(weRunResult)
                },
                fail: (error) => {
                    reject(error)
                }
            })
        })
    }


    public static async doPreviewImage(currentImage: string, imageUrls: string[]) {
        await uni.previewImage({
            current: currentImage,
            urls: imageUrls
        })
    }

    public static async doClosePreviewImage() {
        await uni.closePreviewImage({})
    }

    public static async setNavigationBarTitle(title: string) {
        uni.setNavigationBarTitle({
            title: title
        })
    }

    public static async makePhoneCall(phone: string) {
        uni.makePhoneCall({
            phoneNumber: phone
        })
    }

    public static getStatusNavHeight(callback: (success: boolean, statusNavHeightVO?: StatusNavHeightVO) => void) {
        const statusNavHeightVO: StatusNavHeightVO = new StatusNavHeightVO()
        uni.getSystemInfo({
                success: (e) => {
                    if (e.statusBarHeight) {
                        statusNavHeightVO.statusHeight = e.statusBarHeight * 2
                    }
                    if (e.platform === 'android') {
                        statusNavHeightVO.navHeight = 100
                    } else {
                        statusNavHeightVO.navHeight = 90
                    }
                    statusNavHeightVO.contentMarginTop = statusNavHeightVO.statusHeight + statusNavHeightVO.navHeight
                    callback(true, statusNavHeightVO)
                },
                fail: (e) => {
                    callback(false)
                }
            }
        )
    }


    public static setStorageSync(key: string, obj: any) {
        uni.setStorageSync(key, obj)
    }

    public static getStorageSync(key: string) {
        return uni.getStorageSync(key)
    }

    public static removeStorageSync(key: string) {
        return uni.removeStorageSync(key)
    }

    public static createLivePlayerContext(id: string) {
        return uni.createLivePlayerContext(id)
    }

    public static doProgramUpdate() {
        const updateManager = uni.getUpdateManager()
        updateManager.onCheckForUpdate((result) => {
            if (result.hasUpdate) {
                updateManager.onUpdateReady(() => {
                    UniAppManagement.onUpdateApplicationReady()
                })
                updateManager.onUpdateFailed(() => {
                    UniAppManagement.doShowModal(Lang.UPDATE_NOTICE_TITLE, Lang.UPDATE_NOTICE_FAILED_CONTENT, false, this.onUpdateFailed)
                })
            }
        })
    }

    private static onUpdateApplicationReady() {
        UniAppManagement.doShowModal(Lang.UPDATE_NOTICE_TITLE, Lang.UPDATE_NOTICE_READY_CONTENT, true, UniAppManagement.onUpdateApplicationReadyShowModelCallback)
    }

    private static onUpdateApplicationReadyShowModelCallback(code: ShowModelCodeEnum) {
        switch (code) {
            case ShowModelCodeEnum.SUCCESS:
                UniAppManagement.restartApplication()
                break
            case ShowModelCodeEnum.FAILED:
                break
            case ShowModelCodeEnum.CANCEL:
                break
            default:
                break
        }
    }

    private static restartApplication() {
        uni.getUpdateManager().applyUpdate()
    }

    private static onUpdateFailed(code: ShowModelCodeEnum) {
        switch (code) {
            case ShowModelCodeEnum.SUCCESS:
                break
            case ShowModelCodeEnum.FAILED:
                break
            case ShowModelCodeEnum.CANCEL:
                break
            default:
                break
        }
    }

    public static getSystemInfo(callback: (result: UniNamespace.GetSystemInfoResult) => void) {
        uni.getSystemInfo({
                success: (result) => {
                    callback(result)
                }
            }
        )
    }

    public static getProvider(service: UniProviderServiceEnum) {
        return new Promise((resolve, reject) => {
            uni.getProvider({
                service: <'oauth' | 'share' | 'payment' | 'push'>service,
                success: (result) => {
                    resolve(result.provider)
                },
                fail: (error) => {
                    reject(error)
                }
            })
        })
    }

    public static async doRequestPayment(provider: UniPaymentProviderEnum, jsapiPayment: JsApiPaymentDTO, orderInfo: string, callback: (success: boolean, requestPaymentCode?: RequestPaymentCode) => void) {
        uni.requestPayment({
            provider: <'alipay' | 'wxpay' | 'baidu' | 'appleiap'>provider,
            orderInfo: orderInfo,
            nonceStr: jsapiPayment.nonceStr,
            package: jsapiPayment.pkg,
            timeStamp: jsapiPayment.timeStamp,
            paySign: jsapiPayment.paySign,
            signType: jsapiPayment.signType,
            success: (res) => {
                switch (res.errMsg) {
                    case UniErrorMsgEnum.REQUEST_PAYMENT_OK:
                        callback(true, RequestPaymentCode.SUCCESS)
                        break
                    case UniErrorMsgEnum.REQUEST_PAYMENT_CANCEL:
                        callback(false, RequestPaymentCode.CANCEL)
                        break
                    default:
                        break
                }
            },
            fail: (result) => {
                callback(false, RequestPaymentCode.FAILED)
            }
        })
    }

    public static doChooseLocation(callback: (success: boolean, choose: ChooseLocationSuccess) => void) {
        uni.chooseLocation({
            success: ((choose: ChooseLocationSuccess) => {
                callback(true, choose)
            }),
            fail: (res) => {
                callback(false, res)
            }
        })
    }

    public static getLocation(callback: (success: boolean, choose: GetLocationSuccess) => void) {
        uni.getLocation({
            success: (choose) => {
                callback(true, choose)
            },
            fail: (result) => {
                callback(false, result)
            }
        })
    }

    public static doChooseAddress(callback: (success: boolean, chooseAddress: ChooseAddressRes) => void) {
        uni.chooseAddress({
            success: ((choose) => {
                callback(true, choose)
            }),
            fail: (result) => {
                callback(false, result)
            }
        })
    }

    public static doShowModal(title: string, content: string, showCancel: boolean, callback?: (code: ShowModelCodeEnum) => void) {
        uni.showModal({
                title: title,
                content: content,
                showCancel: showCancel,
                success: (result) => {
                    let code: ShowModelCodeEnum
                    if (result.confirm) {
                        code = ShowModelCodeEnum.SUCCESS
                    } else if (result.cancel) {
                        code = ShowModelCodeEnum.CANCEL
                    } else {
                        code = ShowModelCodeEnum.FAILED
                    }
                    if (callback) {
                        callback(code)
                    }
                },
                fail: () => {
                    if (callback) {
                        callback(ShowModelCodeEnum.FAILED)
                    }
                }
            }
        )
    }


    public static downloadFile(url: string, silent: boolean = false): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!silent) {
                LoadingManagement.getInstance().show()
            }
            uni.downloadFile({
                url: url,
                success: (result) => {
                    resolve(result.tempFilePath)
                },
                fail: (result) => {
                    reject(result)
                },
                complete: () => {
                    LoadingManagement.getInstance().hide()
                }
            })
        })
    }

    public static async openDocument(url: string,
                                     showMenu: boolean = true,
                                     silent: boolean = false) {
        try {
            if (!silent) LoadingManagement.getInstance().show()
            const file = await UniAppManagement.downloadFile(url, true)
            uni.openDocument({
                filePath: file,
                // @ts-ignore
                showMenu: showMenu,
                complete: () => {
                    if (!silent) LoadingManagement.getInstance().hide()
                }
            })
        } catch (e) {
            ShowNoticeManagement.showNormalNotice('请检查网络设置')
        }
    }
}
