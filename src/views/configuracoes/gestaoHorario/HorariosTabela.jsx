import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton
} from '@coreui/react'

const HorariosTabela = ({ data, onEdit, onView }) => (
  <CTable striped hover responsive>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell>Curso</CTableHeaderCell>
        <CTableHeaderCell>Turma</CTableHeaderCell>
        <CTableHeaderCell>Professor</CTableHeaderCell>
        <CTableHeaderCell>Dia</CTableHeaderCell>
        <CTableHeaderCell>Horário</CTableHeaderCell>
        <CTableHeaderCell>Sala</CTableHeaderCell>
        <CTableHeaderCell>Ações</CTableHeaderCell>
      </CTableRow>
    </CTableHead>

    <CTableBody>
      {data.map((h) => (
        <CTableRow key={h.id}>
          <CTableDataCell>{h.curso?.nome}</CTableDataCell>
          <CTableDataCell>{h.turma?.nome}</CTableDataCell>
          <CTableDataCell>{h.professor?.nome}</CTableDataCell>
          <CTableDataCell>{h.dia_semana}</CTableDataCell>
          <CTableDataCell>
            {h.inicio_hora} - {h.fim_hora}
          </CTableDataCell>
          <CTableDataCell>{h.sala}</CTableDataCell>
          <CTableDataCell>
            <CButton size="sm" color="info" onClick={() => onView(h)}>
              Ver
            </CButton>{' '}
            <CButton size="sm" color="warning" onClick={() => onEdit(h)}>
              Editar
            </CButton>
          </CTableDataCell>
        </CTableRow>
      ))}
    </CTableBody>
  </CTable>
)

export default HorariosTabela
