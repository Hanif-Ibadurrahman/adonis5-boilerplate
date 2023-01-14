import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'members'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('uuid').unique()
      table.integer('user_id').unsigned().references('users.id').nullable()
      table.string('name', 128).notNullable()
      table.string('email').nullable().unique()
      table.text('address').nullable()
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
