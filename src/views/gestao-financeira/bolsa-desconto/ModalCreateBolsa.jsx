// components/ModalCreateBolsa.jsx
import React, { useEffect, useState } from 'react'
import { CModal, CModalHeader, CModalBody, CModalFooter, CFormInput, CFormSelect, CButton } from '@coreui/react'
import scholarshipsService from '../../../services/scholarshipsAndDiscountsService'
import api from '../../../api'

export default function ModalCreateBolsa({ isOpen, onClose, onSaved }) {
  const [alunos, setAlunos] = useState([])
  const [form, setForm] = useState({
    aluno_id: '',
    tipo: '',
    percentual: '',
    motivo: '',
    data_inicio: '',
    data_fim: ''
  })

  useEffect(() => {
    api.get('/secretaria-academica/students').then((res) => setAlunos(res.data))
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    await scholarshipsService.create(form)
    onSaved()
    onClose()
  }

  return (
    <CModal visible={isOpen} onClose={onClose}>
      <CModalHeader closeButton><strong>Nova Bolsa / Desconto</strong></CModalHeader>

      <CModalBody>
        <CFormSelect
          name="aluno_id"
          label="Aluno"
          value={form.aluno_id}
          onChange={handleChange}
        >
          <option value="">Selecione</option>
          {alunos.map((a) => (
            <option key={a.id} value={a.id}>{a.nome}</option>
          ))}
        </CFormSelect>

        <CFormInput
          name="tipo"
          label="Tipo"
          value={form.tipo}
          onChange={handleChange}
        />

        <CFormInput
          name="percentual"
          label="Percentual (%)"
          type="number"
          value={form.percentual}
          onChange={handleChange}
        />

        <CFormInput
          name="motivo"
          label="Motivo"
          value={form.motivo}
          onChange={handleChange}
        />

        <CFormInput
          name="data_inicio"
          type="date"
          label="Data Início"
          value={form.data_inicio}
          onChange={handleChange}
        />

        <CFormInput
          name="data_fim"
          type="date"
          label="Data Fim"
          value={form.data_fim}
          onChange={handleChange}
        />
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>Cancelar</CButton>
        <CButton color="success" onClick={handleSave}>Salvar</CButton>
      </CModalFooter>
    </CModal>
  )
}
