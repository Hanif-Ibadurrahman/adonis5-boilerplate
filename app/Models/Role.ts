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
  scope,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Permission from './Permission'
import { isUndefined } from 'lodash'

export default class Role extends compose(BaseModel, SoftDeletes) {
  public static table = 'roles'

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

  @manyToMany(() => Permission, {
    localKey: 'id',
    pivotForeignKey: 'role_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'permission_id',
    pivotTable: 'role_has_permissions',
  })
  public permissions: ManyToMany<typeof Permission>

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'role_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'user_has_roles',
  })
  public users: ManyToMany<typeof User>

  @beforeCreate()
  public static generateUuid(role: Role) {
    role.uuid = v4()
  }

  public static findRoleByUuids = scope(
    (query: ModelQueryBuilderContract<typeof Role, Role>, roleUuids?: string) => {
      if (!isUndefined(roleUuids)) {
        const uuids = roleUuids.split(',')
        query.whereIn('uuid', uuids)
      }
    }
  )
}
