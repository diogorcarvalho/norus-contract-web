import React, { useState, useContext } from 'react'
import { environment } from '../environments/environment'
import { FileResponde } from '../models/FileResponde'
import AuthContext from '../contexts/Auth'

export default function FileUpdate(props: { onResponse: (response: FileResponde) => void }) {

  const { token } = useContext(AuthContext)

  const [file, setFile] = useState<File>()

  function handleSubmit() {
    
    if (!file) return

    const bearerToken = `Bearer ${token}`
    
    const formData = new FormData()
    
    formData.set('file', file)
    
    const request = new XMLHttpRequest()
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        const response: FileResponde = JSON.parse(request.response)
        props.onResponse(response)
      }
    }
    request.open('POST', `${environment.apiUrl}v1/fileupload/pdf`)
    request.setRequestHeader('Authorization', bearerToken)
    request.send(formData)
  }

  function onChange(ev: any) {
    console.dir(ev.target.files[0])
    setFile(ev.target.files[0])
  }

  return (
    <>
    <div className="form-group">
      <label>File Upload</label>
      <input type="file" className="form-control-file" name="upload" accept="application/pdf" onChange={(ev) => onChange(ev)} />
    </div>
    <div className="form-group">
      <button className="btn btn-primary" type="button" onClick={() => handleSubmit()}>Upload</button>
    </div>
    </>
  )
}
