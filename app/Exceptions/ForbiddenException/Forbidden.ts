import { HTTP_STATUS_FORBIDDEN } from 'App/Helper/Response/HttpResponse'
import BaseResponseException from 'App/Exceptions/BaseResponseException'

export default class ForbiddenException extends BaseResponseException {
  public defaultStatus() {
    return HTTP_STATUS_FORBIDDEN
  }

  public defaultCode() {
    return 'E_FORBIDDEN'
  }

  public defaultMessage() {
    return `Can't access this resource`
  }
}
