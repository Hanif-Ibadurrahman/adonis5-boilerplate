import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateStaffValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string(
      {
        trim: true,
      },
      [
        rules.unique({
          table: 'users',
          column: 'username',
        }),
        rules.regex(/^[a-zA-Z0-9_.@]+$/),
      ]
    ),
    password: schema.string({}, [rules.minLength(8)]),
    name: schema.string(),
    email: schema.string(
      {
        trim: true,
      },
      [
        rules.email(),
        rules.unique({
          table: 'staffs',
          column: 'email',
        }),
      ]
    ),
    address: schema.string.optional(),
    role_id: schema.string(),
  })

  public messages: CustomMessages = {}
}
