import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('uuid').unique()
      table.string('username', 64).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.dateTime('last_login').nullable()
      table.boolean('is_staff').defaultTo(false)

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.integer('created_by').unsigned().references('users.id').nullable()
      table.integer('updated_by').unsigned().references('users.id').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
