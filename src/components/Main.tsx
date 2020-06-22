import React, { useState, createContext } from 'react'
import ContractsList from './ContractsList'
import EntryContract from './EntryContract'
import EditContract from './EditContract'
import SearchContracts from './SearchContracts'
import Navbar from './Navbar'

type PageEnum = 'LIST' | 'ENTRY' | 'EDIT' | 'SEARCH'

interface MainContextData {
  contractId: number | undefined
  page: PageEnum,
  changePage(page: PageEnum, contractId: number | undefined): void
}

interface Nav {
  page: PageEnum
  contractId: number | undefined
}

export const MainContext = createContext<MainContextData>({} as MainContextData)

const Main: React.FC = () => {

  const [nav, setNav] = useState<Nav>({page: 'LIST', contractId: undefined})

  function changeNav(page: PageEnum, contractId: number | undefined) {
    setNav({page: page, contractId: contractId})
  }

  return (
    <MainContext.Provider value={{contractId: nav.contractId, page: nav.page, changePage: changeNav}}>
      <Navbar />
      {nav.page === 'LIST' ? <ContractsList /> : ''}
      {nav.page === 'ENTRY' ? <EntryContract /> : ''}
      {nav.page === 'EDIT' ? <EditContract/> : ''}
      {nav.page === 'SEARCH' ? <SearchContracts /> : ''}
    </MainContext.Provider>
  )
}

export default Main