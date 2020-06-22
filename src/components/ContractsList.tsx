import React, { useState, useEffect, useContext } from 'react'
import Contract from '../models/Contract'
import { getAllContracts, deleteContract } from '../services/Contracts'
import { MainContext } from '../components/Main'

const ContractsList: React.FC = () => {

  const { changePage } = useContext(MainContext)

  const [contracts, setContracts] = useState<Contract[]>([])

  useEffect(() => {
    getAllContracts().then((contracts: Contract[]) => setContracts(contracts))
  }, [])

  function handleEdit(contractId: number) {
    changePage('EDIT', contractId)
  }

  function handleDelete(contractId: number) {
    deleteContract(contractId).then(() => {
      setContracts(contracts.filter(c => c.contractId !== contractId))
    })
  }

  return (
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
  )
}

export default ContractsList