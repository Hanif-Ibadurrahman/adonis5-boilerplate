import { DateTime } from 'luxon'
import { v4 } from 'uuid'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import {
  column,
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Role from './Role'

export default class Permission extends compose(BaseModel, SoftDeletes) {
  public static table = 'permissions'

  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ serializeAs: 'id' })
  public uuid: string

  @column()
  public name: string

  @column()
  public displayName: string

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

  @manyToMany(() => Role, {
    localKey: 'id',
    pivotForeignKey: 'permission_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'role_id',
    pivotTable: 'role_has_permissions',
  })
  public roles: ManyToMany<typeof Role>

  @beforeCreate()
  public static generateUuid(permission: Permission) {
    permission.uuid = v4()
  }
}
