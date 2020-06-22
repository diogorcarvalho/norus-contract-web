import Contract, { buildContract } from '../models/Contract'
import { environment } from '../environments/environment'
import { buildUserCredential } from '../models/UserCredential'
import PatchRequest from '../models/PatchRequest'

export function searchContracts(keyword: string): Promise<Contract[]> {
  return new Promise((resolve, reject) => {
    const valur = localStorage.getItem('@NorusContextApp:userCredential')
    if (!valur) {
      reject('Error on token')
      return
    }    
    const userCredential = buildUserCredential(JSON.parse(valur))
    fetch(`${environment.apiUrl}v1/contracts/search/?keyword=${keyword}`, {
      method: 'GET',
      cache: 'no-cache',
      headers: { 'Authorization': `Bearer ${userCredential.token}` }
    })
    .then((response: Response) => response.json())
    .then((jsons: any[]) => jsons.map((json: any) => buildContract(json)))
    .then((contracts: Contract[]) => resolve(contracts))
  })
}

export function patchtContract(payload: PatchRequest): Promise<Contract> {
  return new Promise((resolve, reject) => {
    const valur = localStorage.getItem('@NorusContextApp:userCredential')
    if (!valur) {
      reject('Error on token')
      return
    }    
    const userCredential = buildUserCredential(JSON.parse(valur))
    fetch(`${environment.apiUrl}v1/contracts`, {
      method: 'PATCH',
      cache: 'no-cache',
      headers: {
        'Authorization': `Bearer ${userCredential.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then((response: Response) => {
      response.json().then((json: any) => {
        if (response.status === 200) {
          const contract = buildContract(json)
          resolve(contract)
        } else {
          reject(json.message)
        }
      })
    })
  })
}

export function getContract(contractId: number): Promise<Contract> {
  return new Promise((resolve, reject) => {
    const valur = localStorage.getItem('@NorusContextApp:userCredential')
    if (!valur) {
      reject('Error on token')
      return
    }    
    const userCredential = buildUserCredential(JSON.parse(valur))
    fetch(`${environment.apiUrl}v1/contracts/${contractId}`, {
      method: 'GET',
      cache: 'no-cache',
      headers: { 'Authorization': `Bearer ${userCredential.token}` }
    })
    .then((response: Response) => response.json())
    .then((json: any) => resolve(buildContract(json)))
  })
}

export function deleteContract(contractId: number): Promise<void> {
  return new Promise((resolve, reject) => {

    const valur = localStorage.getItem('@NorusContextApp:userCredential')
    if (!valur) {
      reject('Error on token')
      return
    }    
    const userCredential = buildUserCredential(JSON.parse(valur))

    fetch(`${environment.apiUrl}v1/contracts/${contractId}`, {
      method: 'DELETE',
      cache: 'no-cache',
      headers: {
        'Authorization': `Bearer ${userCredential.token}`
      }
    })
      .then((response: Response) => {
        if (response.status === 200) {
          return resolve()
        }
        return reject(response.statusText)
      })
  })
}

export function postContract(contract: Contract): Promise<Contract> {
  return new Promise(async (resolve, reject) => {

    const valur = localStorage.getItem('@NorusContextApp:userCredential')
    if (!valur) {
      reject('Error on token')
      return
    }    
    const userCredential = buildUserCredential(JSON.parse(valur))

    const json: any[] = await fetch(`${environment.apiUrl}v1/contracts`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Authorization': `Bearer ${userCredential.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contract)
    })
      .then((response: Response) => {
        if (response.status === 200) {
          return response.json()
        }
        return reject(response.statusText)
      })
    if (!!json) {
      resolve(buildContract(json))
      return
    }
    resolve(undefined)
  })
}

export function getAllContracts(): Promise<Contract[]> {
  return new Promise((resolve, reject) => {
    const valur = localStorage.getItem('@NorusContextApp:userCredential')
    if (!valur) {
      reject('Error on token')
      return
    }    
    const userCredential = buildUserCredential(JSON.parse(valur))
    fetch(`${environment.apiUrl}v1/contracts`, {
      method: 'GET',
      cache: 'no-cache',
      headers: { 'Authorization': `Bearer ${userCredential.token}` }
    })
    .then((response: Response) => response.json())
    .then((jsons: any[]) => jsons.map((json: any) => buildContract(json)))
    .then((contracts: Contract[]) => resolve(contracts))
  })
}