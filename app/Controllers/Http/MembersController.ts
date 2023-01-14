import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExceptionHandler from 'App/Exceptions/Handler'
import { HTTP_STATUS_CREATED } from 'App/Helper/Response/HttpResponse'

import MemberService from 'App/Service/Member/MemberService'
import CreateMemberValidator from 'App/Validators/Member/CreateMemberValidator'

export default class MembersController {
  protected memberService: MemberService

  constructor() {
    this.memberService = new MemberService()
  }

  public async createMember(ctx: HttpContextContract) {
    try {
      const { request, response, bouncer, auth } = ctx
      await bouncer.with('PermissionPolicy').authorize('canCreateMember')
      const input = await request.validate(CreateMemberValidator)
      const member = await this.memberService.createMember(auth, {
        username: input.username,
        password: input.password,
        name: input.name,
        email: input.email,
        address: input.address,
      })
      return response.status(HTTP_STATUS_CREATED).send({ data: member.serialize() })
    } catch (error) {
      return new ExceptionHandler().handle(error, ctx)
    }
  }
}
