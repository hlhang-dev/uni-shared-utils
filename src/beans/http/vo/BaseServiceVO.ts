import { Any, JsonObject, JsonProperty } from 'json2typescript'
import { StringToBooleanConverter, StringToNumConverter } from 'ts-dev-common-utils'
import AuthServiceSuccessJsonConverter from '../../../common/AuthServiceSuccessJsonConverter'


@JsonObject('BaseServiceVO')
export default class BaseServiceVO {
    public static successParamStr: string = 'code'

    public static serverMessageParamStr: string = 'msg'


    @JsonProperty(BaseServiceVO.successParamStr, AuthServiceSuccessJsonConverter, true)
    success: boolean = false

    @JsonProperty('success', Boolean, true)
    serverSuccess: boolean = false

    @JsonProperty('code', StringToNumConverter, true)
    code: number = 0

    @JsonProperty(BaseServiceVO.serverMessageParamStr, String, true)
    msg: string = ''

    @JsonProperty('data', Any, true)
    result: any = {}

    @JsonProperty('', String, true)
    time: string = ''
}
