import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CButton,
} from '@coreui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { CriterioService } from '../services/criterioService'

export default function CriterioForm() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    descricao: '',
    peso: '',
    avaliacao_id: '',
  })

  useEffect(() => {
    if (id) {
      CriterioService.obter(id).then(({ data }) => setForm(data))
    }
  }, [id])

  const submit = async (e) => {
    e.preventDefault()
    id
      ? await CriterioService.atualizar(id, form)
      : await CriterioService.criar(form)

    navigate('/evaluation-criterias')
  }

  return (
    <CCard>
      <CCardBody>
        <CForm onSubmit={submit}>
          <CFormInput
            label="Descrição"
            required
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          />

          <CFormInput
            label="Peso"
            type="number"
            step="0.1"
            required
            value={form.peso}
            onChange={(e) => setForm({ ...form, peso: e.target.value })}
          />

          <CFormInput
            label="ID da Avaliação"
            type="number"
            required
            value={form.avaliacao_id}
            onChange={(e) =>
              setForm({ ...form, avaliacao_id: e.target.value })
            }
          />

          <CButton type="submit" color="primary" className="mt-3">
            Guardar
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}
