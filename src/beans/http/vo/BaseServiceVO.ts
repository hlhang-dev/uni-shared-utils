import { Any, JsonObject, JsonProperty } from 'json2typescript'
import { NumberToStringConverter } from 'ts-dev-common-utils'
import AuthServiceSuccessJsonConverter from '../../../common/AuthServiceSuccessJsonConverter'
import { GlobalConfiguration } from '../../../definition/GlobalConfiguration'


@JsonObject('BaseServiceVO')
export default class BaseServiceVO {


    @JsonProperty(GlobalConfiguration.successParamStr, AuthServiceSuccessJsonConverter, true)
    success: boolean = false

    @JsonProperty(GlobalConfiguration.codeParamStr, NumberToStringConverter, true)
    code: string = ''

    @JsonProperty(GlobalConfiguration.serverMessageParamStr, String, true)
    msg: string = ''

    @JsonProperty('data', Any, true)
    result: any = {}

    @JsonProperty('rows', Any, true)
    rows: any = {}

    @JsonProperty('total', Number, true)
    total: number = 0

    @JsonProperty('', String, true)
    time: string = ''
}
