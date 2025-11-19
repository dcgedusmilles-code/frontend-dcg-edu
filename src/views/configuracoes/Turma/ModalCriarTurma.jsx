import React, { useState, useEffect } from 'react'
import { CModal, CModalBody, CModalHeader, CModalFooter, CButton, CFormInput, CFormSelect } from '@coreui/react'
import api from '../../../api' // axios configurado

const ModalTurma = ({ turmaEditando, cursos, coordenadores, onSalvo }) => {
  const [visible, setVisible] = useState(true)

  const [form, setForm] = useState({
    nome: '',
    ano: '',
    semestre: '',
    curso_id: '',
    coordenador_id: ''
  })

  useEffect(() => {
    if (turmaEditando) {
      setForm({
        nome: turmaEditando.nome,
        ano: turmaEditando.ano,
        semestre: turmaEditando.semestre,
        curso_id: turmaEditando.curso_id,
        coordenador_id: turmaEditando.coordenador_id
      })
    }
  }, [turmaEditando])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const salvar = async () => {

    try {
      if (turmaEditando) {
        await api.put(`/training-coordinators/class-teacher/turmas/${turmaEditando.id}`, form)
      } else {
        console.log("Forms", form)
        await api.post(`/training-coordinators/class-teacher/turmas`, form)
      }
      onSalvo()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <CModal visible={visible} onClose={() => onSalvo()} size="lg">
      <CModalHeader closeButton>{turmaEditando ? 'Editar Turma' : 'Nova Turma'}</CModalHeader>

      <CModalBody>
        <CFormInput className="mb-3" label="Nome" name="nome" value={form.nome} onChange={handleChange} />

        <CFormInput className="mb-3" label="Ano" name="ano" type="number" value={form.ano} onChange={handleChange} />

        <CFormInput className="mb-3" label="Semestre" name="semestre" type="number" value={form.semestre} onChange={handleChange} />

        <CFormSelect className="mb-3" label="Curso" name="curso_id" value={form.curso_id} onChange={handleChange}>
          <option value="">Selecione...</option>
          {cursos.map((c) => (
            <option key={c.id} value={c.id}>{c.titulo}</option>
          ))}
        </CFormSelect>

        <CFormSelect className="mb-3" label="Coordenador" name="coordenador_id" value={form.coordenador_id} onChange={handleChange}>
          <option value="">Selecione...</option>
          {coordenadores.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre || c.nome}</option>
          ))}
        </CFormSelect>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onSalvo}>Cancelar</CButton>
        <CButton color="primary" onClick={salvar}>Salvar</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalTurma
