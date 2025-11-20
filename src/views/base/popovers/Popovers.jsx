// src/views/pedagogico/planoDeAula/PlanoDeAulaList.jsx

import React, { useEffect, useState } from 'react'
import {
  CCard, CCardBody, CCardHeader,
  CButton, CTable, CTableHead, CTableRow,
  CTableHeaderCell, CTableBody, CTableDataCell,
} from '@coreui/react'

import PlanoDeAulaCreateModal from './ModalAula'
import PlanoDeAulaFilterModal from './ModalFiltrosAula'
import axios from '../../../api' // <-- seu axios configurado com baseURL

const PlanoDeAulaList = () => {
  const [planos, setPlanos] = useState([])
  const [visibleCreate, setVisibleCreate] = useState(false)
  const [visibleFilter, setVisibleFilter] = useState(false)

  const fetchData = () => {
    axios.get('/pedagogico/lesson-plan')
      .then(res => setPlanos(res.data))
      .catch(err => console.error('Erro ao carregar planos:', err))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h5>Planos de Aula</h5>

          <div>
            <CButton color="secondary" className="me-2" onClick={() => setVisibleFilter(true)}>
              Filtros
            </CButton>

            <CButton color="primary" onClick={() => setVisibleCreate(true)}>
              Criar Plano de Aula
            </CButton>
          </div>
        </CCardHeader>

        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Título</CTableHeaderCell>
                <CTableHeaderCell>Disciplina</CTableHeaderCell>
                <CTableHeaderCell>Professor</CTableHeaderCell>
                <CTableHeaderCell>Turma</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {planos.map((plano) => (
                <CTableRow key={plano.id}>
                  <CTableDataCell>{plano.titulo}</CTableDataCell>
                  <CTableDataCell>{plano.disciplina?.nome}</CTableDataCell>
                  <CTableDataCell>{plano.professor?.nome}</CTableDataCell>
                  <CTableDataCell>{plano.turma?.nome}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <PlanoDeAulaCreateModal
        visible={visibleCreate}
        onClose={() => setVisibleCreate(false)}
        onCreated={fetchData}
      />

      <PlanoDeAulaFilterModal
        visible={visibleFilter}
        onClose={() => setVisibleFilter(false)}
      />
    </>
  )
}

export default PlanoDeAulaList
