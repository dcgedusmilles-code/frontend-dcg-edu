import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormTextarea,
  CButton,
} from '@coreui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { AvaliacaoService } from '../services/avaliacaoService'

export default function AvaliacaoForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    data: '',
  })

  useEffect(() => {
    if (id) {
      AvaliacaoService.obter(id).then(({ data }) => setForm(data))
    }
  }, [id])

  const submit = async (e) => {
    e.preventDefault()
    id
      ? await AvaliacaoService.atualizar(id, form)
      : await AvaliacaoService.criar(form)

    navigate('/avaliacao-certicacao/assessments')
  }

  return (
    <CCard>
      <CCardBody>
        <CForm onSubmit={submit}>
          <CFormInput
            label="Título"
            required
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          />

          <CFormTextarea
            label="Descrição"
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          />

          <CFormInput
            type="date"
            label="Data"
            required
            value={form.data}
            onChange={(e) => setForm({ ...form, data: e.target.value })}
          />

          <CButton type="submit" color="primary" className="mt-3">
            Guardar
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}
