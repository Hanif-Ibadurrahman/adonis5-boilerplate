import { DateTime } from 'luxon'
import { v4 } from 'uuid'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  beforeCreate,
  belongsTo,
  BelongsTo,
  manyToMany,
  ManyToMany,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Member from './Member'
import Staff from './Staff'
export default class User extends compose(BaseModel, SoftDeletes) {
  public static table = 'users'

  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ serializeAs: 'id' })
  public uuid: string

  @column()
  public username: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime()
  public lastLogin: DateTime

  @column()
  public isStaff: boolean

  @column({ serializeAs: null })
  public createdBy: number

  @column({ serializeAs: null })
  public updatedBy: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime | null

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'createdBy',
    serializeAs: 'created_by',
  })
  public createdByUser: BelongsTo<typeof User>

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'updatedBy',
    serializeAs: 'updated_by',
  })
  public updatedByUser: BelongsTo<typeof User>

  @hasOne(() => Member, {
    foreignKey: 'userId',
    localKey: 'id',
  })
  public member: HasOne<typeof Member>

  @hasOne(() => Staff, {
    foreignKey: 'userId',
    localKey: 'id',
  })
  public staff: HasOne<typeof Staff>

  @manyToMany(() => Role, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'role_id',
    pivotTable: 'user_has_roles',
  })
  public roles: ManyToMany<typeof Role>

  @beforeCreate()
  public static generateUuid(user: User) {
    user.uuid = v4()
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
