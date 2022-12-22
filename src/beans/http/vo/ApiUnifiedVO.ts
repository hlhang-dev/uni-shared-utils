import { Any, JsonObject, JsonProperty } from 'json2typescript'
import HttpStatusCode from '../../../definition/http/HttpStatusEnum'
import BaseServiceVO from './BaseServiceVO'
import HeaderVO from './HeaderVO'

@JsonObject('ApiUnifiedVO')
export default class ApiUnifiedVO {
  @JsonProperty('data', BaseServiceVO, true)
  data: BaseServiceVO = new BaseServiceVO()

  @JsonProperty('header', HeaderVO, true)
  header: HeaderVO = new HeaderVO()

  @JsonProperty('statusCode', Number, true)
  statusCode: HttpStatusCode = HttpStatusCode.FAILED

  @JsonProperty('errMsg', String, true)
  errMsg: string = ''
}
