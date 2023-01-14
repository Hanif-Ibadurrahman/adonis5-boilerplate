import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_has_roles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('uuid').unique()
      table.integer('user_id').unsigned().references('users.id').nullable()
      table.integer('role_id').unsigned().references('roles.id').nullable()
      table.unique(['user_id', 'role_id'])
      table.integer('created_by').unsigned().references('users.id').nullable()
      table.integer('updated_by').unsigned().references('users.id').nullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
