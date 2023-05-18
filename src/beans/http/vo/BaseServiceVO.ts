import { Any, JsonObject, JsonProperty } from 'json2typescript'
import { StringToNumConverter } from 'ts-dev-common-utils'
import AuthServiceSuccessJsonConverter from '../../../common/AuthServiceSuccessJsonConverter'
import { GlobalConfiguration } from '../../../definition/GlobalConfiguration'


@JsonObject('BaseServiceVO')
export default class BaseServiceVO {


    @JsonProperty(GlobalConfiguration.successParamStr, AuthServiceSuccessJsonConverter, true)
    success: boolean = false

    @JsonProperty(GlobalConfiguration.codeParamStr, StringToNumConverter, true)
    code: number = 0

    @JsonProperty(GlobalConfiguration.serverMessageParamStr, String, true)
    msg: string = ''

    @JsonProperty('data', Any, true)
    result: any = {}

    @JsonProperty('', String, true)
    time: string = ''
}
