import { JsonConverter, JsonCustomConvert } from 'json2typescript'

@JsonConverter
export default class AuthServiceSuccessJsonConverter implements JsonCustomConvert<boolean> {
    public static successCode = 1

    serialize(data: boolean): any {
        return null
    }

    deserialize(data: any): boolean {
        let isSuccess: boolean
        if (typeof data === 'string') {
            isSuccess = (data === 'true')
        }else if (typeof data === 'boolean') {
            isSuccess = data
        }else {
            isSuccess = (Number(data) === AuthServiceSuccessJsonConverter.successCode)
        }
        return isSuccess
    }
}
