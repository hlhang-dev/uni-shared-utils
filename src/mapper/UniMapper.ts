import { UploadItemDTO } from '../beans/http/dto/UploadItemDTO'
import { UniUtils } from '../common/UniUtils'
import { ArrayUtils,StringUtils } from 'ts-dev-common-utils'


export  class UniMapper {

    private static readonly ACCOUNT_CLIENT_ID_HEADER: string = 'clientId'

    private static buildHeader(token?: string, clientId?: string): Record<string, string> {
        const headers = UniUtils.buildTokenHeader(token)
        if (clientId) {
            headers[UniMapper.ACCOUNT_CLIENT_ID_HEADER] = clientId
        }
        return headers
    }

    public static uploadFile(uploadFileItem: UploadItemDTO, url: string, formData: object = {},token: string = '', clientId?: string,key: string = 'file', fileType: 'image' | 'video' | 'audio' | undefined = 'image') {
        uploadFileItem.id = StringUtils.getRandomStr()
        return new Promise((resolve, reject) => {
            if (!uploadFileItem.isUpload) {
                uni.uploadFile({
                    filePath: uploadFileItem.localPath,
                    url: url,
                    fileType: fileType,
                    name: key,
                    formData: formData,
                    header: UniMapper.buildHeader(token || undefined, clientId),
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

    public static uploadFiles(uploadFileList: Array<UploadItemDTO>, url: string, formData: object = {},token: string = '',clientId?: string,key: string = 'file', fileType: 'image' | 'video' | 'audio' | undefined = 'image') {
        return new Promise<void>(async (resolve, reject) => {
            let count = 0
            if (ArrayUtils.isNotEmpty(uploadFileList)) {
                for (let i = 0; i < uploadFileList.length; i++) {
                    const item = uploadFileList[i]
                    try {
                        await UniMapper.uploadFile(item, url,formData ,token, clientId,key, fileType)
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
