import { UploadItemDTO } from '../beans/http/dto/UploadItemDTO'
import { TokenManagement } from '../management/TokenManagement'
import { ArrayUtils,StringUtils } from 'ts-dev-common-utils'


export  class UniMapper {

    private static readonly ACCOUNT_AUTH_TOKEN_HEADER: string = 'authorization'


    private static readonly ACCOUNT_AUTH_TOKEN_PREFIX: string = 'Bearer '

    private static buildHeader(token: string | undefined): Object {
        const result: any = {}

        if (token) {
            result[UniMapper.ACCOUNT_AUTH_TOKEN_HEADER] = UniMapper.ACCOUNT_AUTH_TOKEN_PREFIX + token
        }
        return result
    }


    public static uploadFile(uploadFileItem: UploadItemDTO, url: string, token: string = '', key: string = 'file', fileType: 'image' | 'video' | 'audio' | undefined = 'image') {
        const currentAuthToken = TokenManagement.getInstance().getAccountToken()
        uploadFileItem.id = StringUtils.getRandomStr()
        return new Promise((resolve, reject) => {
            if (!uploadFileItem.isUpload) {
                uni.uploadFile({
                    filePath: uploadFileItem.localPath,
                    url: url,
                    fileType: fileType,
                    name: key,
                    header: UniMapper.buildHeader(token || currentAuthToken),
                    success: result => {
                        uploadFileItem.serverData = result.data
                        uploadFileItem.isUpload = true
                        resolve(uploadFileItem)
                    },
                    fail: (error) => {
                        reject('upload file item error' + error)
                    }
                })
            } else {
                resolve(uploadFileItem.localPath)
            }

        })
    }

    public static uploadFiles(uploadFileList: Array<UploadItemDTO>, url: string, token: string = '', key: string = 'file', fileType: 'image' | 'video' | 'audio' | undefined = 'image') {
        return new Promise<void>(async (resolve, reject) => {
            let count = 0
            if (ArrayUtils.isNotEmpty(uploadFileList)) {
                for (let i = 0; i < uploadFileList.length; i++) {
                    const item = uploadFileList[i]
                    try {
                        await UniMapper.uploadFile(item, url, token, key, fileType)
                        count++
                        if (uploadFileList.length === count) {
                            resolve()
                        }
                    } catch (e) {
                        reject('network error' + e)
                    }
                }
            } else {
                reject('upload file list is empty')
            }

        })
    }
}
