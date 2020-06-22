import React, { useContext } from 'react'
import AuthContext from '../contexts/Auth'

import SignIn from '../SignIn/SignIn'
import Main from '../components/Main'

const Routes: React.FC = () => {

  const { signed } = useContext(AuthContext)

  return signed ? <Main /> : <SignIn />
}

export default Routes