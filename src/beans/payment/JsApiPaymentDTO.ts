import { JsonObject, JsonProperty } from 'json2typescript'

@JsonObject('JsApiPaymentDTO')
export class JsApiPaymentDTO {
  @JsonProperty('nonceStr', String, true)
  nonceStr = ''
  @JsonProperty('paySign', String, true)
  paySign = ''
  @JsonProperty('package', String, true)
  pkg = ''
  @JsonProperty('signType', String, true)
  signType = '' as 'MD5' | 'HMAC-SHA256' | 'RSA'
  @JsonProperty('timeStamp', String, true)
  timeStamp = ''
}
