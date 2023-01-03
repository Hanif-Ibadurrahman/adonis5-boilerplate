import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import BadRequestException from 'App/Exceptions/BadRequestException/BadRequest'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException/InternalServerError'
import NotFoundException from 'App/Exceptions/NotFoundException/NotFound'
import User from 'App/Models/User'
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { CredentialContract } from './Contract/AuthServiceContract'
import { JWTTokenContract } from '@ioc:Adonis/Addons/Jwt'

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

  public async createUser(username: string, password: string): Promise<User> {
    try {
      const user = await User.create({
        username: username,
        password: password,
      })

      return user
    } catch (error) {
      throw new InternalServerErrorException(
        'An unexpected condition has occurred on the server when create user'
      )
    }
  }

  public async login(
    input: CredentialContract,
    auth: AuthContract
  ): Promise<JWTTokenContract<User>> {
    try {
      const user = await User.findBy('username', input.username)

      if (!user) {
        throw new BadRequestException('Username or password is invalid')
      }

      if (!(await Hash.verify(user.password, input.password))) {
        throw new BadRequestException('Username or password is invalid')
      }

      const token = await auth.use('jwt').login(user, {
        payload: {
          id: user.uuid,
          username: user.username,
        },
      })

      user.lastLogin = DateTime.now()
      await user.save()

      return token
    } catch (error) {
      throw error
    }
  }

  public async logout(auth: AuthContract): Promise<void> {
    try {
      await auth.use('jwt').revoke()
    } catch (error) {
      throw error
    }
  }
}
