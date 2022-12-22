enum ButtonOpenType {
  GET_PHONE_NUMBER = 'getPhoneNumber',
  GET_USER_INFO = 'getUserInfo'
}

enum ButtonType {
  PRIMARY = 'primary',
  DEFAULT = 'default',
  WARN = 'warn'
}

enum ImageMode {
  WIDTH_FIX = 'widthFix',
  HEIGHT_FIX = 'heightFix',
  ASPECT_FIT = 'aspectFit'
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

export {
  ButtonOpenType,
  ImageMode,
  RequestCode,
  ButtonType,
  ShowModelCode,
  GetUserProfileCode,
  UserProfileInfo,
  RequestPaymentCode
}
