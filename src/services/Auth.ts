import UserCredential, { buildUserCredential } from '../models/UserCredential'
import { environment } from '../environments/environment'

export function signIn(userName: string, password: string): Promise<UserCredential> {
  return new Promise(async (resolve, rejects) => {
    const formData = new FormData()
    formData.set('UserName', userName)
    formData.set('Password', password)
  
    const json = await fetch(`${environment.apiUrl}v1/userCredential`, {
      method: 'POST',
      cache: 'no-cache',
      body: formData
    })
      .then((response: Response) => {
        if (response.status === 200) {
          return response.json()
        }
        return null
      })

    if (!!json) {
      resolve(buildUserCredential(json))
    } else {
      rejects('Usuário ou/e senha inválido(s)')
    }
  })
}