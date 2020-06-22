import React, { createContext, useState, useEffect } from 'react'
import User from '../models/User'
import { signIn } from '../services/Auth'
import UserCredential from '../models/UserCredential'

interface AuthContextData {
  signed: boolean
  token: string | undefined
  user: User | undefined
  signIn(userName: string, password: string): Promise<void>,
  signOut(): void,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const LOCAL_STOREGE_CONTEXT_APP_KEY = '@NorusContextApp:userCredential'

export const AuthProvider: React.FC = ({ children }) => {

  const [userCredential, setUserCredential] = useState<UserCredential | undefined>(undefined)

  useEffect(() => {
    const _userCredential = localStorage.getItem(LOCAL_STOREGE_CONTEXT_APP_KEY)
    
    if (!!_userCredential) {
      setUserCredential(JSON.parse(_userCredential))
    }
  }, [])

  function handleSignIn(userName: string, password: string) {
    return signIn(userName, password).then((userCredential: UserCredential) => {
      setUserCredential(userCredential)
      localStorage.setItem(LOCAL_STOREGE_CONTEXT_APP_KEY, JSON.stringify(userCredential))
    }).catch((error: string) => {
      alert(error)
    })
  }

  function handleSignOut() {
    setUserCredential(undefined)
    localStorage.removeItem(LOCAL_STOREGE_CONTEXT_APP_KEY)
  }

  return (
    <AuthContext.Provider value={{
      signed: !!userCredential,
      user: userCredential?.user,
      signIn: handleSignIn,
      signOut: handleSignOut,
      token: userCredential?.token
    }}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext