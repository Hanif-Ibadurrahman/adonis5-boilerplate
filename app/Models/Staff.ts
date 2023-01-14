import { DateTime } from 'luxon'
import { v4 } from 'uuid'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { column, BaseModel, beforeCreate, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Staff extends compose(BaseModel, SoftDeletes) {
  public static table = 'staffs'

  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ serializeAs: 'id' })
  public uuid: string

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public address: string | null

  @column({ serializeAs: null })
  public userId: number

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

  @beforeCreate()
  public static generateUuid(staff: Staff) {
    staff.uuid = v4()
  }

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
