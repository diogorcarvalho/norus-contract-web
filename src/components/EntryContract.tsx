import React, { useState, useEffect, useContext } from 'react'
import Contract, { buildContract } from '../models/Contract'
import FileUpdate from './FileUpdate'
import { FileResponde } from '../models/FileResponde'
import { postContract } from '../services/Contracts'
import { MainContext } from '../components/Main'

const EntryContract: React.FC = () => {

  const { changePage } = useContext(MainContext)

  const [customerName, setCustomerName] = useState<string>('')
  const [contractType, setContractType] = useState<'BUY' | 'SELL'>('BUY')
  const [amount, setAmount] = useState<number>(1)
  const [negotiatedValue, setNegotiatedValue] = useState<number>(0)
  const [contractBegin, setContractBegin] = useState<string>(new Date().toUTCString())
  const [amountMonths, setAmountMonths] = useState<number | undefined>(1)
  const [pdfDocumentURI, setPdfDocumentURI] = useState<string | undefined>(undefined)

  useEffect(() => {
    // TODO
  }, [])

  function handleAddPdf(doc: FileResponde) {
    console.log('>>>>', doc)
    if (!!doc) {
      setPdfDocumentURI(doc.url)
    }
  }

  function validateForm() {
    return customerName.length > 0
      && (contractType === 'BUY' || contractType === 'SELL')
      && amount > 0
      && negotiatedValue > 0
      && (!!amountMonths && amountMonths > 0)
      && (!!pdfDocumentURI && pdfDocumentURI.length > 0);
  }

  function handleSubmit(ev: any) {
    ev.preventDefault()

    const _contract = buildContract({
      contractId: 0,
      customerName,
      contractType,
      amount,
      negotiatedValue,
      contractBegin: new Date(contractBegin).toJSON(),
      amountMonths,
      pdfDocumentURI
    })

    delete _contract.contractBeginFormatted

    postContract(_contract).then((data: Contract) => {
      changePage('LIST', undefined)
    }).catch((error: any) => {
      alert(error)
    })
  }

  function handleCancel() {
    changePage('LIST', undefined)
  }

  return (
    <div style={{'marginTop': '25px', 'width': '80vw', 'marginBottom': '50px', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
      <h3>Novo contrato</h3>
      <form onSubmit={(ev) => handleSubmit(ev)}>
        
        <div className="form-group">
          <label>Nome do cliente</label>
          <input type="text" className="form-control" value={customerName} onChange={(e: any) => setCustomerName(e.target.value)}/>
        </div>
        
        <div className="form-group">
          <label>Tipo do Contrato</label>
          <select className="form-control" value={contractType} onChange={(e: any) => setContractType(e.target.value)}>
            <option value="BUY">Compra</option>
            <option value="SELL">Venda</option>
          </select>
        </div>

        <div className="form-group">
          <label>Quantidade negociada</label>
          <input type="number" className="form-control" min="1" value={amount} onChange={(e: any) => setAmount(+e.target.value)}/>
        </div>

        <div className="form-group">
          <label>Valor negociado</label>
          <input type="number" className="form-control" value={negotiatedValue} onChange={(e: any) => setNegotiatedValue(+e.target.value)}/>
        </div>

        <div className="form-group">
          <label>Início do contrato</label>
          <input type="date" className="form-control" value={contractBegin.toString()} onChange={(e: any) => setContractBegin(e.target.value)}/>
        </div>

        <div className="form-group">
          <label>Duração em meses do contrato</label>
          <input type="number" className="form-control" value={amountMonths} onChange={(e: any) => setAmountMonths(+e.target.value)}/>
        </div>

        <div>
          <FileUpdate onResponse={(doc: FileResponde) => handleAddPdf(doc)} />
        </div>
        
        <div style={{'display': 'flex', 'justifyContent': 'space-around'}}>
          <button className="btn btn-outline-primary" type="button" onClick={() => handleCancel()}>Cancelar</button>
          <button className="btn btn-primary" type="submit" disabled={!validateForm()}>Salvar</button>
        </div>
      </form>
    </div>
  )
}
 export default EntryContract