/**
 * @author  heninghang
 * @package
 * @date  2022/11/4
 */
import { UniAppManagement } from './UniAppManagement'

export class UserInfoManagement {
    private static _instance: UserInfoManagement
    private static USER_INFO_STORAGE_KEY = 'USER_INFO_STORAGE'

    public static getInstance() {
        if (!UserInfoManagement._instance) {
            UserInfoManagement._instance = new UserInfoManagement()
        }
        return UserInfoManagement._instance
    }

    public saveUserInfo<T> (userInfo: T) {
        UniAppManagement.setStorageSync(UserInfoManagement.USER_INFO_STORAGE_KEY,userInfo)
    }

    public getUserInfo<T> (): T {
        return UniAppManagement.getStorageSync(UserInfoManagement.USER_INFO_STORAGE_KEY)
    }
}
