import Member from 'App/Models/Member'
import AuthService from '../Auth/AuthService'
import NotFoundException from 'App/Exceptions/NotFoundException/NotFound'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import { CreateMemberContract } from './Contract/MemberServiceContract'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import Event from '@ioc:Adonis/Core/Event'

export default class MemberService {
  protected authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  public async getStaffByUuid(uuid: string): Promise<Member> {
    const member = await Member.findBy('uuid', uuid)

    if (!member) {
      throw new NotFoundException(`Member with uuid ${uuid} is not found`)
    }

    return member
  }

  public async getMemberById(id: number): Promise<Member> {
    const member = await Member.find(id)

    if (!member) {
      throw new NotFoundException(`Member with id ${id} is not found`)
    }

    return member
  }

  public async createMember(auth: AuthContract, input: CreateMemberContract): Promise<User> {
    const trx = await Database.transaction()

    try {
      const user = await this.authService.createUser({
        auth: auth,
        username: input.username,
        password: input.password,
        trx: trx,
      })

      const member = new Member()
      member.userId = user.id
      member.name = input.name
      member.email = input.email

      member.useTransaction(trx)
      await member.save()

      Event.emit('send-email:new-member', { member: member })

      await trx.commit()

      return user
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}
