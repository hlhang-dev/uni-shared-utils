import { JsonConverter, JsonCustomConvert } from 'json2typescript'

@JsonConverter
export default class AuthServiceSuccessJsonConverter implements JsonCustomConvert<boolean> {
    public static successCode = 1

    serialize(data: boolean): any {
        return null
    }

    deserialize(data: any): boolean {
        return Number(data) === AuthServiceSuccessJsonConverter.successCode
    }
}
