enum ButtonOpenType {
  GET_PHONE_NUMBER = 'getPhoneNumber',
  GET_USER_INFO = 'getUserInfo'
}

enum ButtonType {
  PRIMARY = 'primary',
  DEFAULT = 'default',
  WARN = 'warn'
}

interface ChooseLocationSuccess {
  /**
   * 位置名称
   */
  name: string;
  /**
   * 详细地址
   */
  address: string;
  /**
   * 纬度，浮点数，范围为-90~90，负数表示南纬
   */
  latitude: number;
  /**
   * 经度，范围为-180~180，负数表示西经
   */
  longitude: number;
}

enum ImageMode {
  WIDTH_FIX = 'widthFix',
  HEIGHT_FIX = 'heightFix',
  ASPECT_FIT = 'aspectFit'
}

interface GetLocationSuccess {
  /**
   * 纬度，浮点数，范围为-90~90，负数表示南纬
   */
  latitude: number;
  /**
   * 经度，范围为-180~180，负数表示西经
   */
  longitude: number;
  /**
   * 速度，浮点数，单位m/s
   */
  speed: number;
  /**
   * 位置的精确度
   */
  accuracy: number;
  /**
   * 高度，单位 m
   */
  altitude: number;
  /**
   * 垂直精度，单位 m（Android 无法获取，返回 0）
   */
  verticalAccuracy: number;
  /**
   * 水平精度，单位 m
   */
  horizontalAccuracy: number;
  /**
   * 地址信息
   */
  address?: any;
}

enum ShowModelCode {
  SUCCESS,
  FAILED,
  CANCEL
}

enum RequestCode {
  SUCCESS,
  FAILED,
  COMPLETE
}

enum RequestPaymentCode {
  SUCCESS,
  FAILED,
  CANCEL
}

enum GetUserProfileCode {
  SUCCESS,
  FAILED,
  CANCEL
}

class UserProfileInfo {
  cloudID: string = ''
  encryptedData: string = ''
  errMsg: string = ''
  iv: string = ''
  rawData: string = ''
}

interface ChooseAddressRes {
  /**
   * 调用结果
   */
  errMsg: string;
  /**
   * 收货人姓名
   */
  userName: string;
  /**
   * 邮编
   */
  postalCode: string;
  /**
   * 国标收货地址第一级地址
   */
  provinceName: string;
  /**
   * 国标收货地址第二级地址
   */
  cityName: string;
  /**
   * 国标收货地址第三级地址
   */
  countyName: string;
  /**
   * 详细收货地址信息
   */
  detailInfo: string;
  /**
   * 收货地址国家码
   */
  nationalCode: string;
  /**
   * 收货人手机号码
   */
  telNumber: string;
}

export {
  ButtonOpenType,
  ImageMode,
  RequestCode,
  ButtonType,
  ShowModelCode,
  GetUserProfileCode,
  UserProfileInfo,
  RequestPaymentCode,
  ChooseLocationSuccess,
  GetLocationSuccess,
  ChooseAddressRes
}
