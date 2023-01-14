import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'
import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await Permission.createMany([
      {
        name: 'can_create_staff',
        displayName: 'Can Create Staff',
      },
      {
        name: 'can_view_staff',
        displayName: 'Can View Staff',
      },
      {
        name: 'can_edit_staff',
        displayName: 'Can Edit Staff',
      },
      {
        name: 'can_delete_staff',
        displayName: 'Can Delete Staff',
      },
      {
        name: 'can_create_member',
        displayName: 'Can Create Member',
      },
      {
        name: 'can_view_member',
        displayName: 'Can View Member',
      },
      {
        name: 'can_edit_member',
        displayName: 'Can Edit Member',
      },
      {
        name: 'can_delete_member',
        displayName: 'Can Delete Member',
      },
    ])

    await Role.createMany([
      {
        name: 'superadmin',
        displayName: 'Super Admin',
      },
    ])

    await User.create({
      username: 'superadmin',
      password: 'secret123',
    })
  }
}
