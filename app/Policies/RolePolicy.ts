import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import { isEmpty } from 'lodash'

export default class RolePolicy extends BasePolicy {
  public async isSuperAdmin(user: User) {
    await user.load('roles')
    if (isEmpty(user.roles)) {
      return false
    }
    let roles: string[] = await user.roles.map((role) => {
      return role.name
    })
    return roles.some((role) => role === 'superadmin')
  }
}
