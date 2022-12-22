import { Any, JsonObject, JsonProperty } from 'json2typescript'
import { StringToBooleanConverter, StringToNumConverter } from 'ts-dev-common-utils'


@JsonObject('BaseServiceVO')
export default class BaseServiceVO {
    @JsonProperty('code', StringToBooleanConverter, true)
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
