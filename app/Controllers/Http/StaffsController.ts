import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExceptionHandler from 'App/Exceptions/Handler'
import { HTTP_STATUS_CREATED } from 'App/Helper/Response/HttpResponse'
import StaffService from 'App/Service/Staff/StaffService'
import CreateStaffValidator from 'App/Validators/Staff/CreateStaffValidator'

export default class StaffsController {
  protected staffService: StaffService

  constructor() {
    this.staffService = new StaffService()
  }

  public async createStaff(ctx: HttpContextContract) {
    try {
      const { request, response, bouncer, auth } = ctx
      await bouncer.with('PermissionPolicy').authorize('canCreateStaff')
      const input = await request.validate(CreateStaffValidator)
      const staff = await this.staffService.createStaff(auth, {
        username: input.username,
        password: input.password,
        name: input.name,
        email: input.email,
        address: input.address,
        roleUuid: input.role_id,
      })
      return response.status(HTTP_STATUS_CREATED).send({ data: staff.serialize() })
    } catch (error) {
      return new ExceptionHandler().handle(error, ctx)
    }
  }
}
