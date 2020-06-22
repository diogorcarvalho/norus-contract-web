import React, { useState, useEffect, useContext } from 'react'
import { MainContext } from '../components/Main'
import { FileResponde } from '../models/FileResponde'
import Contract from '../models/Contract'
import { getContract, patchtContract } from '../services/Contracts'
import FileUpdate from './FileUpdate'
import PatchRequest from '../models/PatchRequest'

let timeoutId: any = undefined

const EditContract: React.FC = () => {

  const { contractId, changePage } = useContext(MainContext)

  const [contract, setContract] = useState<Contract>({} as Contract)

  useEffect(() => {

    if (!!contractId) {
      getContract(contractId).then((_contract: Contract) => {

        _contract.contractBegin = formataStringData(_contract.contractBegin)

        setContract(_contract)
      })
    }
      
  }, [])

  function patchContract(field: string, value: any) {
    
    clearTimeout(timeoutId)

    const _payload: PatchRequest = {
      entityId: +contract.contractId,
      field: field
    }

    switch (field) {
      case 'customerName':
          setContract({...contract, customerName: value})
          _payload.stringValue = value
        break
      case 'contractType':
          setContract({...contract, contractType: value})
          _payload.stringValue = value
        break
      case 'amount':
          setContract({...contract, amount: +value})
          _payload.intValue = +value
        break
      case 'negotiatedValue':
          setContract({...contract, negotiatedValue: +value})
          _payload.floatValue = +value
        break
      case 'contractBegin':
          setContract({...contract, contractBegin: formataStringData(value)})
          _payload.dateTimeValue = new Date(value)
        break
      case 'amountMonths':
          setContract({...contract, amountMonths: +value})
          _payload.intValue = +value
        break
      case 'pdfDocumentURI':
          setContract({...contract, pdfDocumentURI: value})
          _payload.stringValue = value
        break
    }

    timeoutId = setTimeout(() => {
      patchtContract(_payload).then((_contract: Contract) => {
        setContract(_contract)
      }).catch((error: any) => {
        alert(error)
      })
    }, 600)  
  }

  function handleAddPdf(doc: FileResponde) {
    if (!!doc && !!contract) {
      const _contract = {...contract, pdfDocumentURI: doc.url }
      setContract(_contract)
      patchContract('pdfDocumentURI', doc.url)
    }
  }

  function handleCancel() {
    changePage('LIST', undefined)
  }

  function formataStringData(date: string) {
    console.log('>>> date', date)
    const d = new Date(date)
    return d.toLocaleDateString().split('/').reverse().join('-')
  }

  if (!contract) return <div>Carregando...</div>

  return (
    <div style={{'marginTop': '25px', 'width': '80vw', 'marginBottom': '50px', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
      <h3>Editar contrato</h3>
      
      <div>
        <div className="form-group">
          <label>Nome do cliente</label>
          <input type="text" className="form-control" value={contract.customerName} onChange={(e: any) => patchContract('customerName', e.target.value)} />
        </div>
        
        <div className="form-group">
          <label>Tipo do Contrato</label>
          <select className="form-control" value={contract.contractType} onChange={(e: any) => patchContract('contractType', e.target.value)}>
            <option value="BUY">Compra</option>
            <option value="SELL">Venda</option>
          </select>
        </div>

        <div className="form-group">
          <label>Quantidade negociada</label>
          <input type="number" className="form-control" min="1" value={contract.amount} onChange={(e: any) => patchContract('amount', e.target.value)}/>
        </div>

        <div className="form-group">
          <label>Valor negociado</label>
          <input type="number" className="form-control" value={contract.negotiatedValue} onChange={(e: any) => patchContract('negotiatedValue', e.target.value)}/>
        </div>

        <div className="form-group">
          <label>Início do contrato</label>
          <input type="date" className="form-control" value={contract.contractBegin} onChange={(e: any) => patchContract('contractBegin', e.target.value)}/>
        </div>

        <div className="form-group">
          <label>Duração em meses do contrato</label>
          <input type="number" className="form-control" value={contract.amountMonths} onChange={(e: any) => patchContract('amountMonths', e.target.value)}/>
        </div>

        <div>
          <FileUpdate onResponse={(doc: FileResponde) => handleAddPdf(doc)} />
        </div>
        
        <div style={{'display': 'flex', 'justifyContent': 'space-around'}}>
          <button className="btn btn-outline-primary" type="button" onClick={() => handleCancel()}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

export default EditContract