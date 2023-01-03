import { HTTP_STATUS_NOT_FOUND } from 'App/Helper/Response/HttpResponse'
import BaseResponseException from 'App/Exceptions/BaseResponseException'

export default class NotFoundException extends BaseResponseException {
  public defaultStatus() {
    return HTTP_STATUS_NOT_FOUND
  }

  public defaultCode() {
    return 'E_NOT_FOUND'
  }

  public defaultMessage() {
    return 'Resource not found'
  }
}
