import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import BadRequestException from 'App/Exceptions/BadRequestException/BadRequest'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException/InternalServerError'
import NotFoundException from 'App/Exceptions/NotFoundException/NotFound'
import User from 'App/Models/User'
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  CreateUserContract,
  CredentialContract,
  RefreshTokenContract,
} from './Contract/AuthServiceContract'
import { JWTTokenContract } from '@ioc:Adonis/Addons/Jwt'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Limiter } from '@adonisjs/limiter/build/services'
import Role from 'App/Models/Role'
export default class AuthService {
  public async getUserByUsername(username: string): Promise<User> {
    const user = await User.findBy('username', username)

    if (!user) {
      throw new NotFoundException(`User with username ${username} is not found`)
    }

    return user
  }

  public async getUserByUuid(uuid: string): Promise<User> {
    const user = await User.findBy('uuid', uuid)

    if (!user) {
      throw new NotFoundException(`User with uuid ${uuid} is not found`)
    }

    return user
  }

  public async getUserById(id: number): Promise<User> {
    const user = await User.find(id)

    if (!user) {
      throw new NotFoundException(`User with id ${id} is not found`)
    }

    return user
  }

  public async createUser(input: CreateUserContract): Promise<User> {
    const { auth, username, password, trx, isStaff, roleUuids } = input

    try {
      const user = new User()
      user.username = username
      user.password = password
      user.createdBy = auth.user!.id

      if (isStaff && roleUuids) {
        const roles = await Role.query().apply((scope) => scope.findRoleByUuids(input.roleUuids))
        user.related('roles').sync(roles.map((role) => role.id))
        user.isStaff = isStaff
      }

      user.useTransaction(trx)
      await user.save()

      return user
    } catch (error) {
      await trx.rollback()
      throw new InternalServerErrorException(
        'An unexpected condition has occurred on the server when create user'
      )
    }
  }

  public async login(
    input: CredentialContract,
    ctx: HttpContextContract
  ): Promise<JWTTokenContract<User>> {
    try {
      const { auth, request } = ctx
      const throttleKey = `login_${input.username}_${request.ip()}`

      const limiter = Limiter.use({
        requests: 10,
        duration: '10 mins',
        blockDuration: '30 mins',
      })

      const user = await User.findBy('username', input.username)

      if (!user) {
        await limiter.increment(throttleKey)
        throw new BadRequestException('Username or password is invalid')
      }

      if (!(await Hash.verify(user.password, input.password))) {
        await limiter.increment(throttleKey)
        throw new BadRequestException('Username or password is invalid')
      }

      await limiter.delete(throttleKey)

      const token = await auth.use('jwt').login(user, {
        payload: {
          id: user.uuid,
          username: user.username,
        },
      })

      await user.merge({ lastLogin: DateTime.now() }).save()

      return token
    } catch (error) {
      throw new InternalServerErrorException(
        'An unexpected condition has occurred on the server when login'
      )
    }
  }

  public async refreshToken(
    input: RefreshTokenContract,
    ctx: HttpContextContract
  ): Promise<JWTTokenContract<User>> {
    try {
      const { auth } = ctx
      const user = await auth.use('jwt').getUserFromRefreshToken(input.refreshToken)
      const token = await auth.use('jwt').loginViaRefreshToken(input.refreshToken, {
        payload: {
          id: user.uuid,
          username: user.username,
        },
      })

      return token
    } catch (error) {
      throw new InternalServerErrorException(
        'An unexpected condition has occurred on the server when request new token using resfresh token'
      )
    }
  }

  public async logout(auth: AuthContract): Promise<void> {
    try {
      await auth.use('jwt').revoke()
    } catch (error) {
      throw new InternalServerErrorException(
        'An unexpected condition has occurred on the server when logout'
      )
    }
  }
}
