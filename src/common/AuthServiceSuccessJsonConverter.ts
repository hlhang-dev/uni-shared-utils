import { JsonConverter, JsonCustomConvert } from 'json2typescript'
import { Utils } from 'ts-dev-common-utils'

@JsonConverter
export default class AuthServiceSuccessJsonConverter implements JsonCustomConvert<boolean> {
    public static successCode: number | boolean = 1

    serialize(data: boolean): any {
        return null
    }

    deserialize(data: any): boolean {
        let isSuccess: boolean
        if (Utils.isBoolean(AuthServiceSuccessJsonConverter.successCode)) {
            isSuccess = (data === AuthServiceSuccessJsonConverter.successCode)
        }else {
            isSuccess = (Number(data) === AuthServiceSuccessJsonConverter.successCode)
        }
        return isSuccess
    }
}
