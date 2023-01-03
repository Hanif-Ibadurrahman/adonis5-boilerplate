import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExceptionHandler from 'App/Exceptions/Handler'
import { HTTP_STATUS_OK } from 'App/Helper/Response/HttpResponse'
import AuthService from 'App/Service/Auth/AuthService'
import CredentialValidator from 'App/Validators/Auth/CredentialValidator'

export default class AuthController {
  protected authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  public async login(ctx: HttpContextContract) {
    try {
      const { request, auth, response } = ctx
      const input = await request.validate(CredentialValidator)
      const token = await this.authService.login(input, auth)
      return response.status(HTTP_STATUS_OK).send({ data: token })
    } catch (error) {
      return new ExceptionHandler().handle(error, ctx)
    }
  }
}
