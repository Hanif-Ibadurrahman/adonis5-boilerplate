import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Member from 'App/Models/Member'
import Staff from 'App/Models/Staff'
import User from 'App/Models/User'
import { isEmpty } from 'lodash'

export default class PermissionPolicy extends BasePolicy {
  public async canCreateStaff(user: User) {
    await user.load('roles', (roleQuery) => {
      roleQuery.preload('permissions')
    })
    if (isEmpty(user.roles)) {
      return false
    }
    let roles: string[] = await user.roles.map((role) => {
      return role.name
    })
    let permissions: string[] = []
    await user.roles.map((role) => {
      role.permissions.map((permission) => {
        return permissions.push(permission.name)
      })
    })
    const isCanCreateStaff =
      permissions.some((permission) => permission === 'can_create_staff') ||
      roles.some((role) => role === 'superadmin')
    return isCanCreateStaff
  }

  public async canViewStaff(user: User, staff: Staff) {
    await user.load('staff')
    await user.load('roles', (roleQuery) => {
      roleQuery.preload('permissions')
    })
    if (isEmpty(user.roles)) {
      return false
    }
    let roles: string[] = await user.roles.map((role) => {
      return role.name
    })
    let permissions: string[] = []
    await user.roles.map((role) => {
      role.permissions.map((permission) => {
        return permissions.push(permission.name)
      })
    })
    const isOwner = user.staff.userId === staff.userId
    const isCanViewStaff =
      permissions.some((permission) => permission === 'can_view_staff') ||
      roles.some((role) => role === 'superadmin') ||
      isOwner
    return isCanViewStaff
  }

  public async canEditStaff(user: User, staff: Staff) {
    await user.load('staff')
    await user.load('roles', (roleQuery) => {
      roleQuery.preload('permissions')
    })
    if (isEmpty(user.roles)) {
      return false
    }
    let roles: string[] = await user.roles.map((role) => {
      return role.name
    })
    let permissions: string[] = []
    await user.roles.map((role) => {
      role.permissions.map((permission) => {
        return permissions.push(permission.name)
      })
    })
    const isOwner = user.staff.userId === staff.userId
    const isCanEditStaff =
      permissions.some((permission) => permission === 'can_edit_staff') ||
      roles.some((role) => role === 'superadmin') ||
      isOwner
    return isCanEditStaff
  }

  public async canDeleteStaff(user: User) {
    await user.load('roles', (roleQuery) => {
      roleQuery.preload('permissions')
    })
    if (isEmpty(user.roles)) {
      return false
    }
    let roles: string[] = await user.roles.map((role) => {
      return role.name
    })
    let permissions: string[] = []
    await user.roles.map((role) => {
      role.permissions.map((permission) => {
        return permissions.push(permission.name)
      })
    })
    const isCanDeleteStaff =
      permissions.some((permission) => permission === 'can_delete_staff') ||
      roles.some((role) => role === 'superadmin')

    return isCanDeleteStaff
  }

  public async canCreateMember(user: User) {
    await user.load('roles', (roleQuery) => {
      roleQuery.preload('permissions')
    })
    if (isEmpty(user.roles)) {
      return false
    }
    let roles: string[] = await user.roles.map((role) => {
      return role.name
    })
    let permissions: string[] = []
    await user.roles.map((role) => {
      role.permissions.map((permission) => {
        return permissions.push(permission.name)
      })
    })
    const isCanCreateStaff =
      permissions.some((permission) => permission === 'can_create_member') ||
      roles.some((role) => role === 'superadmin')
    return isCanCreateStaff
  }

  public async canViewMember(user: User, member: Member) {
    await user.load('member')
    await user.load('roles', (roleQuery) => {
      roleQuery.preload('permissions')
    })
    if (isEmpty(user.roles)) {
      return false
    }
    let roles: string[] = await user.roles.map((role) => {
      return role.name
    })
    let permissions: string[] = []
    await user.roles.map((role) => {
      role.permissions.map((permission) => {
        return permissions.push(permission.name)
      })
    })
    const isOwner = user.member.userId === member.userId
    const isCanViewStaff =
      permissions.some((permission) => permission === 'can_view_member') ||
      roles.some((role) => role === 'superadmin') ||
      isOwner
    return isCanViewStaff
  }

  public async canEditMemberf(user: User, member: Member) {
    await user.load('member')
    await user.load('roles', (roleQuery) => {
      roleQuery.preload('permissions')
    })
    if (isEmpty(user.roles)) {
      return false
    }
    let roles: string[] = await user.roles.map((role) => {
      return role.name
    })
    let permissions: string[] = []
    await user.roles.map((role) => {
      role.permissions.map((permission) => {
        return permissions.push(permission.name)
      })
    })
    const isOwner = user.member.userId === member.userId
    const isCanEditStaff =
      permissions.some((permission) => permission === 'can_edit_staff') ||
      roles.some((role) => role === 'superadmin') ||
      isOwner
    return isCanEditStaff
  }

  public async canDeleteMember(user: User) {
    await user.load('roles', (roleQuery) => {
      roleQuery.preload('permissions')
    })
    if (isEmpty(user.roles)) {
      return false
    }
    let roles: string[] = await user.roles.map((role) => {
      return role.name
    })
    let permissions: string[] = []
    await user.roles.map((role) => {
      role.permissions.map((permission) => {
        return permissions.push(permission.name)
      })
    })
    const isCanDeleteStaff =
      permissions.some((permission) => permission === 'can_delete_member') ||
      roles.some((role) => role === 'superadmin')

    return isCanDeleteStaff
  }
}
