import { HTTP_STATUS_UNAUTHORIZED } from 'App/Helper/Response/HttpResponse'
import BaseResponseException from 'App/Exceptions/BaseResponseException'

export default class UnauthorizedException extends BaseResponseException {
  public defaultStatus() {
    return HTTP_STATUS_UNAUTHORIZED
  }

  public defaultCode() {
    return 'E_UNAUTHORIZED'
  }

  public defaultMessage() {
    return 'Please, login again'
  }
}
