import { HTTP_STATUS_INTERNAL_SERVER_ERROR } from 'App/Helper/Response/HttpResponse'
import BaseResponseException from 'App/Exceptions/BaseResponseException'

export default class InternalServerErrorException extends BaseResponseException {
  public defaultStatus() {
    return HTTP_STATUS_INTERNAL_SERVER_ERROR
  }

  public defaultCode() {
    return 'E_INTERNAL_SERVER_ERROR'
  }

  public defaultMessage() {
    return 'An unexpected condition has occurred on the server'
  }
}
