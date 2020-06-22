import User, { buildUser } from './User'

export default interface UserCredential {
  user: User
  token: string
}

export function buildUserCredential(obj: any): UserCredential {
  const _loggedUserCredential: UserCredential = {
    user: buildUser(obj.user),
    token: obj.token
  }
  return _loggedUserCredential
}