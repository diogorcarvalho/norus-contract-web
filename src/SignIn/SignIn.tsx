import React, { useContext, useState } from 'react'
import AuthContext from '../contexts/Auth'
import './SignIn.css'

const SignIn: React.FC = () => {

  const { signIn } = useContext(AuthContext)

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  function handleSignIn(ev: any) {
    signIn(userName, password)
  }

  function validateForm() {
    return userName.length > 0 && password.length > 0;
  }

  return (
    <div style={{'padding': '45px 35vw'}}>
      <div className="card">
        <div className="card-body">
          <h3>Login</h3>
          <div className="form-group">
            <label>Usuário</label>
            <input type="text" className="form-control" value={userName} onChange={(ev: any) => setUserName(ev.target.value)} />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input type="password" className="form-control" value={password} onChange={(ev: any) => setPassword(ev.target.value)} />
          </div>
          <button className="btn btn-primary" disabled={!validateForm()} onClick={(ev) => handleSignIn(ev)} type="button">Entrar</button>
        </div>
      </div>

    </div>
  )
}

export default SignIn