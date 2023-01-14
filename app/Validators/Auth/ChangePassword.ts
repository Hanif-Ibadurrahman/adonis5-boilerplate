import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChangePasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    password: schema.string({
      trim: true,
    }),
    new_password: schema.string(
      {
        trim: true,
      },
      [rules.confirmed(), rules.minLength(8)]
    ),
  })

  public messages: CustomMessages = {}
}
