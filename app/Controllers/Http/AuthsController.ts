import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExceptionHandler from 'App/Exceptions/Handler'
import { HTTP_STATUS_OK } from 'App/Helper/Response/HttpResponse'
import AuthService from 'App/Service/Auth/AuthService'
import CredentialValidator from 'App/Validators/Auth/CredentialValidator'
import RefreshTokenValidator from 'App/Validators/Auth/RefreshTokenValidator'

export default class AuthsController {
  protected authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  public async login(ctx: HttpContextContract) {
    try {
      const { request, response } = ctx
      const input = await request.validate(CredentialValidator)
      const token = await this.authService.login(input, ctx)
      return response.status(HTTP_STATUS_OK).send({ data: token })
    } catch (error) {
      return new ExceptionHandler().handle(error, ctx)
    }
  }

  public async refreshToken(ctx: HttpContextContract) {
    try {
      const { response, request } = ctx
      const input = await request.validate(RefreshTokenValidator)
      const token = await this.authService.refreshToken(
        {
          refreshToken: input.refresh_token,
        },
        ctx
      )
      return response.status(HTTP_STATUS_OK).send({ data: token })
    } catch (error) {
      return new ExceptionHandler().handle(error, ctx)
    }
  }

  public async logout(ctx: HttpContextContract) {
    try {
      const { response, auth } = ctx
      await this.authService.logout(auth)
      return response.status(HTTP_STATUS_OK).send({ data: { message: 'Logout success' } })
    } catch (error) {
      return new ExceptionHandler().handle(error, ctx)
    }
  }
}
