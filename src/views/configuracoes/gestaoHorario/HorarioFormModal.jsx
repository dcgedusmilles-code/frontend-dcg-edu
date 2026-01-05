import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormSelect
} from '@coreui/react'
import { createHorario, updateHorario } from '../../../services/horarioService' 

const HorarioFormModal = ({ visible, onClose, initialData, onSaved }) => {
  const [form, setForm] = useState({
    dia_semana: '',
    inicio_hora: '',
    fim_hora: '',
    sala: '',
    recorrente: true,
  })

  useEffect(() => {
    if (initialData) setForm(initialData)
  }, [initialData])

  const salvar = async () => {
    if (initialData) await updateHorario(initialData.id, form)
    else await createHorario(form)

    onSaved()
    onClose()
  }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{initialData ? 'Editar Horário' : 'Novo Horário'}</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <CFormSelect
          label="Dia da Semana"
          value={form.dia_semana}
          onChange={(e) => setForm({ ...form, dia_semana: e.target.value })}
        >
          <option value="">Selecione</option>
          <option value="segunda">Segunda</option>
          <option value="terca">Terça</option>
          <option value="quarta">Quarta</option>
          <option value="quinta">Quinta</option>
          <option value="sexta">Sexta</option>
        </CFormSelect>

        <CFormInput
          type="time"
          label="Hora Início"
          value={form.inicio_hora}
          onChange={(e) => setForm({ ...form, inicio_hora: e.target.value })}
        />

        <CFormInput
          type="time"
          label="Hora Fim"
          value={form.fim_hora}
          onChange={(e) => setForm({ ...form, fim_hora: e.target.value })}
        />

        <CFormInput
          label="Sala"
          value={form.sala}
          onChange={(e) => setForm({ ...form, sala: e.target.value })}
        />
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={salvar}>
          Salvar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default HorarioFormModal
