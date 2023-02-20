import { UploadItemDTO } from '../beans/http/dto/UploadItemDTO'
import { HttpService } from '../common/HttpService'
import { TokenManagement } from '../management/TokenManagement'
import { ArrayUtils,StringUtils } from 'ts-dev-common-utils'


export default class UniMappper {

    private static readonly ACCOUNT_AUTH_TOKEN_HEADER: string = 'authorization'


    private static readonly ACCOUNT_AUTH_TOKEN_PREFIX: string = 'Bearer '

    private static buildHeader(token: string | undefined): Object {
        const result: any = {}

        if (token) {
            result[UniMappper.ACCOUNT_AUTH_TOKEN_HEADER] = UniMappper.ACCOUNT_AUTH_TOKEN_PREFIX + token
        }
        return result
    }


    public static uploadFile(uploadFileItem: UploadItemDTO, url: string, token: string = '', key: string = 'file', fileType: 'image' | 'video' | 'audio' | undefined = 'image') {
        const currentAuthToken = TokenManagement.getInstance().getAccountToken()
        return new Promise((resolve, reject) => {
            if (!uploadFileItem.isUpload) {
                uni.uploadFile({
                    filePath: uploadFileItem.localPath,
                    url: url,
                    fileType: fileType,
                    name: key,
                    header: UniMappper.buildHeader(token || currentAuthToken),
                    success: result => {
                        uploadFileItem.id = StringUtils.getRandomStr()
                        uploadFileItem.isUpload = true
                        resolve(result.data)
                    },
                    fail: (err) => {
                        uploadFileItem.id = StringUtils.getRandomStr()
                        reject('upload file item error' + uploadFileItem.id)
                    }
                })
            } else {
                resolve(uploadFileItem.localPath)
            }

        })
    }

    public static uploadFiles(uploadFileList: Array<UploadItemDTO>, url: string, token: string = '', key: string = 'file', fileType: 'image' | 'video' | 'audio' | undefined = 'image') {
        return new Promise<void>(async (resolve, reject) => {
            if (!ArrayUtils.isEmpty(uploadFileList)) {
                for (let i = 0; i < uploadFileList.length; i++) {
                    const item = uploadFileList[i]
                    try {
                        const data = await UniMappper.uploadFile(item, url, token, key, fileType)
                        item.serverData = data
                        resolve()
                    } catch (e) {
                        reject('network error')
                    }
                }
            } else {
                reject('upload file list is empty')
            }

        })
    }
}
