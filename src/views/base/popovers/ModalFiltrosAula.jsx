// src/views/pedagogico/planoDeAula/PlanoDeAulaFilterModal.jsx

import React, { useEffect, useState } from 'react'
import {
  CModal, CModalHeader, CModalTitle, CModalBody,
  CModalFooter, CButton, CFormInput, CFormSelect,
} from '@coreui/react'
import axios from '../../../api' // <-- seu axios configurado com baseURL

const PlanoDeAulaFilterModal = ({ visible, onClose }) => {
  const [disciplinas, setDisciplinas] = useState([])
  const [professores, setProfessores] = useState([])
  const [turmas, setTurmas] = useState([])

  useEffect(() => {
    axios.get('/pedagogico/disciplines').then(res => setDisciplinas(res.data))
    axios.get('/pedagogico/teachers').then(res => setProfessores(res.data))
    axios.get('/training-coordinators/class-teacher/turmas').then(res => setTurmas(res.data))
  }, [])

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Filtrar Planos</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <CFormInput label="Título" />

        <CFormSelect label="Disciplina">
          <option>Selecionar</option>
          {disciplinas.map((d) => (
            <option key={d.id} value={d.id}>{d.nome}</option>
          ))}
        </CFormSelect>

        <CFormSelect label="Professor">
          <option>Selecionar</option>
          {professores.map((p) => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </CFormSelect>

        <CFormSelect label="Turma">
          <option>Selecionar</option>
          {turmas.map((t) => (
            <option key={t.id} value={t.id}>{t.nome}</option>
          ))}
        </CFormSelect>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>Fechar</CButton>
        <CButton color="primary">Aplicar Filtros</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default PlanoDeAulaFilterModal
