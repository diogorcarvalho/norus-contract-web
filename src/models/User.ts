export default interface User {
  userId: number
  name: string
  email: string
  userName: string
}

export function buildUser(obj: any): User {
  const _user: User = {
    userId: obj.userId,
    name: obj.name,
    email: obj.email,
    userName: obj.userName
  }
  return _user
}