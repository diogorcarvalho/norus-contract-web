import React, { useState, useEffect, useContext } from 'react'
import { MainContext } from '../components/Main'
import { searchContracts, deleteContract } from '../services/Contracts'
import Contract from '../models/Contract'

let timeoutId: any = undefined

const SearchContracts: React.FC = () => {

  const { changePage } = useContext(MainContext)

  const [keyword, setKeyword] = useState<string>('')

  const [contracts, setContracts] = useState<Contract[]>([])

  function handleEdit(contractId: number) {
    changePage('EDIT', contractId)
  }

  function handleDelete(contractId: number) {
    deleteContract(contractId).then(() => {
      setContracts(contracts.filter(c => c.contractId !== contractId))
    })
  }

  function handleBack() {
    changePage('LIST', undefined)
  }

  function handleSearch(value: string) {

    setKeyword(value)

    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      searchContracts(value).then((_contracts: Contract[]) => {
        setContracts(_contracts)
      })
    }, 600)
  }

  return (
    <div style={{'marginTop': '25px', 'width': '80vw', 'marginBottom': '50px', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
      <div className="form-group">
        <button onClick={() => handleBack()} className="btn btn-primary">Voltar</button>
      </div>
      <div className="form-group">
        <label>Pesquise contratps</label>
        <input type="text" value={keyword} onChange={(e: any) => handleSearch(e.target.value)} className="form-control" />
      </div>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome do cliente</th>
              <th scope="col">Tipo</th>
              <th scope="col">Quantidade</th>
              <th scope="col">Valor</th>
              <th scope="col">Início (data)</th>
              <th scope="col">Duração (meses)</th>
              <th scope="col">PDF</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map(contract =>
            <tr key={contract.contractId}>
              <th scope="row">{contract.contractId}</th>
              <td>{contract.customerName}</td>
              <td>{contract.contractType === 'BUY' ? 'Compra' : 'Venda'}</td>
              <td>{contract.amount}</td>
              <td>R$ {contract.negotiatedValue.toString().replace('.', ',')}</td>
              <td>{contract.contractBeginFormatted}</td>
              <td>{!!contract.amountMonths ? contract.amountMonths : '-'}</td>
              <td>
                <a href={contract.pdfDocumentURI} target="_blank" rel="noopener noreferrer">DPF</a>
              </td>
              <td style={{'display': 'flex', 'justifyContent': 'space-around'}}>
                <button className="btn btn-primary" onClick={() => handleEdit(contract.contractId)}>editar</button>
                <button className="btn btn-primary" onClick={() => handleDelete(contract.contractId)}>remover</button>
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SearchContracts