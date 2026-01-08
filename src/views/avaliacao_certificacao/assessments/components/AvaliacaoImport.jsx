import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CButton,
  CAlert,
  CSpinner,
} from '@coreui/react'
import { AvaliacaoService } from '../services/avaliacaoService'

export default function AvaliacaoImport({ onSuccess }) {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const submit = async (e) => {
    e.preventDefault()

    if (!file) {
      setError('Selecione um ficheiro CSV ou Excel.')
      return
    }

    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const { data } = await AvaliacaoService.importar(file)

      setMessage(
        `Importação concluída: ${data.sucesso} registos importados, ${data.erros} erros.`,
      )

      onSuccess && onSuccess()
    } catch (err) {
      setError('Erro ao importar ficheiro. Verifique o formato.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CCard className="mb-3">
      <CCardBody>
        <h6>Importar Avaliações</h6>

        {message && <CAlert color="success">{message}</CAlert>}
        {error && <CAlert color="danger">{error}</CAlert>}

        <CForm onSubmit={submit}>
          <CFormInput
            type="file"
            accept=".csv,.xlsx,.xls"
            label="Ficheiro CSV ou Excel"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <CButton
            type="submit"
            color="primary"
            className="mt-3"
            disabled={loading}
          >
            {loading ? <CSpinner size="sm" /> : 'Importar'}
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}
