import React, { useContext } from 'react'
import AuthContext from '../contexts/Auth'
import { MainContext } from '../components/Main'

const Navbar: React.FC = () => {
  
  const { user, signOut } = useContext(AuthContext)

  const { changePage } = useContext(MainContext)

  function handleNewContract() {
    changePage('ENTRY', undefined)
  }

  function handleSearchContracts() {
    changePage('SEARCH', undefined)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand">Bem vindo ao [ Norus Contratos Web ] - {user?.name}</span>

      <div className="collapse navbar-collapse">
        <button className="btn btn-outline-primary" type="submit" onClick={() => handleNewContract()}>Novo contrato</button>
      </div>

      <div className="collapse navbar-collapse">
        <button className="btn btn-outline-primary" type="submit" onClick={() => handleSearchContracts()}>Pesquisar contratos</button>
      </div>
  
      <div className="collapse navbar-collapse">
        <button className="btn btn-outline-primary" type="submit" onClick={() => signOut()}>Sair</button>      
      </div>
    </nav>
  )
}

export default Navbar
