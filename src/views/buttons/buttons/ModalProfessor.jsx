// src/views/pedagogico/planoDeAula/PlanoDeAulaCreateModal.jsx

import React, { useEffect, useState } from 'react'
import {
  CModal, CModalHeader, CModalTitle, CModalBody,
  CModalFooter, CButton, CForm, CFormInput,
  CFormTextarea, CFormSelect,
} from '@coreui/react'
import axios from '../../../api'

const PlanoDeAulaCreateModal = ({ visible, onClose, onCreated }) => {
  const [form, setForm] = useState({
    titulo: '',
    objetivos: '',
    conteudo: '',
    metodologia: '',
    avaliacao: '',
    disciplina_id: '',
    professor_id: '',
    turma_id: '',
  })

  const [disciplinas, setDisciplinas] = useState([])
  const [professores, setProfessores] = useState([])
  const [turmas, setTurmas] = useState([])

  useEffect(() => {
    axios.get('/pedagogico/disciplines').then(res => setDisciplinas(res.data))
    axios.get('/pedagogico/teachers').then(res => setProfessores(res.data))
    axios.get('/training-coordinators/class-teacher/turmas').then(res => setTurmas(res.data))
  }, [])

  const handleSubmit = () => {
    axios.post('/pedagogico/lesson-plans', form)
      .then(() => {
        onCreated()
        onClose()
      })
      .catch(err => console.error('Erro ao criar plano:', err))
  }

  return (
    <CModal visible={visible} onClose={onClose} size="lg">
      <CModalHeader>
        <CModalTitle>Criar Plano de Aula</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <CForm>

          <CFormInput
            label="Título"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          />

          <CFormTextarea
            label="Objetivos"
            rows={3}
            value={form.objetivos}
            onChange={(e) => setForm({ ...form, objetivos: e.target.value })}
          />

          <CFormTextarea
            label="Conteúdo"
            rows={3}
            value={form.conteudo}
            onChange={(e) => setForm({ ...form, conteudo: e.target.value })}
          />

          <CFormTextarea
            label="Metodologia"
            rows={3}
            value={form.metodologia}
            onChange={(e) => setForm({ ...form, metodologia: e.target.value })}
          />

          <CFormTextarea
            label="Avaliação"
            rows={3}
            value={form.avaliacao}
            onChange={(e) => setForm({ ...form, avaliacao: e.target.value })}
          />

          <CFormSelect
            label="Disciplina"
            value={form.disciplina_id}
            onChange={(e) => setForm({ ...form, disciplina_id: e.target.value })}
          >
            <option>Selecionar</option>
            {disciplinas.map((d) => (
              <option key={d.id} value={d.id}>{d.nome}</option>
            ))}
          </CFormSelect>

          <CFormSelect
            label="Professor"
            value={form.professor_id}
            onChange={(e) => setForm({ ...form, professor_id: e.target.value })}
          >
            <option>Selecionar</option>
            {professores.map((p) => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </CFormSelect>

          <CFormSelect
            label="Turma"
            value={form.turma_id}
            onChange={(e) => setForm({ ...form, turma_id: e.target.value })}
          >
            <option>Selecionar</option>
            {turmas.map((t) => (
              <option key={t.id} value={t.id}>{t.nome}</option>
            ))}
          </CFormSelect>

        </CForm>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>Cancelar</CButton>
        <CButton color="primary" onClick={handleSubmit}>Salvar</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default PlanoDeAulaCreateModal
