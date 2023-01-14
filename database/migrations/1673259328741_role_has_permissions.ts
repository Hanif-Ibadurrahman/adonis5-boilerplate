import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'role_has_permissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('uuid').unique()
      table.integer('role_id').unsigned().references('roles.id').nullable()
      table.integer('permission_id').unsigned().references('permissions.id').nullable()
      table.unique(['role_id', 'permission_id'])
      table.integer('created_by').unsigned().references('users.id').nullable()
      table.integer('updated_by').unsigned().references('users.id').nullable()

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
