import NoticeDurationEnum from '../definition/notice/NoticeDurationEnum'

export class ShowNoticeManagement {
    public static showNormalNotice(title: string, duration: number = NoticeDurationEnum.NORMAL, isMask: boolean = false) {
        uni.showToast({
            icon: 'none',
            title: title,
            mask: isMask,
            duration: duration
        })
    }

    public static showSuccessNotice(title: string, duration: number = NoticeDurationEnum.NORMAL, isMask: boolean = false) {
        uni.showToast({
            icon: 'success',
            title: title,
            mask: isMask,
            duration: duration
        })
    }

    public static showErrorNotice(title: string, duration: number = NoticeDurationEnum.NORMAL, isMask: boolean = false) {
        uni.showToast({
            icon: 'error',
            title: title,
            mask: isMask,
            duration: duration
        })
    }
}
