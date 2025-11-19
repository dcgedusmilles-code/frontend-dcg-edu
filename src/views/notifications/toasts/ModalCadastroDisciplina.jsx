import React, { useEffect, useState } from 'react'
import {
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import axios from '../../../api'

const ModalDisciplina = ({ disciplinaEditando, cursos, onSalvo }) => {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    carga_horaria: '',
    curso_id: '',
  })

  useEffect(() => {
    if (disciplinaEditando) {
      setForm({
        nome: disciplinaEditando.nome,
        descricao: disciplinaEditando.descricao,
        carga_horaria: disciplinaEditando.carga_horaria,
        curso_id: disciplinaEditando.curso_id,
      })
    }
  }, [disciplinaEditando])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const salvar = async () => {
    if (disciplinaEditando) {
      await axios.put(`/pedagogico/disciplines/${disciplinaEditando.id}`, form)
    } else {
      await axios.post('/pedagogico/disciplines', form)
    }

    onSalvo()
  }

  return (
    <CModal visible onClose={onSalvo}>
      <CModalHeader closeButton>
        <CModalTitle>
          {disciplinaEditando ? 'Editar Disciplina' : 'Nova Disciplina'}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>

          <CFormInput
            label="Nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className="mb-3"
          />

          <CFormInput
            label="Carga Horária (horas)"
            name="carga_horaria"
            type="number"
            value={form.carga_horaria}
            onChange={handleChange}
            className="mb-3"
          />

          <CFormSelect
            label="Curso"
            name="curso_id"
            value={form.curso_id}
            onChange={handleChange}
            className="mb-3"
          >
            <option value="">Selecione...</option>
            {cursos.map((c) => (
              <option key={c.id} value={c.id}>
                {c.titulo}
              </option>
            ))}
          </CFormSelect>

          <CFormInput
            label="Descrição"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            className="mb-3"
          />

        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onSalvo}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={salvar}>
          Salvar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalDisciplina
