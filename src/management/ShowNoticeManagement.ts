import NoticeDurationEnum from '../definition/notice/NoticeDurationEnum'

export class ShowNoticeManagement {
  public static showNormalNotice(title: string = '', duration = NoticeDurationEnum.NORMAL) {
    uni.showToast({
      icon: 'none',
      title: title,
      duration: duration
    })
  }

  public static showSuccessNotice(title: string, duration = NoticeDurationEnum.NORMAL) {
    uni.showToast({
      icon: 'success',
      title: title,
      duration: duration
    })
  }

  public static showErrorNotice(title: string = '', duration = NoticeDurationEnum.NORMAL) {
    uni.showToast({
      icon: 'error',
      title: title,
      duration: duration
    })
  }
}
