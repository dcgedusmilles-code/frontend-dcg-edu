import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CBadge,
} from '@coreui/react'

export default function CriterioTable({ data }) {
  return (
    <CTable responsive hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Descrição</CTableHeaderCell>
          <CTableHeaderCell>Peso</CTableHeaderCell>
          <CTableHeaderCell>Avaliação</CTableHeaderCell>
          <CTableHeaderCell>Estado</CTableHeaderCell>
          <CTableHeaderCell>Ações</CTableHeaderCell>
        </CTableRow>
      </CTableHead>

      <CTableBody>
        {data.map((item) => (
          <CTableRow key={item.id}>
            <CTableDataCell>{item.descricao}</CTableDataCell>
            <CTableDataCell>{item.peso}</CTableDataCell>
            <CTableDataCell>{item.avaliacao?.titulo}</CTableDataCell>
            <CTableDataCell>
              <CBadge color={item.ativo ? 'success' : 'secondary'}>
                {item.ativo ? 'Ativo' : 'Inativo'}
              </CBadge>
            </CTableDataCell>
            <CTableDataCell>
              <CButton size="sm" color="info" href={`#/evaluation-criterias/${item.id}`}>
                Ver
              </CButton>{' '}
              <CButton size="sm" color="warning" href={`#/evaluation-criterias/${item.id}/editar`}>
                Editar
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}
