export default interface Contract {
  contractId: number
  customerName: string
  contractType: string // "BUY" || "SELL"
  amount: number
  negotiatedValue: number
  contractBegin: string
  amountMonths: number | undefined
  pdfDocumentURI: string

  // Olny front-end //
  contractBeginFormatted: string
}

export function buildContract(obj: any): Contract {
  const _contract: Contract = {
    contractId: obj.contractId,
    customerName: obj.customerName,
    contractType: obj.contractType,
    amount: obj.amount,
    negotiatedValue: obj.negotiatedValue,
    contractBegin: obj.contractBegin,
    amountMonths: obj.amountMonths,
    pdfDocumentURI: obj.pdfDocumentURI,
    contractBeginFormatted: new Date(obj.contractBegin).toUTCString()
  }
  return _contract
}