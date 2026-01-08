import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CButton,
  CAlert,
} from '@coreui/react'
import { CriterioService } from '../services/criterioService'

export default function CriterioImport({ onSuccess }) {
  const [file, setFile] = useState(null)
  const [msg, setMsg] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    const { data } = await CriterioService.importar(file)
    setMsg(`Importados: ${data.sucesso} | Erros: ${data.erros}`)
    onSuccess && onSuccess()
  }

  return (
    <CCard className="mb-3">
      <CCardBody>
        <h6>Importar Critérios</h6>
        {msg && <CAlert color="success">{msg}</CAlert>}
        <CForm onSubmit={submit}>
          <CFormInput
            type="file"
            accept=".csv,.xlsx"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <CButton className="mt-2" color="primary" type="submit">
            Importar
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}
