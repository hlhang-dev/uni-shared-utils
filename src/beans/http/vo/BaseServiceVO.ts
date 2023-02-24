import { Any, JsonObject, JsonProperty } from 'json2typescript'
import { StringToBooleanConverter, StringToNumConverter } from 'ts-dev-common-utils'


@JsonObject('BaseServiceVO')
export default class BaseServiceVO {
    public static successParamStr: string = 'code'

    public static converter: any = StringToBooleanConverter

    @JsonProperty(BaseServiceVO.successParamStr, BaseServiceVO.converter, true)
    success: boolean = false

    @JsonProperty('code', StringToNumConverter, true)
    code: number = 0

    @JsonProperty('msg', String, true)
    msg: string = ''

    @JsonProperty('data', Any, true)
    result: any = {}

    @JsonProperty('', String, true)
    time: string = ''
}
