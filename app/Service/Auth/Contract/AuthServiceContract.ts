import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database'

export interface CreateUserContract {
  auth: AuthContract
  username: string
  password: string
  isStaff?: boolean
  roleUuids?: string
  trx: TransactionClientContract
}
export interface CredentialContract {
  username: string
  password: string
}
export interface RefreshTokenContract {
  refreshToken: string
}
export interface ChangePasswordContract {
  password: string
  new_password: string
}

export interface ResetPasswordContract {
  email: string
}
