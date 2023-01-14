import Staff from 'App/Models/Staff'
import AuthService from '../Auth/AuthService'
import NotFoundException from 'App/Exceptions/NotFoundException/NotFound'
import { CreateStaffContract } from './Contract/StaffServiceContract'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import Event from '@ioc:Adonis/Core/Event'

export default class StaffService {
  protected authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  public async getStaffByUuid(uuid: string): Promise<Staff> {
    const staff = await Staff.findBy('uuid', uuid)

    if (!staff) {
      throw new NotFoundException(`Staff with uuid ${uuid} is not found`)
    }

    return staff
  }

  public async getStaffById(id: number): Promise<Staff> {
    const staff = await Staff.find(id)

    if (!staff) {
      throw new NotFoundException(`Staff with id ${id} is not found`)
    }

    return staff
  }

  public async createStaff(auth: AuthContract, input: CreateStaffContract): Promise<User> {
    const trx = await Database.transaction()

    try {
      const user = await this.authService.createUser({
        auth: auth,
        username: input.username,
        password: input.password,
        trx: trx,
        isStaff: true,
        roleUuids: input.roleUuid,
      })

      const staff = new Staff()
      staff.userId = user.id
      staff.name = input.name
      staff.email = input.email

      staff.useTransaction(trx)
      await staff.save()

      Event.emit('send-email:new-staff', { staff: staff })

      await trx.commit()

      return user
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}
