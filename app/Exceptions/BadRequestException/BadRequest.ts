import { HTTP_STATUS_BAD_REQUEST } from 'App/Helper/Response/HttpResponse'
import BaseResponseException from 'App/Exceptions/BaseResponseException'

export default class BadRequestException extends BaseResponseException {
  public defaultStatus() {
    return HTTP_STATUS_BAD_REQUEST
  }

  public defaultCode() {
    return 'E_BAD_REQUEST'
  }

  public defaultMessage() {
    return `Can't process request because a client error occurred in the input data`
  }
}
