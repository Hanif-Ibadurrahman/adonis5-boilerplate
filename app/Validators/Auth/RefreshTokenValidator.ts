import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RefreshTokenValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    refresh_token: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {}
}
