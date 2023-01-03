export interface CredentialContract {
  username: string
  password: string
}

export interface ChangePasswordContract {
  password: string
  new_password: string
}

export interface ResetPasswordContract {
  email: string
}
